"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
(async () => {
    const browser = await playwright_1.chromium.launch({ headless: false });
    const page = await browser.newPage();
    // abre Google Maps direto (melhor que Google normal)
    await page.goto('https://www.google.com/maps');
    // busca
    await page.fill('input#searchboxinput', 'escola infantil Cabo Frio');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    // pega resultados
    const escolas = await page.$$eval('.Nv2PK', (items) => items.map((item) => ({
        nome: item.innerText
    })));
    console.log(escolas);
    await browser.close();
})();
//# sourceMappingURL=scraper.js.map