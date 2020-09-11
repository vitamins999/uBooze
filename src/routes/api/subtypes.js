const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const userSupermarkets = req.query.supermarkets;
  const orderBy = req.query.order || 'asc';
  let drinkSubtype = [req.query.subtype];

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
    })
    .whereIn('drinkSubtype', drinkSubtype)
    .orderBy([
      { column: 'displayName', order: orderBy },
      { column: 'productID' },
    ]);

  const queryToSend = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.whereIn('supermarket', userSupermarkets);
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .whereIn('drinkSubtype', drinkSubtype)
    .orderBy([
      { column: 'displayName', order: orderBy },
      { column: 'productID' },
    ])
    .offset(startIndex)
    .limit(limit);

  totalResults.results = await queryTotalResults;

  totalResults.results = totalResults.results.filter((product) => {
    return product.supermarketProducts.length > 0;
  });

  totalResults.total = totalResults.results.length;

  resultsToSend.total = totalResults.total;
  resultsToSend.totalPages = Math.ceil(resultsToSend.total / limit);

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

    resultsToSend.firstItem = startIndex + 1;
    resultsToSend.lastItem = startIndex + resultsToSend.results.length;

    if (resultsToSend.results.length === 0) {
      resultsToSend.totalPages = 1;
      resultsToSend.firstItem = 0;
      resultsToSend.total = 0;
    }

    res.send(resultsToSend);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
