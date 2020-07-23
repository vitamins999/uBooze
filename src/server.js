const express = require('express');
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('../knexfile');

const knex = Knex(knexFile.development);

Model.knex(knex);

const app = express();
const apiRoutes = require('./routes/api');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
