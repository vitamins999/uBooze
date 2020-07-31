const express = require('express');
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('../knexfile');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');

const passportSetup = require('../config/passport-setup');

const knex = Knex(knexFile.development);

Model.knex(knex);

const app = express();
const apiRoutes = require('./routes/api');
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
