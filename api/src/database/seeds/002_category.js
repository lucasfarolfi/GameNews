
exports.seed = (knex) => {
  
  return knex('category').del()
    .then(() =>{
      // Inserts seed entries
      return knex('category').insert([
        {name: "Consoles", slug: "consoles", user_id: 1},
        {name: "Jogos", slug: "jogos", user_id: 1},
        {name: "Mobile", slug: "mobile", user_id: 2},
        {name: "E-sports", slug: "e-sports", user_id: 2},
      ]);
    });
};
