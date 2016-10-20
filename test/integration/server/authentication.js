let config = require('../../../config/config.js');

// To use local databse during it-tests: config.env = 'test'
// To use external database during it-tests on Travis CI: config.env = 'travis' (set by Travis CI automatically)
if (config.env === 'development') {
  config.env = 'test'
}

let chai = require('chai');
let supertest = require('supertest');
let should = chai.should();
let cheerio = require('cheerio');

let server = require('../../../app.js');
let knex = require('../../../server/services/knex.js');

function getCsrfToken (res) {
  let $ = cheerio.load(res.text);

  return $('input[name=_csrf]').val();
}

describe('authentication.js', function () {

  let request;

  beforeEach(function(done) {
    request = supertest(server);

    knex.migrate.rollback()
      .then(function() {
        knex.migrate.latest()
          .then(function() {
            return knex.seed.run()
              .then(function() {
                done();
              });
          });
      });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
      .then(function() {
        done();
      });
  });

  // TODO - also check if the user is really logged in after signup (and note that the connect.sid cookie is not a reliable indicator)
  it('should signup a new user', (done) => {

    request.get('/signup') // Initial GET call to retrieve the csrf token
      .expect(200)
      .end(signup);

    function signup (err, res) {
      request.post('/signup')
        .set('cookie', res.headers['set-cookie'])
        .send({
          email: 'jemand@vitrino.de',
          password: '123456',
          _csrf: getCsrfToken(res)
        })
        .expect(302)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.type.should.eql('text/plain');
          done();
        });
    }
  });

  // TODO - also check if the user is really logged in after login (and note that the connect.sid cookie is not a reliable indicator)
  it('should signup and login a user', (done) => {

    request.get('/signup') // Initial GET call to retrieve the csrf token
      .expect(200)
      .end(signup);

    function signup (err, res) {
      request.post('/signup')
        .set('cookie', res.headers['set-cookie'])
        .send({
          email: 'testuser@vitrino.de',
          password: '123456',
          _csrf: getCsrfToken(res)
        })
        .expect(302)
        .end(logout);
    }

    function logout () {
      request.get('/logout')
        .end(login);
    }

    function login () {
      request.get('/login') // Initial GET call to retrieve the csrf token
        .expect(200)
        .end((err, res) => {
          request.post('/login')
            .set('cookie', res.headers['set-cookie'])
            .send({
              email: 'testuser@vitrino.de',
              password: '123456',
              _csrf: getCsrfToken(res)
            })
            .expect(302)
            .end((err, res) => {
              should.not.exist(err);
              res.redirects.length.should.eql(0);
              res.type.should.eql('text/plain');
              done();
            });
        });
    }
  });
});