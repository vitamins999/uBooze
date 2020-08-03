const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const { NotFoundError } = require('objection');

// Get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.query();

    if (users.length === 0) {
      throw new NotFoundError(users);
    }
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get('/currentUser', (req, res) => {
  res.send(req.user);
});

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(500).send();
    } else {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        res.status(200).send();
        console.log(req.user);
      });
    }
  })(req, res, next);
});

// Create a new user
router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.query().insert({
      password: hashedPassword,
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
    });
    res.status(200).send();
  } catch (error) {
    res.json({ error: error });
  }
});

// Auth with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000');
});

// Auth with Facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

// Facebook callback route
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('http://localhost:3000');
  }
);

module.exports = router;
