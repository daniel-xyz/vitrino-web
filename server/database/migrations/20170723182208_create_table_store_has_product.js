
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('store_has_product', (table) => {
        table.integer('product_id')
            .references('id')
            .inTable('product')
            .notNullable();
        table.integer('store_id')
            .references('id')
            .inTable('store')
            .notNullable();
        table.boolean('in_store_window').notNullable();
        table.decimal('price', 14, 2);
        table.primary(['product_id', 'store_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('store_has_product');
};
