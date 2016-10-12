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
    return knex('users').where('id', id).first();
  },

  /**
   * Find a user based on his E-Mail
   * @param {String} email The user's E-Mail
   * @return {Promise<User, Error>} The user object
   */
  findByEmail: function (email) {
    return knex('users').where('email', email).first()
  },

  /**
   * Find a user based on attributes with an AND condition
   * @param {Object} object Object which contains attribute/key pairs which you want to find a user for
   * @return {Promise<User, Error>} The user object
   */
  findOne: function (object) {
    return knex('users').where(object).first()
  },

  /**
   * Create a new user based on his E-Mail with a hashed password and authToken
   * @param {String} email The user's E-Mail
   * @param {String} password The raw (unhashed) password
   * @return {Promise<User, Error>} An array containing only the new created user object
   */
  create: function (email, password) {
    return knex('users')
      .insert({
        email: email,
        password: authHelper.generateSecureHash(password),
        authToken: authHelper.generateToken(email)
      })
      .returning('*')
  },

  /**
   * Search for a row containing the same authToken and set the emailVerified attribute of the corresponding user to true
   * @param {String} authToken The authToken that should be searched for
   * @return {Promise<User, Error>} An array containing only the updated user object
   */
  verifyEmail: function (authToken) {
    return knex('users')
      .where('authToken', authToken)
      .update('emailVerified', true)
      .returning('*')
  }
};

module.exports = User;