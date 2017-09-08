
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('store_has_employee', (table) => {
        table.integer('store_id')
            .references('id')
            .inTable('store')
            .notNullable();
        table.integer('account_id')
            .references('id')
            .inTable('account')
            .notNullable();
        table.primary(['store_id', 'account_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('store_has_employee');
};
