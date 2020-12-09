const express = require('express');
const router = express.Router();

const passport = require('passport');
const Favourite = require('../../models/Favourite');
const Product = require('../../models/Product');
const User = require('../../models/User');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const favouriteExists = await Favourite.query().findOne({
        userID: req.user.userID,
        productID: req.body.productID,
      });

      if (!favouriteExists) {
        await Favourite.query().insert({
          userID: req.user.userID,
          productID: req.body.productID,
        });

        res.json({
          error: false,
          msg: 'Favourite Added!',
        });
      } else {
        await Favourite.query().deleteById(favouriteExists.favouriteID);

        res.json({
          error: false,
          msg: 'Favourite Deleted!',
        });
      }
    } catch (error) {
      res.json({
        error: true,
        msg: error.message,
      });
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let favourites = await Favourite.query().select('productID').where({
        userID: req.user.userID,
      });

      if (!favourites) {
        favourites = [];
      } else {
        favourites = favourites.map((item) => item.productID);
      }

      res.json({
        error: false,
        favourites,
      });
    } catch (error) {
      res.json({
        error: true,
        msg: error.message,
      });
    }
  }
);

// @desc    Get list of user's favourited drinks, by array of productID
// @route   PUT /api/favourites/userfavourites
// @access  Public
router.post('/userfavourites', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;

  const orderBy = req.query.order || 'asc';
  const productIDs = req.body.favourites;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalResults = {};
  const resultsToSend = {};

  const queryTotalResults = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .whereIn('productID', productIDs)
    .orderBy([
      { column: 'displayName', order: orderBy },
      { column: 'productID' },
    ]);

  const queryToSend = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .whereIn('productID', productIDs)
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

// @desc    Gets list of a user's favourite drinks, by username
// @route   PUT /api/favourites/userfavourites/id
// @access  Public
router.get('/userfavourites/id', async (req, res) => {
  const username = req.query.username;
  let favourites = [];

  try {
    const user = await User.query().select('userID').findOne({ username });

    if (user) {
      const favouriteList = await Favourite.query().select('productID').where({
        userID: user.userID,
      });

      if (!favouriteList) {
        favourites = [];
      } else {
        favourites = favouriteList.map((item) => item.productID);
      }
    }
  } catch (error) {
    console.log(error);
  }

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;

  const orderBy = req.query.order || 'asc';

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalResults = {};
  const resultsToSend = {};

  const queryTotalResults = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .whereIn('productID', favourites)
    .orderBy([
      { column: 'displayName', order: orderBy },
      { column: 'productID' },
    ]);

  const queryToSend = Product.query()
    .withGraphFetched('supermarketProducts')
    .modifyGraph('supermarketProducts', (builder) => {
      builder.where('price', '>', 0);
      builder.orderBy('price');
    })
    .whereIn('productID', favourites)
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
