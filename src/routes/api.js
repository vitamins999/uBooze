const express = require('express');
const app = express();

const authRoutes = require('./api/auth');

app.use('/auth', authRoutes);

module.exports = app;
