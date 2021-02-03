const { supermarketBaseData } = require('./base_data/supermarket-test');
const { productsBeer } = require('./base_data/productsBeer');
const { productsWine } = require('./base_data/productsWine');
const { productsSpirits } = require('./base_data/productsSpirits');
const { tescoBeer } = require('./base_data/tescoBeer');
const { tescoWine } = require('./base_data/tescoWine');
const { tescoSpirits } = require('./base_data/tescoSpirits');
const { waitroseBeer } = require('./base_data/waitroseBeer');
const { waitroseWine } = require('./base_data/waitroseWine');
const { waitroseSpirits } = require('./base_data/waitroseSpirits');
const { allProducts } = require('./base_data/allProducts');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('supermarketProducts')
    .del()
    .then(() => {
      return knex('productFavourites').del();
    })
    .then(() => {
      return knex('productRatings').del();
    })
    .then(() => {
      return knex('products').del();
    })
    .then(() => {
      return knex('userRefreshTokens').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      // Inserts new fake data into users
      return knex('users').insert([
        {
          username: 'davedavedave',
          password: '123456',
          email: 'davedavedave@gmail.com',
          firstName: 'Dave',
          lastName: 'Fakename',
        },
        {
          username: 'jjimson',
          password: '123456',
          email: 'jjimson000@gmail.com',
          firstName: 'Jim',
          lastName: 'Jimson',
        },
        {
          username: 'iluvcats',
          password: '123456',
          email: 'iluvcats@gmail.com',
          firstName: 'Kate',
          lastName: 'Smith',
        },
      ]);
    })
    .then(() => {
      return knex('products').insert(allProducts);
    })
    .then(() => {
      return knex('supermarketProducts').insert(waitroseBeer)
    })
    .then(() => {
      return knex('supermarketProducts').insert(waitroseWine)
    })
    .then(() => {
      return knex('supermarketProducts').insert(waitroseSpirits)
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoBeer)
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoWine)
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoSpirits)
    })
};
