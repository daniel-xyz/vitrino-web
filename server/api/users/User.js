const knex = require('../../services/knex.js');
const authHelper = require('../../helpers/auth.js');

/* User model */
const User = {

  /**
   * Find all users in the database and return them
   * @return {Promise<Array, Error>} An array containing the user objects
   */
  findAllUsers () {
    return knex('users');
  },

  /**
   * Find a user based on his ID
   * @param {Number} id The user's ID
   * @return {Promise<Object, Error>} The user object
   */
  findById (id) {
    return knex('users').where('id', id).first();
  },

  /**
   * Find a user based on his E-Mail
   * @param {String} email The user's E-Mail
   * @return {Promise<Object, Error>} The user object
   */
  findByEmail (email) {
    return knex('users').where('email', email).first();
  },

  /**
   * Create a new user based on his E-Mail with a hashed password and authToken
   * @param {String} email The user's E-Mail
   * @param {String} password The raw (unhashed) password
   * @return {Promise<Array, Error>} An array containing only the new created user object
   */
  create (email, password) {
    return knex('users')
      .insert({
        email,
        password: authHelper.generateSecureHash(password),
        auth_token: authHelper.generateToken(email),
      })
      .returning('*');
  },

  /**
   * Find a user based on his ID and update his password with a new generated hash
   * @param {Number} id The user's ID
   * @param {String} password The raw (unhashed) password
   * @return {Promise<Array, Error>} An array containing only the updated user object
   */
  updatePassword (id, password) {
    return knex('users')
      .where('id', id)
      .update('password', authHelper.generateSecureHash(password))
      .returning('*');
  },

  /**
   * Find a user based on his ID and set a token and timestamp for the password reset function
   * @param id The user's ID
   * @param token Necessary to identify the request later on
   * @return {Promise<Array, Error>} An array containing only the updated user object
     */
  setResetPasswordExpiration (id, token) {
    return knex('users')
      .where('id', id)
      .update({
        pw_reset_token: token,
        pw_reset_requested_at: knex.raw('CURRENT_TIMESTAMP'),
      })
      .returning('*');
  },

  /**
   * Find a user based on the pw_reset_token. Returns nothing if token can't be found or if it's expired.
   * @param token The token which the password reset has been requested with initially
   * @return {Promise<Object, Error>} The user object
     */
  findUserWithValidResetToken (token) {
    return knex('users')
      .whereRaw("pw_reset_token = ? AND pw_reset_requested_at > CURRENT_TIMESTAMP - INTERVAL '1 hour'", token)
      .first();
  },

  /**
   * Search for a row containing the same authToken and set the emailVerified attribute of the corresponding user to true
   * @param {String} authToken The authToken that should be searched for
   * @return {Promise<Array, Error>} An array containing only the updated user object
   */
  verifyEmail (authToken) {
    return knex('users')
      .where('auth_token', authToken)
      .update('email_verified', true)
      .returning('*');
  },
};

module.exports = User;
