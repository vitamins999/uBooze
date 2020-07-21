import cheerio from 'cheerio';
import currency from 'currency.js';
import puppeteer from 'puppeteer';
const scrollPageToBottom = require('puppeteer-autoscroll-down');

import { SupermarketProduct } from './types';

export const waitroseScraper = async (
  url: string,
  drinkType: string,
  drinkSubtype: string,
  scrollNum: number = 1
): Promise<Array<SupermarketProduct>> => {
  try {
    const products: SupermarketProduct[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Clicks the 'accept cookies' popup
    await page.focus('.button___2YB28');
    await page.click('.button___2YB28');

    // Scroll to very top of page
    await page.evaluate((_) => {
      window.scrollTo(0, 0);
    });

    // Scroll to the bottom of the page with puppeteer autoscroll down
    await scrollPageToBottom(page, 250, 300);

    for (let i: number = 1; i < scrollNum; i++) {
      await page.focus('.button___2UT_5');
      await page.click('.button___2UT_5');
      await scrollPageToBottom(page, 250, 300);
    }

    const html = await page.content();

    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const productNameText: string = $(el).data('product-name');

      if (!productNameText) {
        return;
      }

      const size: string = $(el).find('.size___2HSwr').first().text();
      const productName: string = `${productNameText} ${size}`;

      const priceText: string = $(el)
        .find('.prices___1JkR4')
        .find('span span')
        .text();
      const price: number = currency(priceText.slice(1)).intValue;

      let offer: string = $(el)
        .find('.offerDescription___1A6Ew')
        .first()
        .text();
      offer = offer.charAt(0).toUpperCase() + offer.slice(1);

      if (!offer) {
        offer = 'No offer';
      }

      let linkPartial = $(el).find('header a').attr('href');
      linkPartial = String(linkPartial);
      const link: string = `https://www.waitrose.com${linkPartial}`;

      const imagePartial = $(el).find('picture').find('img').attr('src');
      const image: string = String(imagePartial);

      products.push({
        productName,
        price,
        offer,
        link,
        image,
        drinkType,
        drinkSubtype,
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with waitroseScraper: ${error} ***`);
  }
};
