const express = require('express');
const app = express();

const authRoutes = require('./api/auth');
const profileRoutes = require('./api/profile');
const productsRoutes = require('./api/products');
const productsSubtypesRoutes = require('./api/subtypes');
const searchRoutes = require('./api/search');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/products', productsRoutes);
app.use('/products/subtypes', productsSubtypesRoutes);
app.use('/search', searchRoutes);

module.exports = app;
