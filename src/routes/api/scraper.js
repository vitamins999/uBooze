const express = require('express');
const router = express.Router();
const SupermarketProduct = require('../../models/SupermarketProduct');

const tescoScrapeBeer = require('../../scrapers/tesco/beer');
const tescoScrapeWine = require('../../scrapers/tesco/wine');
const tescoScrapeSpirits = require('../../scrapers/tesco/spirits');

const waitroseScrapeBeer = require('../../scrapers/waitrose/beer');
const waitroseScrapeWine = require('../../scrapers/waitrose/wine');
const waitroseScrapeSpirits = require('../../scrapers/waitrose/spirits');

const sainsburysScrapeBeer = require('../../scrapers/sainsburys/beer');
const sainsburysScrapeWine = require('../../scrapers/sainsburys/wine');
const sainsburysScrapeSpirits = require('../../scrapers/sainsburys/spirits');

const asdaScrapeBeer = require('../../scrapers/asda/beer');
const asdaScrapeWine = require('../../scrapers/asda/wine');
const asdaScrapeSpirits = require('../../scrapers/asda/spirits');

const morrisonsScrapeBeer = require('../../scrapers/morrisons/beer');
const morrisonsScrapeWine = require('../../scrapers/morrisons/wine');
const morrisonsScrapeSpirits = require('../../scrapers/morrisons/spirits');

const icelandScrapeBeer = require('../../scrapers/iceland/beer');
const icelandScrapeWine = require('../../scrapers/iceland/wine');
const icelandScrapeSpirits = require('../../scrapers/iceland/spirits');

const coopScrapeBeer = require('../../scrapers/coop/beer');
const coopScrapeWine = require('../../scrapers/coop/wine');
const coopScrapeSpirits = require('../../scrapers/coop/spirits');

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

router.get('/asda', async (req, res) => {
  try {
    const beer = await asdaScrapeBeer();
    const wine = await asdaScrapeWine();
    const spirits = await asdaScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Asda');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/morrisons', async (req, res) => {
  try {
    const beer = await morrisonsScrapeBeer();
    const wine = await morrisonsScrapeWine();
    const spirits = await morrisonsScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Morrisons');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/iceland', async (req, res) => {
  try {
    const beer = await icelandScrapeBeer();
    const wine = await icelandScrapeWine();
    const spirits = await icelandScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Iceland');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/coop', async (req, res) => {
  try {
    const beer = await coopScrapeBeer();
    const wine = await coopScrapeWine();
    const spirits = await coopScrapeSpirits();

    const newDrinksData = [...beer, ...wine, ...spirits];

    upsertIntoDatabase(newDrinksData, 'Co-op');

    res.send(newDrinksData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
