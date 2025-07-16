
const express = require('express');

const { body } = require('express-validator');

const carController = require('../controllers/cars');

const router = express.Router();

router.get('/cars',carController.getCars);

router.get('/:carId',carController.getCar);

router.post('/car',[body('type_of_car').trim().isLength({min:1,max:45}).withMessage('length of type of car is incorrect')],carController.createCar);

module.exports = router
