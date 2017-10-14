
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('account', (table) => {
        table.increments('id');
        table.string('email').unique().notNullable();
        table.string('nickname');
        table.string('password').notNullable();
        table.boolean('email_verified').defaultTo(false).notNullable();
        table.string('auth_token').unique().notNullable();
        table.string('pw_reset_token').unique();
        table.timestamp('pw_reset_requested_at');
        table.string('role')
            .references('name')
            .inTable('role')
            .notNullable()
            .defaultTo('user');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('account');
};
