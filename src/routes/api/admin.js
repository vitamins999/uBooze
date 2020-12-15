const express = require('express');
const router = express.Router();
const passport = require('passport');

const { body, validationResult } = require('express-validator');
const { admin } = require('../../middleware/authMiddleware');
const User = require('../../models/User');
const SupermarketProduct = require('../../models/SupermarketProduct');
const Product = require('../../models/Product');
const Favourite = require('../../models/Favourite');
const RefreshToken = require('../../models/RefreshToken');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const users = await User.query()
        .select([
          'userID',
          'username',
          'email',
          'firstName',
          'lastName',
          'location',
          'bio',
          'isAdmin',
          'facebookID',
          'googleID',
        ])
        .orderBy('userID');

      res.json(users);
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Get user by userID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
router.get(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const user = await User.query()
        .findById(req.params.id)
        .select([
          'userID',
          'username',
          'email',
          'firstName',
          'lastName',
          'location',
          'bio',
          'isAdmin',
          'facebookID',
          'googleID',
        ]);

      res.json(user);
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Update user's account data
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
router.put(
  '/users/:id',
  // Validation and sanitation
  [
    body('firstName', 'First name is required').not().isEmpty().trim(),
    body('lastName', 'Last name is required').not().isEmpty().trim(),
    body('username', 'Username is required').not().isEmpty().trim(),
    body('email', 'Must be a valid email address')
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .normalizeEmail(),
    body('location').trim(),
    body('bio').trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    try {
      const updatedUser = await User.query().patchAndFetchById(req.params.id, {
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: `${req.body.firstName} ${req.body.lastName}`,
        location: req.body.location,
        bio: req.body.bio,
        isAdmin: req.body.isAdmin,
      });

      res.json(updatedUser);
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Get all supermarket products WITHOUT a productID (ie, freshly scraped supermarket products that need to be linked to their drink counterpart in db)
// @route   GET /api/admin/supermarketproducts/noid/:supermarket
// @access  Private/Admin
router.get(
  '/supermarketproducts/noid/:supermarket',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const supermarketProductsNoID = await SupermarketProduct.query()
        .select([
          'supermarketProductID',
          'supermarket',
          'productName',
          'price',
          'offer',
          'link',
          'image',
          'drinkType',
          'drinkSubtype',
          'updatedAt',
        ])
        .where('productID', null)
        .where('supermarket', req.params.supermarket)
        .orderBy('supermarketProductID');

      if (supermarketProductsNoID.length > 0) {
        res.json(supermarketProductsNoID);
      } else {
        res.json([
          {
            supermarketProductID: null,
            supermarket: 'No Products',
            productName: 'No Products',
            price: null,
            offer: null,
            link: '#',
            image: '#',
            drinkType: null,
            drinkSubtype: null,
            updatedAt: null,
          },
        ]);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Get all supermarket products WITH a productID
// @route   GET /api/admin/supermarketproducts
// @access  Private/Admin
router.get(
  '/supermarketproducts',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const supermarketProducts = await SupermarketProduct.query()
        .select([
          'supermarketProductID',
          'supermarket',
          'productName',
          'price',
          'offer',
          'link',
          'image',
          'drinkType',
          'drinkSubtype',
          'updatedAt',
          'productID',
        ])
        .whereNot('productID', null)
        .orderBy('supermarketProductID');

      if (supermarketProducts.length > 0) {
        res.json(supermarketProducts);
      } else {
        res.json({ msg: 'No products found' });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Get all products (drinks)
// @route   GET /api/admin/products
// @access  Private/Admin
router.get(
  '/products',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const products = await Product.query()
        .select([
          'productID',
          'productName',
          'displayName',
          'volume',
          'drinkType',
          'drinkSubtype',
        ])
        .orderBy('productID');

      if (products.length > 0) {
        res.json(products);
      } else {
        res.json({ msg: 'No products found' });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Get product (drink) by productID
// @route   GET /api/admin/products/:id
// @access  Private/Admin
router.get(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const product = await Product.query()
        .findById(req.params.id)
        .select([
          'productID',
          'productName',
          'displayName',
          'volume',
          'drinkType',
          'drinkSubtype',
        ]);

      res.json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Get individual supermarket product (drink) by supermarketID
// @route   GET /api/admin/supermarketproducts/:id
// @access  Private/Admin
router.get(
  '/supermarketproducts/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      const product = await SupermarketProduct.query()
        .findById(req.params.id)
        .select([
          'supermarketProductID',
          'supermarket',
          'productName',
          'price',
          'offer',
          'link',
          'image',
          'drinkType',
          'drinkSubtype',
          'updatedAt',
          'productID',
        ]);

      res.json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Update product (drink) data
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
router.put(
  '/products/:id',
  // Validation and sanitation
  [
    body('productName').not().isEmpty().trim(),
    body('displayName').not().isEmpty().trim(),
    body('volume').not().isEmpty().trim(),
    body('drinkType').not().isEmpty().trim(),
    body('drinkSubtype').not().isEmpty().trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    try {
      const updatedProduct = await Product.query().patchAndFetchById(
        req.params.id,
        {
          productName: req.body.productName,
          displayName: req.body.displayName,
          volume: req.body.volume,
          drinkType: req.body.drinkType,
          drinkSubtype: req.body.drinkSubtype,
        }
      );

      res.json(updatedProduct);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Create new product (drink)
// @route   POST /api/admin/products
// @access  Private/Admin
router.post(
  '/products',
  // Validation and sanitation
  [
    body('productID').not().isEmpty().trim(),
    body('productName').not().isEmpty().trim(),
    body('displayName').not().isEmpty().trim(),
    body('volume').not().isEmpty().trim(),
    body('drinkType').not().isEmpty().trim(),
    body('drinkSubtype').not().isEmpty().trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    try {
      const product = await Product.query().insert({
        productID: req.body.productID,
        productName: req.body.productName,
        displayName: req.body.displayName,
        volume: req.body.volume,
        drinkType: req.body.drinkType,
        drinkSubtype: req.body.drinkSubtype,
      });

      res.json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Delete product (drink)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
router.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      await Product.query().deleteById(req.params.id);

      res.json('Product successfully deleted!');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Update supermarket product data
// @route   PUT /api/admin/supermarketproducts/:id
// @access  Private/Admin
router.put(
  '/supermarketproducts/:id',
  // Validation and sanitation
  [
    body('productID').trim(),
    body('productName').not().isEmpty().trim(),
    body('supermarket').not().isEmpty().trim(),
    body('price').not().isEmpty().trim(),
    body('offer').not().isEmpty().trim(),
    body('link').not().isEmpty().trim(),
    body('image').not().isEmpty().trim(),
    body('drinkType').trim(),
    body('drinkSubtype').trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    try {
      const updatedSupermarketProduct = await SupermarketProduct.query().patchAndFetchById(
        req.params.id,
        {
          productName: req.body.productName,
          productID: req.body.productID,
          supermarket: req.body.supermarket,
          price: req.body.price,
          offer: req.body.offer,
          link: req.body.link,
          image: req.body.image,
          drinkType: req.body.drinkType,
          drinkSubtype: req.body.drinkSubtype,
        }
      );

      res.json(updatedSupermarketProduct);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Delete supermarket product
// @route   DELETE /api/admin/supermarketproducts/:id
// @access  Private/Admin
router.delete(
  '/supermarketproducts/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      await SupermarketProduct.query().deleteById(req.params.id);

      res.json('Supermarket Product successfully deleted!');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Delete supermarket product from update list (ie has no supermarketID assigned yet)
// @route   DELETE /api/admin/supermarketproducts/noid/:id
// @access  Private/Admin
router.delete(
  '/supermarketproducts/noid/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      await SupermarketProduct.query().deleteById(req.params.id);

      res.json('Supermarket Product (no ID) successfully deleted!');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
    try {
      await Favourite.query().delete().where('userID', req.params.id);
      await RefreshToken.query().delete().where('userID', req.params.id);
      await User.query().deleteById(req.params.id);

      res.json('User successfully deleted!');
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

module.exports = router;
