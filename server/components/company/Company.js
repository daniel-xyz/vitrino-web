let knex = require('../../services/knex.js');

/** Company model **/
let Company = {

  /**
   *
   * @returns {*}
   */
  findAllCompanies: function () {
    return knex('companies');
  },

  /**
   * Find a company based on the company's ID and set company_verified true
   * @param {Number} id The company's ID
   * @return {Promise<Company, Error>} An array containing only the updated company object
   */
  verifyCompany: function (id) {
    return knex('companies')
      .where('id', id)
      .update('verified', true)
      .returning('*')
  }
};

module.exports = Company;