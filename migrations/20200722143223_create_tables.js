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
      table.string('defaultPostcode');
      table.datetime('createdAt').defaultTo(knex.fn.now());
      table.string('accountType').defaultTo('regular');
      table.string('gravatar');
      table.string('facebookID');
      table.string('googleID');
    })
    .createTable('products', (table) => {
      table.increments('productID');
      table.string('productName');
      table.string('displayName');
      table.string('volume');
      table.string('drinkType');
      table.string('drinkSubtype');
    })
    .createTable('productComments', (table) => {
      table.increments('commentID');
      table.text('comment').notNullable();
      table.datetime('createdAt').defaultTo(knex.fn.now());
      table.datetime('lastEditedAt');
      table.integer('userID').unsigned().notNullable();
      table.integer('productID').unsigned().notNullable();

      // Foreign Keys
      table.foreign('userID').references('userID').inTable('users');
      table.foreign('productID').references('productID').inTable('products');
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
    .createTable('productCommentLikes', (table) => {
      table.increments('commentLikeID');
      table.integer('userID').unsigned().notNullable();
      table.integer('commentID').unsigned().notNullable();

      // Foreign Keys
      table.foreign('userID').references('userID').inTable('users');
      table
        .foreign('commentID')
        .references('commentID')
        .inTable('productComments');
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
    .dropTableIfExists('productCommentLikes')
    .dropTableIfExists('productFavourites')
    .dropTableIfExists('productRatings')
    .dropTableIfExists('productComments')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};
