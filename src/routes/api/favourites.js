const express = require('express');
const router = express.Router();

const passport = require('passport');
const Favourite = require('../../models/Favourite');

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

module.exports = router;
