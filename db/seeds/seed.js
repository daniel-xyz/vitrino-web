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
          name: 'user'
        }),
        knex('roles').insert({
          name: 'vendor'
        }),
        knex('roles').insert({
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
          name: 'Mode & Accessoires'
        }),
        knex('product_categories').insert({
          name: 'Schmuck'
        }),
        knex('product_categories').insert({
          name: 'Design & Geschenkartikel'
        }),
        knex('product_categories').insert({
          name: 'Parfumerie & Kosmetik'
        }),
        knex('product_categories').insert({
          name: 'Kunst'
        }),
        knex('product_categories').insert({
          name: 'Hobby'
        }),
        knex('product_categories').insert({
          name: 'Haus & Wohnen'
        }),
        knex('product_categories').insert({
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
          email: email_dummy_user,
          username: 'Dummy User',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_user),
          role_id: knex.raw("(SELECT id FROM roles WHERE name='user')")
        }),
        knex('users').insert({
          email: email_dummy_vendor,
          username: 'Dummy Vendor',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_vendor),
          role_id: knex.raw("(SELECT id FROM roles WHERE name='vendor')")
        }),
        knex('users').insert({
          email: email_dummy_admin,
          username: 'Dummy Admin',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_admin),
          role_id: knex.raw("(SELECT id FROM roles WHERE name='admin')")
        })
      ]);
    });
}

function companies () {
  return knex('companies').del()
    .then(function () {
      return Promise.all([
        knex('companies').insert({
          name: 'Schuhzauberei GmbH',
          company_verified: true,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 1
        }),
        knex('companies').insert({
          name: 'Die Glaserei GmbH & Co. KG',
          company_verified: false,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
          address_id: 1
        }),
        knex('companies').insert({
          name: 'We will hurt you AG',
          company_verified: false,
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
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
          name: 'Winterschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Goldene Sneaker',
          description: 'Bitte Gewicht beachten!',
          image_url: '',
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Eine wundersamer Schuhkarton',
          description: 'Was mag wohl drin sein?!',
          image_url: '',
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Grüne Tanzschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: '',
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Jack Wolfskin Sandalen',
          description: 'Für die nächste Weltreise.',
          image_url: '',
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        })
      ]);
    });
}

function stores () {
  return knex('stores').del()
    .then(function () {
      return Promise.all([
        knex('stores').insert({
          name: 'Laden in Friedrichshain',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
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
