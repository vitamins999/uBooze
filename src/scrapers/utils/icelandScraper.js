const cheerio = require('cheerio');
const currency = require('currency.js');
const axios = require('axios');

const icelandScraper = async (url, drinkType, drinkSubtype) => {
  try {
    const products = [];

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    $('.product-tile').each((i, el) => {
      const productName = $(el).find('.name-link').text().trim();

      let priceText = $(el).find('.product-sales-price').text().trim();
      const price = currency(priceText.slice(1)).intValue;

      let offer = $(el).find('.offer').find('.value').text().trim();

      if (!offer) {
        offer = 'No offer';
      } else {
        offer = offer.replace(/\n\n/g, ' ');
      }

      const link = $(el).find('.name-link').attr('href');

      const image = $(el).find('.thumb-link').find('img').attr('src');

      products.push({
        productName,
        price,
        offer,
        link,
        image,
        drinkType,
        drinkSubtype,
        supermarket: 'Iceland',
      });
    });

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with icelandScraper: ${error} ***`);
  }
};

module.exports = icelandScraper;
