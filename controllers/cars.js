
const { validationResult } = require('express-validator');
const Car = require('../models/cars');
/**
 * Gets all cars from the database
 */
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
        res.status(500).json({ message: 'An error occurred' });
      });
};
/**
 * Gets one car by the existing id
 */
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
    res.status(500).json({message: 'An error occured'});
  });
}
// Create a new car  
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
    res.status(500).json({message: 'An error occured'});
  });
}
exports.updateCar = async (req,res,next) => {
const paramId = req.params.carId;
const incommingTypeOfCar = req.body.type_of_car;
const errors = validationResult(req);
const auto = new Car();
  try {
    if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array() 
    })}
    const isValidId = await auto.asyncFindCarById(paramId);
    if(isValidId === 0){
      return res.status(422).json({message: 'Validation failed, there is no data with that id'})
    }
    const isCarExists = await auto.asyncFindCarBytypeOfCar(incommingTypeOfCar);
    if(isCarExists === 0){
      const updateTypeOfCar = incommingTypeOfCar;
      const updateCar = new Car(updateTypeOfCar);
      await updateCar.asyncUpdateCarById(paramId);
      return res.status(200).json({ message: 'Car updated successfully' });
    } else {
      console.log(isCarExists);
      const updateCarId = isCarExists.idcars;
      const updateTypeOfCar = isCarExists.type_of_car;
      console.log(updateCarId + " " + updateTypeOfCar);
      if(updateCarId == paramId && updateTypeOfCar == incommingTypeOfCar){
        const updateCar = new Car(updateTypeOfCar);
        await updateCar.asyncUpdateCarById(paramId);
        return res.status(200).json({ message: 'Car updated successfully' });
      } else {
        return res.status(422).json({message: 'Validation failed, car is exists in database with different id'})
      }
    }
  } catch (error) {
    res.status(500).json({message: 'There is an error during update'});
  }
}
