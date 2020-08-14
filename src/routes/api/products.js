const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  const query = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .offset(startIndex)
    .limit(limit);

  const [total] = await Promise.all([query.resultSize()]);

  if (endIndex < total) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.total = total;

  try {
    results.results = await query;

    results.results = results.results.map((product) => {
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
    res.send(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
