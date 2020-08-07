const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Waitrose = require('../../models/Waitrose');

router.get('/', async (req, res) => {
  const products = await Product.query()
    .withGraphJoined('[tesco, sainsburys, waitrose]')
    .modifyGraph('[tesco, sainsburys, waitrose]', (builder) => {
      builder.orderBy('price');
    })
    .debug();
  // const products = await Product.query()
  //   .select('productName', 'volume', 'drinkType', 'drinkSubtype')
  //   .whereNotNull('productID')
  //   .withGraphFetched('[tesco, sainsburys, waitrose]')
  //   .modifyGraph('[tesco, sainsburys, waitrose]', (builder) => {
  //     builder.orderBy('price');
  //   })
  //   .debug();
  // const products = await Waitrose.query().join(
  //   'products',
  //   'waitrose.productID',
  //   'products.productID'
  // );
  console.log(products);
});

module.exports = router;
