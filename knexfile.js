let config = require('./config/config.js');

module.exports = {

  development: {
    client: 'postgresql',
    connection: config.database.uri,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: config.database.uri,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
