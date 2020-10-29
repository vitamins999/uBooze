const express = require('express');
const router = express.Router();
const passport = require('passport');
const { admin } = require('../../middleware/authMiddleware');
const User = require('../../models/User');

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
  passport.authenticate('jwt', { session: false }),
  admin,
  async (req, res) => {
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

module.exports = router;
