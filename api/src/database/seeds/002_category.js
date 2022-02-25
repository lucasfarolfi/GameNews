const ids = require('../../utils/seeds_id')

exports.seed = (knex) => {
  return knex('category').del()
    .then(() =>{
      // Inserts seed entries
      return knex('category').insert([
        {id: ids.category1, name: "Consoles", slug: "consoles", user_id: ids.user1},
        {id: ids.category2, name: "Jogos", slug: "jogos", user_id: ids.user1},
        {id: ids.category3, name: "Mobile", slug: "mobile", user_id: ids.user2},
        {id: ids.category4, name: "E-sports", slug: "e-sports", user_id: ids.user2},
      ]);
    });
};
