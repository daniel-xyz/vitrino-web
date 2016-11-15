let authHelper = require('../../server/helpers/auth.js');

let email_dummy_user = 'dummy.user@vitrino.de';
let email_dummy_vendor = 'dummy.vendor@vitrino.de';
let email_dummy_admin = 'dummy.admin@vitrino.de';
let password = 'Vitrino2017';

let knex;
let Promise;

function roles () {
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        knex('roles').insert({
          id: 1,
          name: 'user'
        }),
        knex('roles').insert({
          id: 2,
          name: 'vendor'
        }),
        knex('roles').insert({
          id: 3,
          name: 'admin'
        })
      ]);
    });
}

function productCategories () {
  return knex('product_categories').del()
    .then(function () {
      return Promise.all([
        knex('product_categories').insert({
          id: 1,
          name: 'Mode & Accessoires'
        }),
        knex('product_categories').insert({
          id: 2,
          name: 'Schmuck'
        }),
        knex('product_categories').insert({
          id: 3,
          name: 'Design & Geschenkartikel'
        }),
        knex('product_categories').insert({
          id: 4,
          name: 'Parfumerie & Kosmetik'
        }),
        knex('product_categories').insert({
          id: 5,
          name: 'Kunst'
        }),
        knex('product_categories').insert({
          id: 6,
          name: 'Hobby'
        }),
        knex('product_categories').insert({
          id: 7,
          name: 'Haus & Wohnen'
        }),
        knex('product_categories').insert({
          id: 8,
          name: 'Kinder'
        })
      ])
    })
}

function addresses () {
  return knex('addresses').del()
    .then(function () {
      return Promise.all([
        knex('addresses').insert({
          id: 1,
          street: 'Pfuelstraße 5',
          city: 'Berlin',
          zip_code: 10997
        })
      ])
    })
}

function users () {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: email_dummy_user,
          username: 'Dummy User',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_user),
          role_id: 1
        }),
        knex('users').insert({
          id: 2,
          email: email_dummy_vendor,
          username: 'Dummy Vendor',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_vendor),
          role_id: 2
        }),
        knex('users').insert({
          id: 3,
          email: email_dummy_admin,
          username: 'Dummy Admin',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_admin),
          role_id: 3
        })
      ]);
    });
}

function companies () {
  return knex('companies').del()
    .then(function () {
      return Promise.all([
        knex('companies').insert({
          id: 1,
          name: 'Schuhzauberei GmbH',
          company_verified: true,
          user_id: 2,
          address_id: 1
        }),
        knex('companies').insert({
          id: 2,
          name: 'Die Glaserei GmbH & Co. KG',
          company_verified: false,
          user_id: 3,
          address_id: 1
        }),
        knex('companies').insert({
          id: 3,
          name: 'We will hurt you AG',
          company_verified: false,
          user_id: 3,
          address_id: 1
        })
      ]);
    });
}

function products () {
  return knex('products').del()
    .then(function () {
      return Promise.all([
        knex('products').insert({
          id: 1,
          name: 'Winterschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          product_category_id: 1,
          company_id: 1
        }),
        knex('products').insert({
          id: 2,
          name: 'Goldene Sneaker',
          description: 'Bitte Gewicht beachten!',
          image_url: '',
          product_category_id: 1,
          company_id: 1
        }),
        knex('products').insert({
          id: 3,
          name: 'Eine wundersamer Schuhkarton',
          description: 'Was mag wohl drin sein?!',
          image_url: '',
          product_category_id: 1,
          company_id: 1
        }),
        knex('products').insert({
          id: 4,
          name: 'Grüne Tanzschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          product_category_id: 1,
          company_id: 1
        }),
        knex('products').insert({
          id: 5,
          name: 'Jack Wolfskin Sandalen',
          description: 'Für die nächste Weltreise.',
          image_url: '',
          product_category_id: 1,
          company_id: 1
        })
      ]);
    });
}

function stores () {
  return knex('stores').del()
    .then(function () {
      return Promise.all([
        knex('stores').insert({
          id: 1,
          name: 'Laden in Friedrichshain',
          company_id: 1,
          user_id: 2,
          address_id: 1
        })
      ])
    })
}

function store_has_product () {
  return knex('store_has_product').del()
    .then(function () {
      return Promise.all([
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 1,
          price: 14.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 1,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 1,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 1,
          price: 4.90
        })
      ])
    })
}

exports.seed = function(k, p) {
  knex = k;
  Promise = p;

  return roles()
    .then(productCategories)
    .then(addresses)
    .then(users)
    .then(companies)
    .then(products)
    .then(stores)
    .then(store_has_product);
};