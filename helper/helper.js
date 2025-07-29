const { validationResult } = require('express-validator');

const Car = require('../models/cars');
const User = require('../models/user');

const validateUserInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()
        });
    }
    next();
};
const isCarExistsById = async(req, res, next) => {
    const carId = req.params.carId;
    try {
        const car = await Car.FindTypeOfCarById(carId);
        if(car === null){
        
            res.status(404).json({ message: ' There is no data with that id'})
            return;
        } 
        req.car = car;
        next();
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
        return;
    }
}
const isUserExistsById = (req, res, next) => {
    
}
module.exports = {
    validateUserInput,
    isCarExistsById,
    isUserExistsById
};