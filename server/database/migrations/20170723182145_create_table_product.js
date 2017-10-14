
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('product', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('image_url').notNullable();
        table.boolean('verified').defaultTo(false).notNullable();
        table.integer('company_id')
            .references('id')
            .inTable('company')
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product');
};
