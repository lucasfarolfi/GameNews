
exports.up = (knex) => {
    return knex.schema.createTable('news', table =>{
        table.uuid('id').primary().notNullable()
        table.string('title').notNullable()
        table.string('slug').notNullable()
        table.boolean('is_active').notNullable()
        table.text('body').notNullable()
        table.uuid('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE').index()
        table.uuid('category_id').notNullable().unsigned().references('id').inTable('category').onDelete('CASCADE').index()
        table.timestamps(true, true)
    })
};
  
exports.down = (knex) => {
    return knex.schema.dropTable('news')
};
  