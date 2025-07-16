
const { validationResult } = require('express-validator');
const Car = require('../models/cars');

exports.getCars = (req, res, next) => {
    Car.fetchAllCars()
    .then(([rows, field]) => {
        if (!rows || rows.length === 0) {
          return res.status(404).json({ message: 'Database is empty' });
        }
        res.status(200).json({
            message: 'Data loaded successfully',
            rows:rows
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
      });
};

exports.getCar = (req,res,next) => {
  const carId = req.params.carId;
  console.log(carId)
  Car.findCarById(carId)
  .then(([car]) => {
    if(!car || car.length === 0) {
      return res.status(404).json({message: 'There is no car with that id'})
    }
    res.status(200).json(car);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'An error occured'});
  });
}

