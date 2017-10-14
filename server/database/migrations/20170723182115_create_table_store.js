
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('store', (table) => {
        table.increments('id');
        table.string('name');
        table.integer('company_id')
            .references('id')
            .inTable('company')
            .notNullable();
        table.integer('owner_id')
            .references('id')
            .inTable('account')
            .notNullable();
        table.integer('address_id')
            .references('id')
            .inTable('address')
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('store');
};
