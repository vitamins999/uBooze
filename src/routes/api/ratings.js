const express = require('express');
const router = express.Router();

const passport = require('passport');
const Rating = require('../../models/Rating');
const User = require('../../models/User');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const ratingExists = await Rating.query().findOne({
        userID: req.user.userID,
        productID: req.body.productID,
      });

      if (!ratingExists) {
        const rating = await Rating.query().insert({
          userID: req.user.userID,
          productID: req.body.productID,
          rating: req.body.rating,
        });

        res.status(201).json({
          error: false,
          msg: 'Rating Added!',
          rating: rating.rating,
        });
      } else {
        const rating = await Rating.query().patchAndFetchById(
          ratingExists.ratingID,
          {
            rating: req.body.rating,
          }
        );

        res.json({
          error: false,
          msg: 'Rating Changed!',
          rating: rating.rating,
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
      const ratingExists = await Rating.query().findOne({
        userID: req.user.userID,
        productID: req.query.productid,
      });

      if (!ratingExists) {
        res.json({
          rating: 0,
        });
      } else {
        res.json({
          rating: ratingExists.rating,
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

router.get('/:id', async (req, res) => {
  try {
    const productRatings = await Rating.query()
      .select('rating')
      .where('productID', req.params.id);

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

    res.json({
      numRating: productRatings.length,
      rating,
    });
  } catch (error) {
    res.json({
      error: true,
      msg: error.message,
    });
  }
});

module.exports = router;
