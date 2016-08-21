let supertest = require('supertest');
let cheerio = require('cheerio');

let app = require('../../app');

describe('router.js', function() {
  "use strict";

  let request;

  beforeEach(function() {
    request = supertest(app);
  });

  it('returns the login page', function(done) {
    request
      .get('/login')
      .expect(function(res) {
        let htmlResponse = res.text;
        let $ = cheerio.load(htmlResponse);
        let pageTitle = $('h1').html().trim();

        if (pageTitle !== "Einloggen") {
          throw new Error("Page title doesn't match");
        }
      })
      .end(done);
  });

  it('returns the signup page', function(done) {
    request
      .get('/signup')
      .expect(function(res) {
        let htmlResponse = res.text;
        let $ = cheerio.load(htmlResponse);
        let pageTitle = $('h1').html().trim();

        if (pageTitle !== "Registrieren") {
          throw new Error("Page title doesn't match");
        }
      })
      .end(done);
  });
});
