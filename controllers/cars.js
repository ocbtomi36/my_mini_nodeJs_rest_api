
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
// a routerbe a middleware-ben
exports.createCar = (req,res,next) => {
  const carName = req.body.type_of_car;
  const errors = validationResult(req);
  Car.findCarBytypeOfCar(carName)
  .then(([car]) => {
    if(car.length !== 0) {
      res.status(422).json({ message: 'Car field must be unique' });
      return;
    } else if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array()
        })
    } else {
      const type_of_car = req.body.type_of_car;
      const savedcar = new Car(type_of_car);
      savedcar.save().then(() => res.status(201).json({ message: 'Car is created'}));
      
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'An error occured'});
  });
}
exports.updateCar = (req,res,next) => {

}

