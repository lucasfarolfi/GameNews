const dotenv = require('dotenv')
dotenv.config()

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST_DB,
      database: process.env.DATABASE,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/database/migrations'
    },
    seeds: {
      directory: __dirname + '/src/database/seeds'
    }
  },

};
