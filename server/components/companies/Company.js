const knex = require('../../services/knex.js');

/** Company model **/
const Company = {

  /**
   * Find all companies in the database and return them
   * @return {Promise<Array, Error>} An array containing the company objects
   */
  findAllCompanies () {
    return knex('companies');
  },

  /**
   * Find a company based on the company's ID and set column 'verified' to true
   * @param {Number} id The company's ID
   * @return {Promise<Array, Error>} An array containing only the updated company object
   */
  verifyCompany (id) {
    return knex('companies')
      .where('id', id)
      .update('verified', true)
      .returning('*');
  },
};

module.exports = Company;
