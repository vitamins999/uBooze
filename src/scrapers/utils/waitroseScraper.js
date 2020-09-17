const cheerio = require('cheerio');
const currency = require('currency.js');
const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');

const waitroseScraper = async (url, drinkType, drinkSubtype, scrollNum = 1) => {
  try {
    const products = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Clicks the 'accept cookies' popup
    await page.focus('button.button___2YB28');
    await page.click('button.button___2YB28');

    // Scroll to very top of page
    await page.evaluate((_) => {
      window.scrollTo(0, 0);
    });

    // Scroll to the bottom of the page with puppeteer autoscroll down
    await scrollPageToBottom(page, 250, 300);

    for (let i = 1; i < scrollNum; i++) {
      await page.focus('.button___2UT_5');
      await page.click('.button___2UT_5');
      await scrollPageToBottom(page, 250, 300);
    }

    const html = await page.content();

    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const productNameText = $(el).data('product-name');

      if (!productNameText) {
        return;
      }

      const size = $(el).find('.size___2HSwr').first().text();
      const productName = `${productNameText} ${size}`;

      const priceText = $(el).find('.prices___1JkR4').find('span span').text();
      const price = currency(priceText.slice(1)).intValue;

      let offer = $(el).find('.offerDescription___1A6Ew').first().text();
      offer = offer.charAt(0).toUpperCase() + offer.slice(1);

      if (!offer) {
        offer = 'No offer';
      }

      let linkPartial = $(el).find('header a').attr('href');
      linkPartial = String(linkPartial);
      const link = `https://www.waitrose.com${linkPartial}`;

      const imagePartial = $(el).find('picture').find('img').attr('src');
      const image = String(imagePartial);

      products.push({
        productName,
        price,
        offer,
        link,
        image,
        drinkType,
        drinkSubtype,
        supermarket: 'Waitrose',
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with waitroseScraper: ${error} ***`);
  }
};

module.exports = waitroseScraper;
