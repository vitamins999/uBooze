const gravatar = require('gravatar');
const { supermarketBaseData } = require('./base_data/supermarket-test');

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
      // Insert a small amount of initial values into products table
      // MAKE SURE TO INSERT THE FULL DATA SET HERE FOR PRODUCTION
      return knex('products').insert([
        {
          productID: 1,
          productName: 'Sam Miguel',
          displayName: 'Sam Miguel',
          volume: '4x330ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 2,
          productName: 'Budweiser',
          displayName: 'Budweiser',
          volume: '15x300ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 3,
          productName: 'Blossom Hill',
          displayName: 'Blossom Hill',
          volume: '75cl',
          drinkType: 'wine',
          drinkSubtype: 'red',
        },
        {
          productID: 4,
          productName: 'Tesco Bucks Fizz',
          displayName: 'Tesco Bucks Fizz',
          volume: '75cl',
          drinkType: 'wine',
          drinkSubtype: 'sparkling',
        },
        {
          productID: 5,
          productName: "Gordon's London Dry Gin",
          displayName: "Gordon's Dry Gin",
          volume: '1l',
          drinkType: 'spirits',
          drinkSubtype: 'gin',
        },
        {
          productID: 6,
          productName: "Jack Daniel's Whisky",
          displayName: "Jack Daniel's Whisky",
          volume: '70cl',
          drinkType: 'spirits',
          drinkSubtype: 'whisky',
        },
        {
          productID: 7,
          productName: 'Stella Artois',
          displayName: 'Stella Artois',
          volume: '18x440ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 8,
          productName: 'Peroni Nastro Azzurro',
          displayName: 'Peroni Nastro Azzurro',
          volume: '12x330ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 9,
          productName: 'Stella Artois',
          displayName: 'Stella Artois',
          volume: '15x284ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 10,
          productName: 'Birra Moretti',
          displayName: 'Birra Moretti',
          volume: '12 X 330Ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 11,
          productName: 'Heineken',
          displayName: 'Heineken',
          volume: '15 X 440Ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 12,
          productName: 'Kronenbourg 1664',
          displayName: 'Kronenbourg 1664',
          volume: '15 X 440Ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 13,
          productName: 'Carling',
          displayName: 'Carling',
          volume: '18X440ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 14,
          productName: 'Hop House 13',
          displayName: 'Hop House 13',
          volume: '6 X 330Ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 15,
          productName: 'Desperados Tequila Flavoured Beer',
          displayName: 'Desperados',
          volume: '12X250ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 16,
          productName: 'Coors Light',
          displayName: 'Coors Light',
          volume: '20 X 330Ml',
          drinkType: 'beer',
          drinkSubtype: 'lager',
        },
        {
          productID: 17,
          productName: 'Classic Ales',
          displayName: 'Classic Ales',
          volume: '6x500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 18,
          productName: 'Adnams Ghost Ship',
          displayName: 'Adnams Ghost Ship',
          volume: '4x440ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 19,
          productName: 'Adnams Ghost Ship',
          displayName: 'Adnams Ghost Ship',
          volume: '500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 20,
          productName: 'Badger Brewery Golden Champion Ale',
          displayName: 'Golden Champion Ale',
          volume: '500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 21,
          productName: 'Badger Twice Tangled IPA',
          displayName: 'Twice Tangled IPA',
          volume: '500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 22,
          productName: 'Wychwood Brewery Gold Hobgoblin',
          displayName: 'Gold Hobgoblin',
          volume: '500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
        {
          productID: 23,
          productName: 'Badger Hopping Hare',
          displayName: 'Hopping Hare',
          volume: '500ml',
          drinkType: 'beer',
          drinkSubtype: 'ale',
        },
      ]);
    })
    .then(() => {
      // Insert base data into supermarketProducts's table
      return knex('supermarketProducts').insert(supermarketBaseData);
    });
};
