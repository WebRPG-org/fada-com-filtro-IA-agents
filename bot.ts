import { chromium, Browser, Page } from 'playwright';
import axios from 'axios';
import { google, sheets_v4 } from 'googleapis';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Tipos de dados
interface Escola {
  nome: string;
  info: string;
}

interface EscolaDetalhes {
  nome: string;
  endereco: string;
  telefone: string;
  instagram: string;
}

const WEBHOOK_URL = process.env.WEBHOOK_URL || '';
const SEARCH_QUERY = process.env.SEARCH_QUERY || 'escola infantil Cabo Frio';
const CITY_FILTER = process.env.CITY_FILTER || 'Cabo Frio';
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const GOOGLE_SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';
const GOOGLE_SERVICE_ACCOUNT_KEY_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || '';
const TEST_MODE = process.env.TEST_MODE === 'true' || !WEBHOOK_URL || WEBHOOK_URL.includes('seuwebhook');
const MAX_RESULTS = Number(process.env.MAX_RESULTS) || 500;

// Validação do webhook
console.log('🤖 Bot de Escolas Iniciado');
if (TEST_MODE) {
  console.log('⚠️ MODO TESTE: Executando sem enviar dados para webhook');
  console.log('   Configure WEBHOOK_URL no .env para modo produção\n');
} else {
  console.log(`📤 Webhook: ${WEBHOOK_URL}\n`);
}

