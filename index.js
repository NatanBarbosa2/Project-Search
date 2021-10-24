require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer');


// Search System
// var readline = require('readline');
// var resp = "";
// var leitor = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// leitor.question("Qual módulo pra ler dados no node.js?\n", function (answer) {
//     leitor.close();
//     require('dotenv').config({
//         path: process.env.SITE = answer});
//     console.log(process.env.SITE)
//     iniciar()
// });

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const pagina = await browser.newPage();
    await pagina.goto('https://br.pinterest.com/')
        await pagina.click('[data-test-id="simple-login-button"]')
        await pagina.type('[type="email"]', process.env.EMAILKEY)
        await pagina.type('[type="password"]', process.env.SENHAKEY)
        
        await pagina.click('[type="submit"]');
        await pagina.waitForNavigation();
        await pagina.goto('https://br.pinterest.com/search/my_pins/?q=universe&rs=typed&term_meta[]=universe%7Ctyped')
        const images = await pagina.evaluate(() => Array.from(document.images, e => e.src));
        fs.writeFile('./Json/Src.json', JSON.stringify(images, null, 2))

        browser.close()
})();
