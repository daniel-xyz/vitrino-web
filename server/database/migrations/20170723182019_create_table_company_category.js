
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('company_category', (table) => {
        table.integer('id').primary();
        table.string('key').unique().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company_category');
};
