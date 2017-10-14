
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('address', (table) => {
        table.increments('id');
        table.string('street');
        table.string('city');
        table.integer('zip_code');
        table.double('lat');
        table.double('lng');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('address');
};
