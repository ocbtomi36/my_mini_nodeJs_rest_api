
const express = require('express');

const { body } = require('express-validator');

const { validateUserInput, isCarExistsById  } = require('../helper/helper')

const carController = require('../controllers/cars');

const router = express.Router();

const isAuth = require('../middleware/is-auth');


router.get('/cars',isAuth,carController.getCars);

router.get('/:carId',isAuth,isCarExistsById,carController.getCar);

router.post('/car',isAuth,[body('type_of_car').trim().isLength({min:1,max:45}).withMessage('length of type of car is incorrect')],validateUserInput,carController.createCar);

router.put('/:carId',isAuth,[body('type_of_car').trim().isLength({min:1,max:45}).withMessage('length of type of car is incorrect')],validateUserInput,isCarExistsById,carController.updateCar);

router.delete('/:carId',isAuth,isCarExistsById,carController.deleteCarById);

module.exports = router
