// Executed during a migration
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('userID');
      table.string('username');
      table.string('email');
      table.string('password');
      table.string('firstName');
      table.string('lastName');
      table.string('displayName');
      table.string('location');
      table.text('bio');
      table.datetime('createdAt').defaultTo(knex.fn.now());
      table.boolean('isAdmin').defaultTo(false);
      table.string('gravatar');
      table.string('facebookID');
      table.string('googleID');
      table.string('resetPasswordToken');
      table.string('resetPasswordExpire');
    })
    .createTable('userRefreshTokens', (table) => {
      table.increments('refreshTokenID');
      table.integer('userID').unsigned().notNullable();
      table.string('refreshToken');

      // Foreign Keys
      table.foreign('userID').references('userID').inTable('users');
    })
    .createTable('products', (table) => {
      table.increments('productID');
      table.string('productName');
      table.string('displayName');
      table.string('volume');
      table.string('drinkType');
      table.string('drinkSubtype');
    })
    .createTable('productRatings', (table) => {
      table.increments('ratingID');
      table.integer('rating').defaultTo(0);
      table.integer('userID').unsigned().notNullable();
      table.integer('productID').unsigned().notNullable();

      // Foreign Keys
      table.foreign('userID').references('userID').inTable('users');
      table.foreign('productID').references('productID').inTable('products');
    })
    .createTable('productFavourites', (table) => {
      table.increments('favouriteID');
      table.datetime('favouritedAt').defaultTo(knex.fn.now());
      table.integer('userID').unsigned().notNullable();
      table.integer('productID').unsigned().notNullable();

      // Foreign Keys
      table.foreign('userID').references('userID').inTable('users');
      table.foreign('productID').references('productID').inTable('products');
    })
    .createTable('supermarketProducts', (table) => {
      table.increments('supermarketProductID');
      table.string('supermarket').notNullable();
      table.string('productName').notNullable();
      table.integer('price').notNullable();
      table.string('offer').notNullable();
      table.string('link');
      table.string('image');
      table.string('drinkType').notNullable();
      table.string('drinkSubtype').notNullable();
      table.datetime('updatedAt').defaultTo(knex.fn.now());
      table.integer('productID').unsigned();

      // Foreign Key
      table.foreign('productID').references('productID').inTable('products');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('supermarketProducts')
    .dropTableIfExists('productFavourites')
    .dropTableIfExists('productRatings')
    .dropTableIfExists('products')
    .dropTableIfExists('userRefreshTokens')
    .dropTableIfExists('users');
};
