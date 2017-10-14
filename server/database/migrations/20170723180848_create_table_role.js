
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('role', (table) => {
        table.string('name').primary();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('role');
};
