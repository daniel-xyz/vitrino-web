let knex = require('../../services/knex.js');
let authHelper = require('../../helpers/auth.js');

/** User model **/
let User = {

  /**
   * Find a user based on his ID
   * @param {Number} id The user's ID
   * @return {Promise<User, Error>} The user object
   */
  findById: function (id) {
    return knex('users').where({id}).first();
  },

  /**
   * Find a user based on his E-Mail
   * @param {String} email The user's E-Mail
   * @return {Promise<User, Error>} The user object
   */
  findByEmail: function (email) {
    return knex('users').where({ email }).first()
  },

  /**
   * Create a new user based on his E-Mail
   * @param {String} email The user's E-Mail
   * @param {String} password The unhashed password
   * @return {Promise<User, Error>} The new created user object
   */
  create: function (email, password) {
      return knex('users').insert({
          email: email,
          password: authHelper.getHashedPassword(password)
        })
        .returning('*');
    }
};

module.exports = User;