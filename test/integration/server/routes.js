let supertest = require('supertest');
let cheerio = require('cheerio');

let server = require('../../../app.js');

function getPageTitle (res) {
  let htmlResponse = res.text;
  let $ = cheerio.load(htmlResponse);

  return $('h1').html().trim();
}

describe('router.js', function () {

  let request;

  beforeEach(function () {
    request = supertest(server);
  });

  it('returns the login page', function (done) {
    request.get('/login')
      .expect(function (res) {

        if (getPageTitle(res) !== "Einloggen") {
          throw new Error("Page title doesn't match");
        }
      })
      .end(done);
  });

  it('returns the signup page', function (done) {
    request.get('/signup')
      .expect(function (res) {

        if (getPageTitle(res) !== "Registrieren") {
          throw new Error("Page title doesn't match");
        }
      })
      .end(done);
  });

  it('returns the password forgotten page', function (done) {
    request.get('/forgot')
      .expect(function (res) {

        if (getPageTitle(res) !== "Passwort vergessen") {
          throw new Error("Page title doesn't match");
        }
      })
      .end(done);
  });
});