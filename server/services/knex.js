const config = require('../config.js');
const knexConfig = require('../database/knexfile.js');
const knex = require('knex')(knexConfig[config.env]);

module.exports = knex;
