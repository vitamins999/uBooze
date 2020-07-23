const express = require('express');
const app = express();

const userRoutes = require('./api/users');

app.use('/users', userRoutes);

module.exports = app;
