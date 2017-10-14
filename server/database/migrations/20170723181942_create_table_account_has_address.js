
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('user_has_address', (table) => {
        table.integer('account_id')
            .references('id')
            .inTable('account')
            .notNullable();
        table.integer('address_id')
            .references('id')
            .inTable('address')
            .notNullable();
        table.primary(['account_id', 'address_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_has_address');
};
