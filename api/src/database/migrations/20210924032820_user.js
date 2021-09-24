
exports.up = (knex) => {
  return knex.schema.createTable('user', table =>{
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.integer('role').notNullable()
      table.timestamps(true, true)
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('user')
};
