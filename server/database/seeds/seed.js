/* eslint-disable */

const authHelper = require('../../helpers/auth.js');

const emailDummyUser = 'dummy.user@vitrino.de';
const emailDummyVendor = 'dummy.vendor@vitrino.de';
const emailDummyAdmin = 'dummy.admin@vitrino.de';
const password = 'Vitrino2017';

let knex;
let Promise;

function role () {
  return knex('role').del()
    .then(() => {
      return Promise.all([
        knex('role').insert({
          name: 'user',
        }),
        knex('role').insert({
          name: 'vendor',
        }),
        knex('role').insert({
          name: 'admin',
        }),
      ]);
    });
}

function company_category () {
  return knex('company_category').del()
    .then(() => {
      return Promise.all([
        knex('company_category').insert({
          id: 1,
          key: 'clothes',
        }),
        knex('company_category').insert({
          id: 2,
          key: 'jewellery',
        }),
        knex('company_category').insert({
          id: 3,
          key: 'gifts',
        }),
        knex('company_category').insert({
          id: 4,
          key: 'cosmetics',
        }),
        knex('company_category').insert({
          id: 5,
          key: 'arts',
        }),
        knex('company_category').insert({
          id: 6,
          key: 'hobby',
        }),
        knex('company_category').insert({
          id: 7,
          key: 'home',
        }),
        knex('company_category').insert({
          id: 8,
          key: 'kids',
        }),
      ]);
    });
}

function address () {
  return knex('address').del()
    .then(() => {
      return Promise.all([
        knex('address').insert({
          street: 'Pfuelstraße 5',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.502717,
          lng: 13.440806,
        }),
        knex('address').insert({
          street: 'Schlesische Str 4',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500394,
          lng: 13.442619,
        }),
        knex('address').insert({
          street: 'Falckensteinstraße 46',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500511,
          lng: 13.444584,
        }),
        knex('address').insert({
          street: 'Wrangelstraße 49',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.49982,
          lng: 13.439235,
        }),
        knex('address').insert({
          street: 'Skalitzer Straße 74',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500931,
          lng: 13.440691,
        }),
        knex('address').insert({
          street: 'Oppelner 43',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.499757,
          lng: 13.44111,
        }),
        knex('address').insert({
          street: 'Köpenicker Straße 1A',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.501441,
          lng: 13.441697,
        }),
        knex('address').insert({
          street: 'Oppelner Straße 48',
          city: 'Berlin',
          zip_code: 10997,
          lat: 52.500318,
          lng: 13.441728,
        }),
      ]);
    });
}

function account () {
  return knex('account').del()
    .then(() => {
      return Promise.all([
        knex('account').insert({
          email: emailDummyUser,
          nickname: 'Dummy User',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(emailDummyUser),
          role: 'user',
        }),
        knex('account').insert({
          email: emailDummyVendor,
          nickname: 'Dummy Vendor',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(emailDummyVendor),
          role: 'vendor',
        }),
        knex('account').insert({
          email: emailDummyAdmin,
          nickname: 'Dummy Admin',
          password: authHelper.generateSecureHash(password),
          email_verified: true,
          auth_token: authHelper.generateToken(emailDummyAdmin),
          role: 'admin',
        }),
      ]);
    });
}

function company () {
  return knex('company').del()
    .then(() => {
      return Promise.all([
        knex('company').insert({
          name: 'Schuhzauberei GmbH',
          description: 'Für jeden Fuß den passenden Schuh. Es ist wie Zauberei! Lassen Sie sich von uns nach dem perfekten Schuh beraten.',
          verified: true,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          account_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          company_category_id: 1,
          address_id: 1,
        }),
        knex('company').insert({
          name: 'Die Glaserei GmbH & Co. KG',
          description: 'Egal ob rund, eckig oder oval, kommen Sie uns besuchen und wir werden sie begeistern.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          account_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyAdmin + "')"),
          company_category_id: 5,
          address_id: 1,
        }),
        knex('company').insert({
          name: 'Voo Store Berlin',
          description: 'Lässt Sie Lebensmittel in ihrer natürlichen Form ohne Verpackung kaufen.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          account_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyAdmin + "')"),
          company_category_id: 4,
          address_id: 1,
        }),
        knex('company').insert({
          name: 'Geschenke GmbH',
          description: 'Außergewöhnliche Geschenke für außergewöhnliche Menschen. Jetzt mit neuer Filiale in Berlin.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          account_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyAdmin + "')"),
          company_category_id: 3,
          address_id: 1,
        }),
        knex('company').insert({
          name: 'Kinderwelt',
          description: 'Bekleidung und Spielzeuge für Kinder. Jetzt sogar mit Indoor-Spielplatz.',
          verified: false,
          logo_url: 'v1480434532/logos/6-Momilk.jpg',
          account_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyAdmin + "')"),
          company_category_id: 8,
          address_id: 1,
        }),
      ]);
    });
}

