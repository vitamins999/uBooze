const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const gravatar = require('gravatar');
const normalize = require('normalize-url');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

const User = require('../../models/User');
const Favourite = require('../../models/Favourite');
const RefreshToken = require('../../models/RefreshToken');
const issueJWT = require('../../utils/jwt');
const { NotFoundError } = require('objection');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Public
router.get('/', async (req, res) => {
  const username = req.query.username;

  let token;
  let isUser = false;

  try {
    const user = await User.query()
      .select([
        'username',
        'userID',
        'displayName',
        'firstName',
        'lastName',
        'location',
        'bio',
        'createdAt',
        'gravatar',
      ])
      .findOne({ username });

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const dbUser = await User.query()
        .select([
          'userID',
          'username',
          'email',
          'displayName',
          'createdAt',
          'isAdmin',
          'gravatar',
          'facebookID',
          'googleID',
        ])
        .findOne({ userID: decoded.sub });

      if (dbUser.userID === user.userID) {
        isUser = true;
      }
    }

    if (user) {
      const createdAt = dayjs(user.createdAt).format('MMMM YYYY');

      res.status(200).json({
        username: user.username,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.firstName,
        avatar: user.gravatar,
        location: user.location,
        bio: user.bio,
        createdAt,
        isUser,
      });
    } else {
      res.status(400).send('No user found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// @desc    Get currently loggged in user's profile
// @route   GET /api/profile/currentUser
// @access  Private
router.get(
  '/currentUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);

// @desc    Update currently logged in user's profile
// @route   PUT /api/profile/currentUser
// @access  Private
router.put(
  '/currentUser',
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
    body('password', 'Password must be between 6 and 20 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 })
      .trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const user = await User.query().findOne({ userID: req.user.userID });
    if (user == null) {
      res.send('No User');
    }

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const updatedUser = await User.query().patchAndFetchById(
          req.user.userID,
          {
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: `${req.body.firstName} ${req.body.lastName}`,
          }
        );

        const tokenObject = issueJWT(updatedUser);

        res.json({
          userID: updatedUser.userID,
          email: updatedUser.email,
          username: updatedUser.username,
          displayName: updatedUser.displayName,
          accountType: updatedUser.accountType,
          gravatar: updatedUser.gravatar,
          token: tokenObject.token,
        });
      } else {
        res.send('Wrong Password');
      }
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Update currently logged in user's profile data
// @route   PUT /api/profile/currentUser/profile
// @access  Private
router.put(
  '/currentUser/profile',
  // Validation and sanitation
  [
    body('firstName', 'First name is required').not().isEmpty().trim(),
    body('lastName', 'Last name is required').not().isEmpty().trim(),
    body('location').trim(),
    body('bio').trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const user = await User.query().findOne({ userID: req.user.userID });
    if (user == null) {
      res.send('No User');
    }

    try {
      const updatedUser = await User.query().patchAndFetchById(
        req.user.userID,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          displayName: `${req.body.firstName} ${req.body.lastName}`,
          location: req.body.location,
          bio: req.body.bio,
        }
      );

      res.json({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        displayName: updatedUser.displayName,
        location: updatedUser.location,
        bio: updatedUser.bio,
      });
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Update currently logged in user's account data
// @route   PUT /api/profile/currentUser/account
// @access  Private
router.put(
  '/currentUser/account',
  // Validation and sanitation
  [
    body('username', 'Username is required').not().isEmpty().trim(),
    body('email', 'Must be a valid email address')
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .normalizeEmail(),
    body('password', 'Password must be between 6 and 20 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 })
      .trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const user = await User.query().findOne({ userID: req.user.userID });
    if (user == null) {
      res.send('No User');
    }

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const avatar = normalize(
          gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          }),
          { forceHttps: true }
        );

        const updatedUser = await User.query().patchAndFetchById(
          req.user.userID,
          {
            username: req.body.username,
            email: req.body.email,
            gravatar: avatar,
          }
        );

        res.json({
          username: updatedUser.username,
          email: updatedUser.email,
          gravatar: updatedUser.gravatar,
        });
      } else {
        res.json({
          error: true,
          msg:
            'Oops! Password does not match the one in our records! Please retype and try again.',
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Update currently logged in user's password
// @route   PUT /api/profile/currentUser/password
// @access  Private
router.put(
  '/currentUser/password',
  // Validation and sanitation
  [
    body('oldPassword', 'Old password must be between 6 and 20 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 })
      .trim(),
    body('newPassword', 'New password must be between 6 and 20 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 })
      .trim(),
  ],
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const user = await User.query().findOne({ userID: req.user.userID });
    if (user == null) {
      res.send('No User');
    }
    try {
      if (await bcrypt.compare(req.body.oldPassword, user.password)) {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        await User.query().patchAndFetchById(req.user.userID, {
          password: hashedPassword,
        });

        res.json({
          error: false,
          msg: 'Password changed successfully!',
        });
      } else {
        res.json({
          error: true,
          msg:
            'Oops! Password does not match the one in our records! Please retype and try again.',
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
);

// @desc    Delete currently logged in user's account
// @route   Delete /api/profile/currentUser
// @access  Private
router.delete(
  '/currentUser/:password',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User.query().findOne({ userID: req.user.userID });
    if (user == null) {
      res.send('No User');
    }

    if (req.params.password !== 'social') {
      try {
        if (await bcrypt.compare(req.params.password, user.password)) {
          await Favourite.query().delete().where('userID', req.user.userID);
          await RefreshToken.query().delete().where('userID', req.user.userID);
          await User.query().deleteById(req.user.userID);
  
          res.json({
            error: false,
            msg: 'Account deleted successfully!',
          });
        } else {
          res.json({
            error: true,
            msg:
              'Oops! Password does not match the one in our records! Please retype and try again.',
          });
        }
      } catch (error) {
        res.send(error.message);
      }
    } else {
        try {
          await Favourite.query().delete().where('userID', req.user.userID);
          await RefreshToken.query().delete().where('userID', req.user.userID);
          await User.query().deleteById(req.user.userID);
  
          res.json({
            error: false,
            msg: 'Account deleted successfully!',
          });
      } catch (error) {
          res.send(error.message);
      }
    }
  }
);

module.exports = router;
