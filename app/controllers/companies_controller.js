const express = require('express');
const router = express.Router();
const company = require('../models/company');

router.post('/', function (req, res) {
    console.log('Companies Controller')

    let body = req.body;
    let company = new company(body);

    company.save().then(function (company) {
        res.send(company);
    }).catch(function (err) {
        res.send(err)
    })
})


router.get('/', function (req, res) {
    console.log('Companies');

    company.find().then(function (companies) {
        res.send(companies)
    }).catch(function (err) {
        res.send(err)
    })
})

module.exports = {
    companiesController: router
}