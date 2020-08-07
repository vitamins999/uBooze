const express = require('express');
const app = express();

const authRoutes = require('./api/auth');
const profileRoutes = require('./api/profile');
const productsRoutes = require('./api/products');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/products', productsRoutes);

module.exports = app;
