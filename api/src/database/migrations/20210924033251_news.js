
exports.up = (knex) => {
    return knex.schema.createTable('news', table =>{
        table.increments('id')
        table.string('title').notNullable()
        table.string('slug').notNullable()
        table.text('body').notNullable()
        table.integer('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE').index()
        table.integer('category_id').notNullable().unsigned().references('id').inTable('category').onDelete('CASCADE').index()
        table.timestamps(true, true)
    })
};
  
exports.down = (knex) => {
    return knex.schema.dropTable('news')
};
  