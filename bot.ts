import { chromium, Browser, Page } from 'playwright';
import axios from 'axios';
import dotenv from 'dotenv';

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

// Validação do webhook
if (!WEBHOOK_URL) {
  console.error('❌ WEBHOOK_URL não configurada. Configure a variável de ambiente ou arquivo .env');
  process.exit(1);
}

console.log('🤖 Bot de Escolas Iniciado');
console.log(`📤 Webhook: ${WEBHOOK_URL}\n`);

(async () => {
  let browser: Browser | null = null;

  try {
    // 1️⃣ Abrir navegador
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultTimeout(45000);

    console.log('🔎 Abrindo Google Maps...');
    await page.goto('https://www.google.com/maps', { waitUntil: 'load' });

    // Esperar o campo de busca aparecer
    try {
      await page.waitForSelector('#searchboxinput', { timeout: 10000 });
    } catch {
      console.log('⚠️ Campo de busca não encontrado com seletor padrão');
    }

    // 2️⃣ BUSCA
    console.log('🔍 Buscando por "escola infantil Cabo Frio"...');
    try {
      await page.fill('#searchboxinput', 'escola infantil Cabo Frio');
      await page.keyboard.press('Enter');
    } catch (e) {
      console.log('⚠️ Tentando seletor alternativo para busca');
      const searchBox = page.locator('input[aria-label*="Search"]').first();
      await searchBox.fill('escola infantil Cabo Frio');
      await page.keyboard.press('Enter');
    }

    await page.waitForTimeout(5000);

    console.log('📍 Coletando resultados...');

    // 3️⃣ Scroll para carregar mais resultados
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 3000);
      await page.waitForTimeout(2000);
    }

    // 4️⃣ Extrair lista de escolas
    let escolas: Escola[] = [];
    try {
      escolas = await page.$$eval('.Nv2PK', (items) => {
        return items.map((item) => {
          const nomeEl = (item as HTMLElement).querySelector('.qBF1Pd');
          const nome = nomeEl?.textContent || '';
          const info = (item as HTMLElement).innerText;

          return { nome, info };
        });
      });
    } catch (e) {
      console.log('⚠️ Seletor .Nv2PK não funcionou, tentando alternativa');
      escolas = [];
    }

    console.log(`✅ Encontradas: ${escolas.length} escolas\n`);

    // 5️⃣ Processar cada escola
    const resultados: EscolaDetalhes[] = [];

    for (let i = 0; i < Math.min(escolas.length, 10); i++) {
      const escola = escolas[i];

      try {
        console.log(`[${i + 1}/10] ➡️ Processando: ${escola.nome}...`);

        // Clicar na escola
        try {
          await page.click(`text=${escola.nome}`);
        } catch {
          // Tentar com seletor alternativo
          const items = await page.$$('.Nv2PK');
          if (i < items.length) {
            await items[i].click();
          }
        }

        await page.waitForTimeout(3000);

        // Extrair telefone
        let telefone = '';
        try {
          const phoneBtn = await page.$('button[data-item-id^="phone"]');
          if (phoneBtn) {
            telefone = await phoneBtn.innerText();
          }
        } catch (e) {
          // Telefone pode não existir
        }

        // Extrair endereço
        let endereco = '';
        try {
          const addressBtn = await page.$('button[data-item-id="address"]');
          if (addressBtn) {
            endereco = await addressBtn.innerText();
          }
        } catch (e) {
          // Endereço pode não existir
        }

        // Extrair Instagram
        let instagram = '';
        try {
          const links = await page.$$('a');
          for (const link of links) {
            const href = await link.getAttribute('href');
            if (href && href.includes('instagram')) {
              instagram = href;
              break;
            }
          }
        } catch (e) {
          // Instagram pode não existir
        }

        const escolaDetail: EscolaDetalhes = {
          nome: escola.nome,
          endereco,
          telefone,
          instagram
        };

        resultados.push(escolaDetail);

        // 6️⃣ Enviar para webhook do Make
        try {
          console.log(`   📤 Enviando para webhook...`);
          await axios.post(WEBHOOK_URL, escolaDetail, {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(`   ✅ Enviado com sucesso!\n`);
        } catch (webhookError) {
          console.error(`   ⚠️ Erro ao enviar webhook:`, (webhookError as Error).message);
          console.log(`   Dados: ${JSON.stringify(escolaDetail)}\n`);
        }

        await page.waitForTimeout(2000);
      } catch (err) {
        console.error(`⚠️ Erro ao processar: ${escola.nome}`);
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
