import cheerio from 'cheerio';
import currency from 'currency.js';
import puppeteer from 'puppeteer';

import { SupermarketProduct } from './types';

const sainsburysScraper = async (
  url: string
): Promise<Array<SupermarketProduct>> => {
  try {
    const products: SupermarketProduct[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.content();

    const $ = cheerio.load(data);

    $('.product').each((i, el) => {
      const productName: string = $(el)
        .find('.productNameAndPromotions')
        .find('h3')
        .text()
        .trim();

      if (!productName) {
        return;
      }

      const priceText: string = $(el)
        .find('.pricePerUnit')
        .first()
        .text()
        .trim();
      const price: number = currency(priceText.slice(0, -5).slice(1)).intValue;

      let offer: string = $(el).find('.promotion').first().text().trim();
      if (!offer) {
        offer = 'No offer';
      }

      const linkPartial = $(el)
        .find('.productNameAndPromotions')
        .find('h3')
        .find('a')
        .attr('href');

      const link: string = String(linkPartial);

      let imagePartial = $(el)
        .find('.productNameAndPromotions')
        .find('h3')
        .find('a')
        .find('img')
        .attr('src');

      imagePartial = String(imagePartial);
      const image: string = `https://${imagePartial.slice(2)}`;

      products.push({
        productName,
        price,
        offer,
        link,
        image,
      });
    });

    await browser.close();

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with sainsburysScraper: ${error}`);
  }
};

module.exports = {
  sainsburysScraper,
};
