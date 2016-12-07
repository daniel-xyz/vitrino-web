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
          street: 'Pfuelstraße 5',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.502717,
          lng: 13.440806
        }),
        knex('addresses').insert({
          street: 'Schlesische Str 4',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500394,
          lng: 13.442619
        }),
        knex('addresses').insert({
          street: 'Falckensteinstraße 46',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500511,
          lng: 13.444584
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
          role: 'user'
        }),
        knex('users').insert({
          email: email_dummy_vendor,
          username: 'Dummy Vendor',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_vendor),
          role: 'vendor'
        }),
        knex('users').insert({
          email: email_dummy_admin,
          username: 'Dummy Admin',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(email_dummy_admin),
          role: 'admin'
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
          description: 'Für jeden Fuß den passenden Schuh. Es ist wie Zauberei! Lassen Sie sich von uns nach dem perfekten Schuh beraten.',
          verified: true,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          product_category_id: 1,
          address_id: 1
        }),
        knex('companies').insert({
          name: 'Die Glaserei GmbH & Co. KG',
          description: 'Egal ob rund, eckig oder oval, kommen Sie uns besuchen und wir werden sie begeistern.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
          product_category_id: 2,
          address_id: 1
        }),
        knex('companies').insert({
          name: 'Voo Store Berlin',
          description: 'Lässt Sie Lebensmittel in ihrer natürlichen Form ohne Verpackung kaufen.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_admin + "')"),
          product_category_id: 3,
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
          image_url: 'v1480335366/hanging-terrarium_uynhd0.jpg',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Goldene Sneaker',
          description: 'Bitte Gewicht beachten!',
          image_url: 'v1480342102/54e08a69b868da678e8481fa730d0dda_qpi7fe.jpg',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Eine wundersamer Schuhkarton',
          description: 'Was mag wohl drin sein?!',
          image_url: 'v1480335365/55d20aacd3728_e7uloa.jpg',
          verified: true,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Grüne Tanzschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: 'v1480335365/33b5efe7ddcd2ca3a43f51be4cc6fc6e_az1uhh.jpg',
          verified: false,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Jack Wolfskin Sandalen',
          description: 'Für die nächste Weltreise.',
          image_url: 'v1480347134/438a-nest_qulq95.jpg',
          verified: false,
          product_category_id: 1,
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')")
        }),
        knex('products').insert({
          name: 'Herrenschuhe',
          description: 'Aus besonders schönem Leder.',
          image_url: 'v1480409424/SHOE012_101_DEFAULT_ovkj1n.jpg',
          verified: false,
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
          name: 'Der Saftladen',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Voo Store Berlin')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 1
        }),
        knex('stores').insert({
          name: 'Bruno\'s Glaskunst',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Die Glaserei GmbH & Co. KG')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 2
        }),
        knex('stores').insert({
          name: 'Skater Shop',
          company_id: knex.raw("(SELECT id FROM companies WHERE name='Schuhzauberei GmbH')"),
          user_id: knex.raw("(SELECT id FROM users WHERE email='" + email_dummy_vendor + "')"),
          address_id: 3
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
          in_store_window: true,
          price: 14.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 1,
          in_store_window: true,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 1,
          in_store_window: true,
          price: 9.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 1,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 1,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 1,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 2,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 3,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 3,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 3,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 3,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 3,
          in_store_window: true,
          price: 4.90
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 3,
          in_store_window: true,
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
