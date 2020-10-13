const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/User');
const bcrypt = require('bcrypt');
const issueJWT = require('../src/utils/jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const authenticateUser = async (email, password, done) => {
  const user = await User.query().findOne({ email: email });
  if (user == null) {
    console.log('no user');
    return done(null, false);
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const tokenObject = issueJWT(user);
      return done(null, {
        userID: user.userID,
        email: user.email,
        displayName: user.displayName,
        accountType: user.accountType,
        token: tokenObject.token,
      });
    } else {
      console.log('wrong password');
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

passport.serializeUser((user, done) => {
  console.log('serializing...');
  done(null, user.userID);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing...');
  User.query()
    .findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    authenticateUser
  )
);

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

// JWT payload passed into verify callback
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        done(error);
      }
    }
  )
);
