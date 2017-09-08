
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('company_category', (table) => {
        table.integer('id').primary();
        table.string('name').unique().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company_category');
};
