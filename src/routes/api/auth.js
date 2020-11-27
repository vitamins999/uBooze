const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const normalize = require('normalize-url');

const passport = require('passport');
const bcrypt = require('bcrypt');
const issueJWT = require('../../utils/jwt');

const User = require('../../models/User');
const Favourite = require('../../models/Favourite');
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

// Simple route to check protected routes work
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({
      user: req.user,
      success: true,
      msg: 'You are successfully authenticated for this route!',
    });
  }
);

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res
        .status(401)
        .send(
          "Whoops! User credentials don't match our database. Either the email/password is incorrect, or you haven't registered."
        );
    } else {
      res.status(200).json({
        user,
      });
    }
  })(req, res, next);
});

// Create a new user
router.post('/register', async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  const userExists = await User.query().findOne({ email });

  if (userExists) {
    res.status(401).send('This email address is already registered!');
  } else {
    const usernameExists = await User.query().findOne({ username });

    if (usernameExists) {
      res
        .status(401)
        .send('This username is already taken. Please try another one.');
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const avatar = normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          }),
          { forceHttps: true }
        );

        const user = await User.query().insert({
          password: hashedPassword,
          email,
          username,
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          gravatar: avatar,
          isAdmin: false,
        });
        const token = issueJWT(user);
        res.status(201).json({
          userID: user.userID,
          email: user.email,
          username: user.username,
          displayName: user.displayName,
          isAdmin: user.isAdmin,
          gravatar: user.gravatar,
          token: token.token,
        });
      } catch (error) {
        res.json({ error: error });
      }
    }
  }
});

// Auth with Google
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

// Google callback route
router.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    let favourites = await Favourite.query().select('productID').where({
      userID: req.user.userID,
    });

    if (!favourites) {
      favourites = [];
    } else {
      favourites = favourites.map((item) => item.productID);
    }
    const user = {
      userID: req.user.userID,
      email: req.user.email,
      username: req.user.username,
      displayName: req.user.displayName,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      location: req.user.location,
      bio: req.user.bio,
      isAdmin: req.user.isAdmin,
      gravatar: req.user.gravatar,
      favourites,
      token: req.user.token,
    };
    res.cookie('user', JSON.stringify(user));
    res.redirect('http://localhost:3000');
  }
);

// Auth with Facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['public_profile', 'email'],
  })
);

// Facebook callback route
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { session: false }),
  async (req, res) => {
    let favourites = await Favourite.query().select('productID').where({
      userID: req.user.userID,
    });

    if (!favourites) {
      favourites = [];
    } else {
      favourites = favourites.map((item) => item.productID);
    }
    const user = {
      userID: req.user.userID,
      email: req.user.email,
      username: req.user.username,
      displayName: req.user.displayName,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      location: req.user.location,
      bio: req.user.bio,
      isAdmin: req.user.isAdmin,
      gravatar: req.user.gravatar,
      favourites,
      token: req.user.token,
    };
    res.cookie('user', JSON.stringify(user));
    res.redirect('http://localhost:3000');
  }
);

module.exports = router;
