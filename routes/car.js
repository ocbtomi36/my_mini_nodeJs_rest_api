
const express = require('express');

const { body } = require('express-validator');

const carController = require('../controllers/cars');

const router = express.Router();

router.get('/cars',carController.getCars);

module.exports = router
