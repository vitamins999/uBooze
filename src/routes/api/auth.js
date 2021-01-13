const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const normalize = require('normalize-url');
const { body, validationResult } = require('express-validator');

const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const { issueJWT, issueRefreshJWT } = require('../../utils/jwt');
const { getPasswordResetToken } = require('../../utils/passwordReset');
const sendEmail = require('../../utils/email');

const User = require('../../models/User');
const Favourite = require('../../models/Favourite');
const RefreshToken = require('../../models/RefreshToken');
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

// Refresh JWT
router.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.sendStatus(403);
  }

  try {
    const refreshTokenExists = await RefreshToken.query().findOne({
      refreshToken,
    });

    if (refreshTokenExists) {
      const { userID } = jsonwebtoken.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const newAccessToken = issueJWT({ userID });
      const newRefreshToken = issueRefreshJWT({ userID });

      await RefreshToken.query()
        .patch({
          refreshToken: newRefreshToken,
        })
        .findOne({
          userID,
        });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        token: newAccessToken.token,
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(403);
  }
});

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res
        .status(500)
        .send(
          "Whoops! User credentials don't match our database. Either the email/password is incorrect, or you haven't registered."
        );
    } else {
      const refreshToken = issueRefreshJWT(user);

      await RefreshToken.query()
        .patch({ refreshToken })
        .findOne({ userID: user.userID });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        user,
      });
    }
  })(req, res, next);
});

// Create a new user
router.post(
  '/register',
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
  async (req, res, next) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const { firstName, lastName, username, email, password } = req.body;

    const userExists = await User.query().findOne({ email });

    if (userExists) {
      res.status(400).send('This email address is already registered!');
    } else {
      const usernameExists = await User.query().findOne({ username });

      if (usernameExists) {
        res
          .status(400)
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

          const refreshToken = issueRefreshJWT(user);

          await RefreshToken.query().insert({
            userID: user.userID,
            refreshToken,
          });

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
          });

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
  }
);

// Forgot password email
router.post(
  '/forgotpassword',
  // Validation and sanitation
  [
    body('email', 'Must be a valid email address')
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .normalizeEmail(),
  ],
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const { email } = req.body;

    try {
      const user = await User.query().findOne({
        email: email,
      });

      if (!user) {
        res.json({
          error,
        });
      } else {
        const { resetToken, resetPasswordToken } = getPasswordResetToken();

        await User.query()
          .patch({
            resetPasswordToken,
            resetPasswordExpire: Date.now() + 10 * (60 * 1000), // 10 minutes
          })
          .findById(user.userID);

        const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;

        const text = `
      <p>Hi!</p>
      <p>It looks like you requested a password reset for ubooze.com</p>
      <p>Please go to this link to reset your password:</p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
      <p>Best wishes,</p>
      <p><strong>The ubooze team</strong></p>
      `;

        try {
          await sendEmail({
            to: user.email,
            subject: 'ubooze -- You have requested a password reset',
            text,
          });
          res.json({ error: false });
        } catch (error) {
          await User.query()
            .patch({
              resetPasswordToken: null,
              resetPasswordExpire: null,
            })
            .findById(user.userID);
          res.json({
            error,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  }
);

// Reset password from reset password token URL
router.put(
  '/resetpassword/:resettoken',
  // Validation and sanitation
  [
    body('password', 'Password must be between 6 and 20 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 })
      .trim(),
  ],
  async (req, res) => {
    // Returns array of validation errors, if they exist.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors:
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    try {
      const user = await User.query().findOne({
        resetPasswordToken,
      });

      if (!user) {
        res.json({
          error:
            'Invalid password link.  Please resend reset email and try again.',
        });
      } else {
        const resetPasswordExpire = parseInt(user.resetPasswordExpire);

        if (Date.now() > resetPasswordExpire) {
          res.json({
            error: 'Reset password link has expired. Please try again.',
          });
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);

          await User.query()
            .patch({
              password: hashedPassword,
              resetPasswordToken: null,
              resetPasswordExpire: null,
            })
            .findById(user.userID);

          res.status(201).json({
            error: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  }
);

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
  passport.authenticate('google', {
    session: false,
    failureRedirect:
      'http://localhost:3000/login?error=alreadyregisteredgoogle',
  }),
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
  passport.authenticate('facebook', {
    session: false,
    failureRedirect:
      'http://localhost:3000/login?error=alreadyregisteredfacebook',
  }),
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
