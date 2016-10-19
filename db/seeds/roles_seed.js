
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('roles').insert({id: 1, name: 'user'}),
        knex('roles').insert({id: 2, name: 'vendor'}),
        knex('roles').insert({id: 3, name: 'admin'})
      ]);
    });
};
