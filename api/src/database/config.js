const knex = require('knex')({
    client: 'mysql2', //Tipo de banco de dados
    connection: {
      host : process.env.HOST_DB, //Pode ser o ip ou o localhost
      user : process.env.USER_DB, //Usuário do BD
      password : process.env.PASSWORD_DB, //Senha do BD
      database : process.env.DATABASE //Banco de dados
    }
});

module.exports = knex