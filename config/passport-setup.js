const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/User');
const Favourite = require('../src/models/Favourite');
const bcrypt = require('bcrypt');
const { issueJWT } = require('../src/utils/jwt');
const gravatar = require('gravatar');
const normalize = require('normalize-url');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const authenticateUser = async (email, password, done) => {
  const user = await User.query().findOne({ email: email });

  if (!user) {
    return done(null, false);
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      let favourites = await Favourite.query().select('productID').where({
        userID: user.userID,
      });

      if (!favourites) {
        favourites = [];
      } else {
        favourites = favourites.map((item) => item.productID);
      }

      const tokenObject = issueJWT(user);

      return done(null, {
        userID: user.userID,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        bio: user.bio,
        isAdmin: user.isAdmin,
        gravatar: user.gravatar,
        favourites,
        token: tokenObject.token,
      });
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

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
            const tokenObject = issueJWT(currentUser);
            currentUser.token = tokenObject.token;
            done(null, currentUser);
          } else {
            User.query()
              .findOne({ email: profile.emails[0].value })
              .then((currentUserEmailExists) => {
                if (currentUserEmailExists) {
                  done(null, false);
                } else {
                  const avatar = normalize(
                    gravatar.url(profile.emails[0].value, {
                      s: '200',
                      r: 'pg',
                      d: 'mm',
                    }),
                    { forceHttps: true }
                  );

                  User.query()
                    .insert({
                      googleID: profile.id,
                      displayName: profile.displayName,
                      email: profile.emails[0].value,
                      username: profile.emails[0].value.split('@')[0],
                      gravatar: avatar,
                      firstName: profile.name.givenName,
                      lastName: profile.name.familyName,
                      isAdmin: false,
                    })
                    .then((newUser) => {
                      const tokenObject = issueJWT(newUser);
                      newUser.token = tokenObject.token;
                      done(null, newUser);
                    });
                }
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
      profileFields: ['id', 'displayName', 'first_name', 'last_name', 'emails'],
    },
    (accessToken, refreshToken, profile, done) => {
      User.query()
        .findOne({ facebookID: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            User.query()
              .findOne({ email: profile.emails[0].value })
              .then((currentUserEmailExists) => {
                if (currentUserEmailExists) {
                  done(null, false);
                } else {
                  const avatar = normalize(
                    gravatar.url(profile.emails[0].value, {
                      s: '200',
                      r: 'pg',
                      d: 'mm',
                    }),
                    { forceHttps: true }
                  );

                  User.query()
                    .insert({
                      facebookID: profile.id,
                      displayName: profile.displayName,
                      email: profile.emails[0].value,
                      username: profile.emails[0].value.split('@')[0],
                      gravatar: avatar,
                      firstName: profile.name.givenName,
                      lastName: profile.name.familyName,
                      isAdmin: false,
                    })
                    .then((newUser) => {
                      const tokenObject = issueJWT(newUser);
                      newUser.token = tokenObject.token;
                      done(null, newUser);
                    });
                }
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
        const user = await User.query()
          .select([
            'userID',
            'username',
            'email',
            'displayName',
            'firstName',
            'lastName',
            'location',
            'bio',
            'createdAt',
            'isAdmin',
            'gravatar',
            'facebookID',
            'googleID',
          ])
          .findOne({ userID: jwt_payload.sub });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
