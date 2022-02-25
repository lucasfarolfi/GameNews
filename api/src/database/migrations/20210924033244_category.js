
exports.up = (knex) => {
    return knex.schema.createTable('category', table =>{
        table.uuid('id').primary().notNullable()
        table.string('name').notNullable()
        table.string('slug').notNullable()
        table.uuid('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE').index()
        table.timestamps(true, true)
    })
};
  
exports.down = (knex) => {
    return knex.schema.dropTable('category')
};
  