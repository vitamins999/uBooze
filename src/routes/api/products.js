const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Waitrose = require('../../models/Waitrose');

router.get('/', async (req, res) => {
  const products = await Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.orderBy('price', 'desc');
    });
  res.send(products);
});

module.exports = router;
