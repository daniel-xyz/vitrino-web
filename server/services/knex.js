let config = require('../config.js');
let knexConfig = require('../db/knexfile.js');
let knex = require('knex')(knexConfig[config.env]);

module.exports = knex;