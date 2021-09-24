const bcrypt = require('bcrypt')

exports.seed = (knex) => {
  
  return knex('user').del()
    .then(() =>{
      // Inserts seed entries
      return knex('user').insert([
        {name: "John Doe", email: "john123@email.com", password: "123123123", role: 2},
        {name: "Jessica Martin", email: "jessica123@email.com", password: "123123123", role: 2},
        {name: "Samuel Lee", email: "samuel123@email.com", password: "123123123", role: 2},
        {name: "Heather Mcdonald", email: "jheather123@email.com", password: "123123123", role: 2},
      ]);
    });
};
