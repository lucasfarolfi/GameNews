const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const ids = require('../../utils/seeds_id')
dotenv.config()

const salt =  parseInt(process.env.HASH_SALT)

exports.seed = (knex) => {
  
  return knex('user').del()
    .then(() =>{
      // Inserts seed entries
      return knex('user').insert([
        {id: ids.user1, name: "John Doe", slug: "john-doe", email: "john123@email.com", password: bcrypt.hashSync("123123123", salt), role: 1},
        {id:  ids.user2, name: "Jessica Martin", slug: "jessica-martin", email: "jessica123@email.com", password: bcrypt.hashSync("123123123", salt), role: 1},
        {id: ids.user3, name: "Samuel Lee", slug: "samuel-lee", email: "samuel123@email.com", password: bcrypt.hashSync("123123123", salt), role: 2},
        {id: ids.user4, name: "Heather Mcdonald", slug: "heather-mcdonald", email: "jheather123@email.com", password: bcrypt.hashSync("123123123",salt), role: 2},
        {id: ids.user5, name: "Samuel Wilson", slug: "samuel-wilson", email: "samuel123@email.com", password: bcrypt.hashSync("123123123",salt), role: 3}
      ]);
    });
};
