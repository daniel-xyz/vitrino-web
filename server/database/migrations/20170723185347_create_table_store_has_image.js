
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('store_has_image', (table) => {
        table.increments('id');
        table.string('image_url').notNullable();
        table.integer('store_id')
            .references('id')
            .inTable('store')
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('store_has_image');
};
