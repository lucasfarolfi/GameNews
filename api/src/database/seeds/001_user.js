const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const salt =  parseInt(process.env.HASH_SALT)

exports.seed = (knex) => {
  
  return knex('user').del()
    .then(() =>{
      // Inserts seed entries
      return knex('user').insert([
        {name: "John Doe", email: "john123@email.com", password: bcrypt.hashSync("123123123", salt), role: 2},
        {name: "Jessica Martin", email: "jessica123@email.com", password: bcrypt.hashSync("123123123", salt), role: 2},
        {name: "Samuel Lee", email: "samuel123@email.com", password: bcrypt.hashSync("123123123", salt), role: 2},
        {name: "Heather Mcdonald", email: "jheather123@email.com", password: bcrypt.hashSync("123123123",salt), role: 2},
      ]);
    });
};
