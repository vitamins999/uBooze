const cheerio = require('cheerio');
const currency = require('currency.js');
const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');

const morrisonsScraper = async (url, drinkType, drinkSubtype) => {
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

    const html = await page.content();

    const $ = cheerio.load(html);

    const items = $('body').find('.fops-regular').find('.fops-item');

    items.each((i, el) => {
      const productNameText = $(el).find('.fop-title').attr('title').trim();

      const size = $(el).find('.fop-catch-weight').text().trim();

      if (!size) {
        return;
      }

      const productName = `${productNameText} ${size}`;

      let priceText = $(el)
        .find('.price-group-wrapper')
        .find('span')
        .first()
        .text()
        .trim();

      if (priceText === 'Out of stock') {
        priceText = '0';
      } else {
        priceText = priceText.slice(1);
      }

      const price = currency(priceText).intValue;

      let offer = $(el).find('.fop-row-promo').text();

      if (!offer) {
        offer = 'No offer';
      }

      const linkPartial = $(el)
        .find('.fop-contentWrapper')
        .find('a')
        .first()
        .attr('href');

      const link = `https://groceries.morrisons.com${linkPartial}`;

      const imagePartial = $(el).find('img').attr('src');
      const image = `https://groceries.morrisons.com${imagePartial}`;

      products.push({
        productName,
        price,
        offer,
        link,
        image,
        drinkType,
        drinkSubtype,
        supermarket: 'Morrisons',
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with morrisonsScraper: ${error} ***`);
  }
};

module.exports = morrisonsScraper;
