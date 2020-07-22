// Executed during a migration
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('user_id');
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('default_postcode');
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.string('account_type').defaultTo('regular');
      table.string('gravatar');
    })
    .createTable('products', (table) => {
      table.increments('product_id');
      table.string('product_name');
      table.string('volume');
      table.string('drink_type');
      table.string('drink_subtype');
    })
    .createTable('product_comments', (table) => {
      table.increments('comment_id');
      table.text('comment').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.datetime('last_edited_at');
      table.integer('user_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();

      // Foreign Keys
      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('product_ratings', (table) => {
      table.increments('rating_id');
      table.integer('rating').defaultTo(0);
      table.integer('user_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();

      // Foreign Keys
      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('product_favourites', (table) => {
      table.increments('favourite_id');
      table.datetime('favourited_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();

      // Foreign Keys
      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('product_comment_likes', (table) => {
      table.increments('comment_like_id');
      table.integer('user_id').unsigned().notNullable();
      table.integer('comment_id').unsigned().notNullable();

      // Foreign Keys
      table.foreign('user_id').references('user_id').inTable('users');
      table
        .foreign('comment_id')
        .references('comment_id')
        .inTable('product_comments');
    })
    .createTable('waitrose', (table) => {
      table.increments('supermarket_product_id');
      table.string('name').notNullable();
      table.integer('price').notNullable();
      table.string('offer').notNullable();
      table.string('link');
      table.string('image');
      table.string('drink_type').notNullable();
      table.string('drink_subtype').notNullable();
      table.integer('product_id').unsigned();

      // Foreign Key
      table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('tesco', (table) => {
      table.increments('supermarket_product_id');
      table.string('name').notNullable();
      table.integer('price').notNullable();
      table.string('offer').notNullable();
      table.string('link');
      table.string('image');
      table.string('drink_type').notNullable();
      table.string('drink_subtype').notNullable();
      table.integer('product_id').unsigned();

      // Foreign Key
      table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('sainsburys', (table) => {
      table.increments('supermarket_product_id');
      table.string('name').notNullable();
      table.integer('price').notNullable();
      table.string('offer').notNullable();
      table.string('link');
      table.string('image');
      table.string('drink_type').notNullable();
      table.string('drink_subtype').notNullable();
      table.integer('product_id').unsigned();

      // Foreign Key
      table.foreign('product_id').references('product_id').inTable('products');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('sainsburys')
    .dropTableIfExists('tesco')
    .dropTableIfExists('waitrose')
    .dropTableIfExists('product_comment_likes')
    .dropTableIfExists('product_favourites')
    .dropTableIfExists('product_ratings')
    .dropTableIfExists('product_comments')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};
