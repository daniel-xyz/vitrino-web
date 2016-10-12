
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('username');
      table.string('password').notNullable();
      table.boolean('emailVerified').defaultTo(false).notNullable();
      table.string('authToken').unique().notNullable();
      table.integer('role')
        .references('id')
        .inTable('roles')
        .defaultTo(1);
      table.timestamps();
    }),

    knex.schema.createTableIfNotExists('roles', function(table){
      table.increments('id');
      table.string('name').unique().notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('roles')
  ])
};
