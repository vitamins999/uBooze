const express = require('express');
const app = express();

const adminRoutes = require('./api/admin');
const authRoutes = require('./api/auth');
const emailRoutes = require('./api/email');
const favouritesRoutes = require('./api/favourites');
const profileRoutes = require('./api/profile');
const productsRoutes = require('./api/products');
const productsSubtypesRoutes = require('./api/subtypes');
const ratingRoutes = require('./api/ratings');
const searchRoutes = require('./api/search');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/email', emailRoutes);
app.use('/favourites', favouritesRoutes);
app.use('/profile', profileRoutes);
app.use('/products', productsRoutes);
app.use('/products/subtypes', productsSubtypesRoutes);
app.use('/ratings', ratingRoutes);
app.use('/search', searchRoutes);

module.exports = app;
