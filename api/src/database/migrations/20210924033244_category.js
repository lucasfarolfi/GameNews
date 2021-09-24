
exports.up = (knex) => {
    return knex.schema.createTable('category', table =>{
        table.increments('id')
        table.string('name').notNullable()
        table.string('slug').notNullable()
        table.integer('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE').index()
        table.timestamps(true, true)
    })
};
  
exports.down = (knex) => {
    return knex.schema.dropTable('category')
};
  