const express = require('express');
const Company = require('./Company.js');

const api = express.Router();

const endpoint = '/api/companies';

api.get(endpoint, (req, res) => Company.findAllCompanies()
    .then(companies => res.json(companies))
    .catch(err => res.status(500).json(err)));

api.post(endpoint + '/:id/verify', (req, res) => Company.verifyCompany(req.params.id)
    .then(companies => res.json(companies[0]))
    .catch(err => res.status(500).json(err)));

module.exports = api;
