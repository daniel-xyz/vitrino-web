
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id');
      table.string('email').unique().notNullable();
      table.string('username');
      table.string('password').notNullable();
      table.boolean('email_verified').defaultTo(false).notNullable();
      table.string('auth_token').unique().notNullable();
      table.string('pw_reset_token').unique();
      table.timestamp('pw_reset_requested_at');
      table.string('role')
        .references('name')
        .inTable('roles')
        .notNullable()
        .defaultTo('user');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('roles', function (table) {
      table.string('name').primary();
    }),

    knex.schema.createTableIfNotExists('addresses', function (table) {
      table.increments('id');
      table.string('street');
      table.string('city');
      table.integer('zip_code');
      table.double('lat');
      table.double('lng');
    }),

    knex.schema.createTableIfNotExists('user_has_address', function (table) {
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();
      table.integer('address_id')
        .references('id')
        .inTable('addresses')
        .notNullable();
      table.primary(['user_id', 'address_id'])
    }),

    knex.schema.createTableIfNotExists('companies', function (table) {
      table.increments('id');
      table.string('name').unique().notNullable();
      table.boolean('verified').defaultTo(false).notNullable();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();
      table.integer('product_category_id')
        .references('id')
        .inTable('product_categories')
        .notNullable();
      table.integer('address_id')
        .references('id')
        .inTable('addresses');
    }),

    knex.schema.createTableIfNotExists('stores', function (table) {
      table.increments('id');
      table.string('name');
      table.integer('company_id')
        .references('id')
        .inTable('companies')
        .notNullable();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();
      table.integer('address_id')
        .references('id')
        .inTable('addresses')
        .notNullable();
    }),

    knex.schema.createTableIfNotExists('product_categories', function (table) {
      table.integer('id').primary();
      table.string('name').unique().notNullable();
    }),

    knex.schema.createTableIfNotExists('products', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('image_url').notNullable();
      table.boolean('verified').defaultTo(false).notNullable();
      table.integer('product_category_id')
        .references('id')
        .inTable('product_categories')
        .notNullable();
      table.integer('company_id')
        .references('id')
        .inTable('companies')
        .notNullable();
    }),

    knex.schema.createTableIfNotExists('store_has_product', function (table) {
      table.integer('product_id')
        .references('id')
        .inTable('products')
        .notNullable();
      table.integer('store_id')
        .references('id')
        .inTable('stores')
        .notNullable();
      table.decimal('price', 14, 2);
      table.primary(['product_id', 'store_id'])
    }),

    knex.schema.createTableIfNotExists('store_has_employee', function (table) {
      table.integer('store_id')
        .references('id')
        .inTable('stores')
        .notNullable();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();
      table.primary(['store_id', 'user_id'])
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('store_has_employee'),
    knex.schema.dropTableIfExists('store_has_product'),
    knex.schema.dropTableIfExists('products'),
    knex.schema.dropTableIfExists('stores'),
    knex.schema.dropTableIfExists('companies'),
    knex.schema.dropTableIfExists('product_categories'),
    knex.schema.dropTableIfExists('user_has_address'),
    knex.schema.dropTableIfExists('addresses'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('roles')
  ])
};
