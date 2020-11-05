const axios = require('axios');
const cheerio = require('cheerio');
const currency = require('currency.js');

const tescoScraper = async (url, drinkType, drinkSubtype) => {
  try {
    const products = [];

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    $('body')
      .find('.product-list--list-item')
      .each((i, el) => {
        const productName = $(el).find('h3').text();
        // console.log(productName);

        if (!productName) {
          return;
        }

        let priceText = $(el).find('.value').first().text();

        if (!priceText) {
          priceText = '0';
        }

        const price = currency(priceText).intValue;

        let offer = $(el)
          .find('.list-item-content')
          .find('.offer-text')
          .first()
          .text();

        if (!offer) {
          offer = 'No offer';
        }

        let linkPartial = $(el).find('.product-image-wrapper').attr('href');
        linkPartial = String(linkPartial);
        const link = `https://www.tesco.com${linkPartial}`;

        const imagePartial = $(el).find('.product-image').attr('src');
        const image = String(imagePartial);

        products.push({
          productName,
          price,
          offer,
          link,
          image,
          drinkType,
          drinkSubtype,
          supermarket: 'Tesco',
        });
      });

    return products;
  } catch (error) {
    throw new Error(`*** An error occured with tescoScraper: ${error} ***`);
  }
};

module.exports = tescoScraper;
