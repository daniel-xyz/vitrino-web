
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('company', (table) => {
        table.increments('id');
        table.string('name').unique().notNullable();
        table.string('description');
        table.string('logo_url');
        table.boolean('verified').defaultTo(false).notNullable();
        table.integer('account_id')
            .references('id')
            .inTable('account')
            .notNullable();
        table.integer('company_category_id')
            .references('id')
            .inTable('company_category')
            .notNullable();
        table.integer('address_id')
            .references('id')
            .inTable('address');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company');
};
