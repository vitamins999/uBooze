const { sainsburysDrinksBaseData } = require('./base_data/sainsburys.js');
const { tescoDrinksBaseData } = require('./base_data/tesco.js');
const { waitroseDrinksBaseData } = require('./base_data/waitrose.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sainsburys')
    .del()
    .then(() => {
      return knex('tesco').del();
    })
    .then(() => {
      return knex('waitrose').del();
    })
    .then(() => {
      return knex('productCommentLikes').del();
    })
    .then(() => {
      return knex('productFavourites').del();
    })
    .then(() => {
      return knex('productRatings').del();
    })
    .then(() => {
      return knex('productComments').del();
    })
    .then(() => {
      return knex('products').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      // Inserts new fake data into users
      return knex('users').insert([
        {
          username: 'davedavedave',
          password: 'mypass123',
          email: 'davedavedave@gmail.com',
          firstName: 'Dave',
          lastName: 'Fakename',
          defaultPostcode: 'NW3 5PP',
          gravatar: 'https://www.gravatar.com/davedavedave.jpg',
        },
        {
          username: 'jjimson',
          password: 'youllneverguessthis000!',
          email: 'jjimson000@gmail.com',
          firstName: 'Jim',
          lastName: 'Jimson',
          defaultPostcode: 'FE3 4XX',
          gravatar: 'https://www.gravatar.com/jjimson.jpg',
        },
        {
          username: 'iluvcats',
          password: 'catsarebrilliant',
          email: 'iluvcats@gmail.com',
          firstName: 'Kate',
          lastName: 'Smith',
          defaultPostcode: 'SS6 8LQ',
          gravatar: 'https://www.gravatar.com/iluvcats.jpg',
        },
      ]);
    })
    .then(() => {
      // Insert base data into sainsbury's table
      return knex('sainsburys').insert(sainsburysDrinksBaseData);
    })
    .then(() => {
      // Insert base data into tesco's table
      return knex('tesco').insert(tescoDrinksBaseData);
    })
    .then(() => {
      // Insert base data into waitrose's table
      return knex('waitrose').insert(waitroseDrinksBaseData);
    })
    .then(() => {
      // Insert a small amount of initial values into products table
      // MAKE SURE TO INSERT THE FULL DATA SET HERE FOR PRODUCTION
      return knex('products').insert([
        {
          productName: 'Sam Miguel',
          volume: '4x300ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productName: 'Budweiser',
          volume: '15x300ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productName: 'Blossom Hill',
          volume: '75cl',
          drinkType: 'wine',
          drinkSubtype: 'red',
        },
        {
          productName: 'Tesco Bucks Fizz',
          volume: '75cl',
          drinkType: 'wine',
          drinkSubtype: 'sparkling',
        },
        {
          productName: "Gordon's London Dry Gin",
          volume: '1l',
          drinkType: 'spirits',
          drinkSubtype: 'gin',
        },
        {
          productName: "Jack Daniel's Whisky",
          volume: '35cl',
          drinkType: 'spirits',
          drinkSubtype: 'whisky',
        },
      ]);
    });
};
