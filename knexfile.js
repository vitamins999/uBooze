module.exports = {
  development: {
    client: 'pg',
    connection: process.env.SUPABASE_CONNECTION_DEV,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.SUPABASE_CONNECTION_PROD,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
