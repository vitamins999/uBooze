const express = require('express');
const router = express.Router();
const SupermarketProduct = require('../../models/SupermarketProduct');

const tescoScrapeBeer = require('../../scrapers/tesco/beer');
const tescoScrapeSpirits = require('../../scrapers/tesco/wine');
const tescoScrapeWine = require('../../scrapers/tesco/spirits');

const waitroseScrapeBeer = require('../../scrapers/waitrose/beer');
const waitroseScrapeWine = require('../../scrapers/waitrose/wine');
const waitroseScrapeSpirits = require('../../scrapers/waitrose/spirits');

const sainsburysScrapeBeer = require('../../scrapers/sainsburys/beer');
const sainsburysScrapeWine = require('../../scrapers/sainsburys/wine');
const sainsburysScrapeSpirits = require('../../scrapers/sainsburys/spirits');

const supermarketNewData = [
  {
    productName: 'Stella Artois Premium Lager Beer Cans 18x440ml',
    price: 1920,
    offer: 'Has this been added?',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-premium-lager-beer-cans-18x440ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/20/5010017109820/5010017109820_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 7,
  },
  {
    productName: 'Test Beer That Should be Added',
    price: 190,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-premium-lager-beer-cans-18x440ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/20/5010017109820/5010017109820_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 7,
  },
  {
    productName: 'Another Test Beer That Should be Added',
    price: 1999,
    offer: 'No offer',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-premium-lager-beer-cans-18x440ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/20/5010017109820/5010017109820_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 7,
  },
  {
    productName: 'Budweiser Lager Beer Bottles 15x300ml',
    price: 1200,
    offer: 'Some offer that is great',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/budweiser-lager-15x300ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/17/5014379004717/5014379004717_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 2,
  },
  {
    productName: 'Peroni Nastro Azzurro Lager 12x330ml',
    price: 3004,
    offer: 'I love squirrels!',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/peroni-nastro-azzuro-12x330ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/16/8008440122216/8008440122216_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 8,
  },
  {
    productName: 'Stella Artois Premium Lager Beer Bottles 15x284ml',
    price: 9900,
    offer: 'Only Kittens: Save Cats',
    link:
      'https://www.sainsburys.co.uk/shop/gb/groceries/product/details/all-lager/stella-artois-15x284ml',
    image:
      'https://www.sainsburys.co.uk/wcsstore7.50.4/ExtendedSitesCatalogAssetStore/images/catalog/productImages/99/5010017109899/5010017109899_L.jpeg',
    drinkType: 'beer',
    drinkSubtype: 'lager',
    supermarket: "Sainsbury's",
    productID: 9,
  },
];

const upsertIntoDatabase = async (newDrinksArr, supermarketName) => {
  newDrinksArr.forEach(async (item) => {
    try {
      await SupermarketProduct.query()
        .patch({
          price: item.price,
          offer: item.offer,
          updatedAt: new Date().toISOString(),
        })
        .findOne({
          productName: item.productName,
          supermarket: item.supermarket,
        });
    } catch (error) {
      console.log(error);
    }
  });
  const newList = await SupermarketProduct.query()
    .select(
      'productName',
      'price',
      'offer',
      'link',
      'image',
      'drinkType',
      'drinkSubtype',
      'supermarket',
      'productID'
    )
    .where('supermarket', supermarketName);

  const filteredNewSupermarkets = [];

  newDrinksArr.forEach((item) => {
    if (
      !newList.some(
        (s) =>
          s.productName === item.productName &&
          s.supermarket === item.supermarket
      )
    ) {
      filteredNewSupermarkets.push(item);
    }
  });

  await SupermarketProduct.query().insert(filteredNewSupermarkets);
};

router.get('/tesco', async (req, res) => {
  try {
    const beer = await tescoScrapeBeer();
    const wine = await tescoScrapeWine();
    const spirits = await tescoScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Tesco');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/waitrose', async (req, res) => {
  try {
    const beer = await waitroseScrapeBeer();
    const wine = await waitroseScrapeWine();
    const spirits = await waitroseScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Waitrose');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/sainsburys', async (req, res) => {
  try {
    const beer = await sainsburysScrapeBeer();
    const wine = await sainsburysScrapeWine();
    const spirits = await sainsburysScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, "Sainsbury's");

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
