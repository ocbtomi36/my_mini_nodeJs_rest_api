
const express = require('express');

const { body } = require('express-validator');

const carController = require('../controllers/cars');

const router = express.Router();

router.get('/cars',carController.getCars);

router.get('/:carId',carController.getCar);

router.post('/car',carController.createCar);

module.exports = router
