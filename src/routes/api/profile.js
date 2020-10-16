const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

const User = require('../../models/User');
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
      .select(['username', 'userID', 'displayName', 'createdAt', 'gravatar'])
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
          'accountType',
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
        avatar: user.gravatar,
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
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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

module.exports = router;
