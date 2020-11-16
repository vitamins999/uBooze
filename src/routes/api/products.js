const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Rating = require('../../models/Rating');

const { getSupermarkets } = require('../../utils/geolocater.js');

router.get('/postcode', async (req, res) => {
  const radius = req.query.radius || 3200; // 3200m === 2 miles;
  const supermarketList = await getSupermarkets(req.query.postcode, radius);
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

  const productRatingsToSend = Rating.query()
    .select('rating')
    .where('productID', productID);

  try {
    const results = await queryToSend;

    const productRatings = await productRatingsToSend;
    let rating;

    if (productRatings.length === 0) {
      rating = 0;
    } else if (productRatings.length === 1) {
      rating = productRatings[0].rating;
    } else {
      rating =
        productRatings.reduce((acc, item) => {
          return acc.rating + item.rating;
        }) / productRatings.length;
    }

    results[0].rating = rating;
    results[0].numRatings = productRatings.length;

    res.send(results[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  let userSupermarkets = req.query.supermarkets;

  if (typeof userSupermarkets === 'string') {
    userSupermarkets = [userSupermarkets];
  }

  const orderBy = req.query.order || 'asc';
  let drinkType = req.query.type;

  if (!drinkType) {
    drinkType = ['beer', 'wine', 'spirits'];
  } else {
    drinkType = [drinkType];
  }

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
    .whereIn('drinkType', drinkType)
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
    .whereIn('drinkType', drinkType)
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
