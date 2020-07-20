import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import currency from 'currency.js';

import { SupermarketProduct } from './types';

export const tescoScraper = async (
  url: string
): Promise<Array<SupermarketProduct>> => {
  try {
    const products: SupermarketProduct[] = [];

    const { data }: AxiosResponse = await axios.get(url);

    const $ = cheerio.load(data);

    $('body')
      .find('.product-list--list-item')
      .each((i, el) => {
        const productName: string = $(el).find('.sc-fjdhpX').text();

        if (!productName) {
          return;
        }

        let priceText: string = $(el).find('.value').first().text();

        if (!priceText) {
          priceText = '0';
        }

        const price: number = currency(priceText).intValue;

        let offer: string = $(el)
          .find('.list-item-content')
          .find('.offer-text')
          .first()
          .text();

        if (!offer) {
          offer = 'No offer';
        }

        let linkPartial = $(el).find('.product-image-wrapper').attr('href');
        linkPartial = String(linkPartial);
        const link: string = `https://www.tesco.com${linkPartial}`;

        const imagePartial = $(el).find('.product-image').attr('src');
        const image: string = String(imagePartial);

        products.push({
          productName,
          price,
          offer,
          link,
          image,
        });
      });

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with tescoScraper: ${error}`);
  }
};