(async () => {
  let browser: Browser | null = null;
  let page: Page | null = null;

  const getPage = (): Page => {
    if (!page) {
      throw new Error('Página não inicializada');
    }
    if (page.isClosed()) {
      const pages = browser?.contexts()[0].pages() || [];
      page = pages[0] || page;
    }
    return page;
  };

  const initSheetsClient = async (): Promise<sheets_v4.Sheets | null> => {
    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_KEY_FILE) {
      console.log('⚠️ Google Sheets não configurado. Pulando salvamento em planilha.');
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const authClient = await auth.getClient();
    const sheetsClient = google.sheets({ version: 'v4', auth });
    return sheetsClient;
  };

  const appendSheetRow = async (sheetsClient: sheets_v4.Sheets | null, row: Array<string>) => {
    if (!sheetsClient) {
      return;
    }

    try {
      await sheetsClient.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${GOOGLE_SHEET_NAME}!A:E`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row]
        }
      });
    } catch (err) {
      console.error('⚠️ Erro ao salvar no Google Sheets:', (err as Error).message);
    }
  };

  const loadAllResults = async (page: Page) => {
    let previousCount = 0;
    let stableCountTimes = 0;

    while (stableCountTimes < 3) {
      const items = page.locator('.Nv2PK');
      const count = await items.count();
      if (count === previousCount) {
        stableCountTimes += 1;
      } else {
        stableCountTimes = 0;
      }
      previousCount = count;

      if (count === 0) {
        await page.waitForTimeout(1500);
        continue;
      }

      if (count >= MAX_RESULTS) {
        break;
      }

      await items.nth(count - 1).scrollIntoViewIfNeeded();
      await page.waitForTimeout(2500);
    }

    return Math.min(await page.locator('.Nv2PK').count(), MAX_RESULTS);
  };

  try {
    // 1️⃣ Abrir navegador
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    page.setDefaultTimeout(45000);

    console.log('🔎 Abrindo Google Maps...');
    await page.goto('https://www.google.com/maps', { waitUntil: 'load' });

    // Esperar o campo de busca aparecer
    try {
      await page.waitForSelector('#ucc-1, input[name="q"]', { timeout: 15000 });
    } catch {
      console.log('⚠️ Campo de busca não encontrado com seletor padrão');
    }

    // 2️⃣ BUSCA
    console.log(`🔍 Buscando por "${SEARCH_QUERY}"...`);
    try {
      await page.fill('#ucc-1, input[name="q"]', SEARCH_QUERY);
      await page.keyboard.press('Enter');
    } catch (e) {
      console.log('⚠️ Seletor de busca falhou, tentando alternativas...');
      try {
        const searchBox = page.locator('input[name="q"]').first();
        await searchBox.fill(SEARCH_QUERY, { timeout: 5000 });
        await page.keyboard.press('Enter');
      } catch (e2) {
        console.log('⚠️ Tentando com qualquer campo de texto...');
        const searchInputs = await page.$$('input[type="text"]');
        if (searchInputs.length > 0) {
          await searchInputs[0].fill(SEARCH_QUERY);
          await page.keyboard.press('Enter');
        } else {
          throw new Error('Nenhum input de texto encontrado');
        }
      }
    }

    await page.waitForTimeout(5000);

    console.log(`📍 Filtrando apenas resultados de: ${CITY_FILTER}`);
    console.log('📍 Coletando resultados...');

    // 3️⃣ Scroll para carregar todos os resultados
    const totalItems = await loadAllResults(page);
    console.log(`✅ Total carregado: ${totalItems} resultados\n`);

    const sheetsClient = await initSheetsClient();

    // 4️⃣ Processar cada escola
    const resultados: EscolaDetalhes[] = [];
    const totalToProcess = totalItems;
    for (let i = 0; i < totalToProcess; i++) {
      const activePage = getPage();
      const item = activePage.locator('.Nv2PK').nth(i);
      const nome = (await item.locator('.qBF1Pd').first().textContent())?.trim() || `item ${i + 1}`;

      try {
        console.log(`[${i + 1}/${totalToProcess}] ➡️ Processando: ${nome}...`);

        await item.scrollIntoViewIfNeeded();
        await item.click();
        await activePage.waitForTimeout(3000);

        try {
          await activePage.waitForSelector('button[data-item-id^="phone"], button[data-item-id="address"], div[data-attrid]', { timeout: 10000 });
        } catch {
          console.log('⚠️ Detalhes da escola não carregaram rapidamente, continuando...');
        }

        // Extrair telefone
        let telefone = '';
        try {
          const phoneBtn = await activePage.locator('button[data-item-id^="phone"]').first();
          telefone = (await phoneBtn.innerText())?.trim() || '';
        } catch {
          // Telefone pode não existir
        }

        // Extrair endereço
        let endereco = '';
        try {
          const addressBtn = await activePage.locator('button[data-item-id="address"]').first();
          endereco = (await addressBtn.innerText())?.trim() || '';
        } catch {
          // Endereço pode não existir
        }

        // Extrair Instagram
        let instagram = '';
        try {
          const linkHandles = await activePage.locator('a').elementHandles();
          for (const link of linkHandles) {
            const href = await link.getAttribute('href');
            if (href && href.includes('instagram')) {
              instagram = href;
              break;
            }
          }
        } catch {
          // Instagram pode não existir
        }

        const escolaDetail: EscolaDetalhes = {
          nome,
          endereco,
          telefone,
          instagram
        };

        const cityMatch = CITY_FILTER
          ? endereco.toLowerCase().includes(CITY_FILTER.toLowerCase())
          : true;

        if (!cityMatch) {
          console.log(`   ⚠️ Pulando pois não pertence a ${CITY_FILTER}: ${endereco}`);
          continue;
        }

        resultados.push(escolaDetail);

        // 6️⃣ Salvar no Google Sheets
        try {
          if (sheetsClient) {
            await appendSheetRow(sheetsClient, [
              escolaDetail.nome,
              escolaDetail.endereco,
              escolaDetail.telefone,
              escolaDetail.instagram,
              new Date().toISOString()
            ]);
            console.log('   ✅ Salvo no Google Sheets');
          }
        } catch (sheetError) {
          console.error('   ⚠️ Erro ao salvar no Google Sheets:', (sheetError as Error).message);
        }

        // 7️⃣ Enviar para webhook do Make
        try {
          console.log(`   📤 Enviando para webhook...`);
          if (!TEST_MODE) {
            await axios.post(WEBHOOK_URL, escolaDetail, {
              timeout: 10000,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log(`   ✅ Enviado com sucesso!\n`);
          } else {
            console.log(`   ✅ [TESTE] Dados seriam enviados:\n   ${JSON.stringify(escolaDetail)}\n`);
          }
        } catch (webhookError) {
          console.error(`   ⚠️ Erro ao enviar webhook:`, (webhookError as Error).message);
          console.log(`   Dados: ${JSON.stringify(escolaDetail)}\n`);
        }

        await page.waitForTimeout(2000);
      } catch (err) {
        console.error(`⚠️ Erro ao processar: ${nome}`);
        console.error((err as Error).message);
        console.log();
      }
    }

    // 7️⃣ Resultado final
    console.log('\n🎉 PROCESSO FINALIZADO!');
    console.log(`📊 Total processado: ${resultados.length} escolas`);
    console.log('\n📋 Resumo dos resultados:');
    resultados.forEach((r, i) => {
      console.log(`\n${i + 1}. ${r.nome}`);
      if (r.telefone) console.log(`   📞 ${r.telefone}`);
      if (r.endereco) console.log(`   📍 ${r.endereco}`);
      if (r.instagram) console.log(`   📸 ${r.instagram}`);
    });
  } catch (error) {
    console.error('❌ Erro fatal:', (error as Error).message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n✅ Navegador fechado');
    }
  }
})();
