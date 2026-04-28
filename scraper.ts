import { chromium } from 'playwright';

interface Escola {
  nome: string;
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultTimeout(45000);

  try {
    // abre Google Maps direto
    console.log('Abrindo Google Maps...');
    await page.goto('https://www.google.com/maps', { waitUntil: 'domcontentloaded' });

    // esperar a página carregar completamente
    await page.waitForTimeout(5000);

    // tentar preencher o campo de busca
    console.log('Buscando campo de busca...');
    try {
      const searchInput = page.locator('input[aria-label*="Search"]').first();
      await searchInput.fill('escola infantil Cabo Frio', { timeout: 5000 });
      await page.keyboard.press('Enter');
    } catch (e) {
      console.log('Tentando seletor alternativo...');
      await page.fill('input[type="text"]', 'escola infantil Cabo Frio');
      await page.keyboard.press('Enter');
    }

    // aguardar resultados
    console.log('Aguardando resultados...');
    await page.waitForTimeout(8000);

    // pega resultados
    console.log('Coletando resultados...');
    const escolas = await page.$$eval(
      'div[data-index]',
      (items): Escola[] =>
        items
          .map((item) => ({
            nome: (item as HTMLElement).textContent || ''
          }))
          .filter((e) => e.nome.length > 5)
          .slice(0, 10)
    ).catch(() => []);

    console.log('\n✅ Escolas encontradas:');
    console.log(escolas);

    if (escolas.length === 0) {
      console.log('Nenhuma escola encontrada com este seletor.');
    }
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await browser.close();
  }
})();