function product () {
  return knex('product').del()
    .then(() => {
      return Promise.all([
        knex('product').insert({
          name: 'Winterschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: 'v1480335366/hanging-terrarium_uynhd0.jpg',
          verified: true,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
        knex('product').insert({
          name: 'Goldene Sneaker',
          description: 'Bitte Gewicht beachten!',
          image_url: 'v1480342102/54e08a69b868da678e8481fa730d0dda_qpi7fe.jpg',
          verified: true,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
        knex('product').insert({
          name: 'Eine wundersamer Schuhkarton',
          description: 'Was mag wohl drin sein?!',
          image_url: 'v1480335365/55d20aacd3728_e7uloa.jpg',
          verified: true,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
        knex('product').insert({
          name: 'Grüne Tanzschuhe',
          description: 'Ganz tolle Schuhe.',
          image_url: 'v1480335365/33b5efe7ddcd2ca3a43f51be4cc6fc6e_az1uhh.jpg',
          verified: false,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
        knex('product').insert({
          name: 'Jack Wolfskin Sandalen',
          description: 'Für die nächste Weltreise.',
          image_url: 'v1480347134/438a-nest_qulq95.jpg',
          verified: false,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
        knex('product').insert({
          name: 'Herrenschuhe',
          description: 'Aus besonders schönem Leder.',
          image_url: 'v1480409424/SHOE012_101_DEFAULT_ovkj1n.jpg',
          verified: false,
          company_id: knex.raw("(SELECT id FROM company WHERE name='Schuhzauberei GmbH')"),
        }),
      ]);
    });
}

function store () {
  return knex('store').del()
    .then(() => {
      return Promise.all([
        knex('store').insert({
          name: 'Der Saftladen',
          company_id: 1,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 1,
        }),
        knex('store').insert({
          name: 'Bruno\'s Glaskunst',
          company_id: 2,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 2,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 3,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 3,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 3,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 4,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 4,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 5,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 3,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 6,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 1,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 7,
        }),
        knex('store').insert({
          name: 'Skater Shop',
          company_id: 5,
          owner_id: knex.raw("(SELECT id FROM account WHERE email='" + emailDummyVendor + "')"),
          address_id: 8,
        }),
      ]);
    });
}

function store_has_product () {
  return knex('store_has_product').del()
    .then(() => {
      return Promise.all([
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 1,
          in_store_window: true,
          price: 14.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 1,
          in_store_window: true,
          price: 9.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 1,
          in_store_window: true,
          price: 9.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 1,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 1,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 1,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 2,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 3,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 4,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 5,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 6,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 7,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 1,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 2,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 3,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 4,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 5,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
        knex('store_has_product').insert({
          product_id: 6,
          store_id: 8,
          in_store_window: true,
          price: 4.90,
        }),
      ]);
    });
}

function store_has_image () {
    return knex('store_has_image').del()
        .then(() => {
            return Promise.all([
                knex('store_has_image').insert({
                    store_id: 1,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 1,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 1,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 2,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 2,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 2,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 3,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 3,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 3,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 4,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 4,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 4,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 5,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 5,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 5,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 6,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 6,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 6,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 7,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 7,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 7,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 8,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/6metItEr2JcbRVc7uSeALQ/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id: 8,
                    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/OxlgikmZFSrjd-PJrvJ7sg/o.jpg',
                }),
                knex('store_has_image').insert({
                    store_id:8,
                    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/dk8IVsqtrD_jhMPVibnN7A/o.jpg',
                }),
            ]);
        });
}

exports.seed = function(k, p) {
  knex = k;
  Promise = p;

  return role()
    .then(company_category)
    .then(address)
    .then(account)
    .then(company)
    .then(product)
    .then(store)
    .then(store_has_product)
    .then(store_has_image);
};
