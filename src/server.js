const express = require('express');
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('../knexfile');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const passportSetup = require('../config/passport-setup');

const knex = Knex(knexFile.development);

Model.knex(knex);

const app = express();
const apiRoutes = require('./routes/api');
const port = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
