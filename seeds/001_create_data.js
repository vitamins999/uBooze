const { asdaBeer } = require('./base_data/asdaBeer');
const { asdaWine } = require('./base_data/asdaWine');
const { asdaSpirits } = require('./base_data/asdaSpirits');

const { coopBeer } = require('./base_data/coopBeer');
const { coopWine } = require('./base_data/coopWine');
const { coopSpirits } = require('./base_data/coopSpirits');

const { icelandBeer } = require('./base_data/icelandBeer');
const { icelandWine } = require('./base_data/icelandWine');
const { icelandSpirits } = require('./base_data/icelandSpirits');

const { morrisonsBeer } = require('./base_data/morrisonsBeer');
const { morrisonsWine } = require('./base_data/morrisonsWine');
const { morrisonsSpirits } = require('./base_data/morrisonsSpirits');

const { sainsburysBeer } = require('./base_data/sainsburysBeer');
const { sainsburysWine } = require('./base_data/sainsburysWine');
const { sainsburysSpirits } = require('./base_data/sainsburysSpirits');

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
      return knex('supermarketProducts').insert(waitroseBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(waitroseWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(waitroseSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(tescoSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(sainsburysBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(sainsburysWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(sainsburysSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(morrisonsBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(morrisonsWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(morrisonsSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(icelandBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(icelandWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(icelandSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(coopBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(coopWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(coopSpirits);
    })
    .then(() => {
      return knex('supermarketProducts').insert(asdaBeer);
    })
    .then(() => {
      return knex('supermarketProducts').insert(asdaWine);
    })
    .then(() => {
      return knex('supermarketProducts').insert(asdaSpirits);
    });
};
