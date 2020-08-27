const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

const { getSupermarkets } = require('../../utils/geolocater.js');

router.get('/postcode', async (req, res) => {
  const supermarketList = await getSupermarkets(req.query.postcode);
  res.send(supermarketList);
});

router.get('/details', async (req, res) => {
  const productID = req.query.item;

  const queryToSend = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .where('productID', productID);

  try {
    const results = await queryToSend;

    res.send(results[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const userSupermarkets = req.query.supermarkets;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalResults = {};
  const resultsToSend = {};

  const queryTotalResults = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.whereIn('supermarket', userSupermarkets);
      builder.where('price', '>', 0);
      builder.orderBy('price');
    });

  const queryToSend = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.whereIn('supermarket', userSupermarkets);
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .offset(startIndex)
    .limit(limit);

  totalResults.results = await queryTotalResults;

  totalResults.results = totalResults.results.filter((product) => {
    return product.supermarketProducts.length > 0;
  });

  totalResults.total = totalResults.results.length;

  resultsToSend.total = totalResults.total;

  if (endIndex < resultsToSend.total) {
    resultsToSend.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    resultsToSend.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    resultsToSend.results = await queryToSend;

    resultsToSend.results = resultsToSend.results.filter((product) => {
      return product.supermarketProducts.length > 0;
    });

    resultsToSend.results = resultsToSend.results.map((product) => {
      if (product.supermarketProducts.length > 1) {
        if (
          product.supermarketProducts[0].price <
          product.supermarketProducts[1].price
        ) {
          return {
            ...product,
            lowestPrice: true,
          };
        } else {
          return {
            ...product,
            lowestPrice: false,
          };
        }
      } else {
        return {
          ...product,
          lowestPrice: true,
        };
      }
    });

    res.send(resultsToSend);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
