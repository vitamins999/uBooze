const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.userID);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/api/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.query()
        .findOne({ googleID: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            console.log(profile);
            User.query()
              .insert({
                googleID: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
              })
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/api/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'emails'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.query()
        .findOne({ facebookID: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            console.log(profile);
            User.query()
              .insert({
                facebookID: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
              })
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
    }
  )
);
