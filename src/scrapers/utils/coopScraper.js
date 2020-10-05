const cheerio = require('cheerio');
const currency = require('currency.js');
const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');

const coopScraper = async (url, drinkType, drinkSubtype, scrollNum = 1) => {
  try {
    const products = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Scroll to very top of page
    await page.evaluate((_) => {
      window.scrollTo(0, 0);
    });

    // Scroll to the bottom of the page with puppeteer autoscroll down
    await scrollPageToBottom(page, 250, 300);

    for (let i = 1; i < scrollNum; i++) {
      await page.focus('.btn--secondary');
      await page.click('.btn--secondary');
      await scrollPageToBottom(page, 250, 300);
    }

    const html = await page.content();

    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const productName = $(el).find('h1').text().trim();

      const priceText = $(el).find('.product-card--info--price').text().trim();
      const price = currency(priceText.slice(1)).intValue;

      const offer = 'No offer';

      const linkPartial = $(el).find('a').attr('href');
      const link = `https://shop.coop.co.uk${linkPartial}`;

      let image = $(el).find('img').attr('srcset');
      image = image.split(' ');
      image = image[1].slice(5).trim();

      products.push({
        productName,
        price,
        offer,
        link,
        image,
        drinkType,
        drinkSubtype,
        supermarket: 'Co-op',
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with waitroseScraper: ${error} ***`);
  }
};

module.exports = coopScraper;
