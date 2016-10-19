
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('username');
      table.string('password').notNullable();
      table.boolean('email_verified').defaultTo(false).notNullable();
      table.string('auth_token').unique().notNullable();
      table.string('pw_reset_token').unique();
      table.timestamp('pw_reset_requested_at');
      table.integer('role')
        .references('id')
        .inTable('roles')
        .defaultTo(1);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
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
