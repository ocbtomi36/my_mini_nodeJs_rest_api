
const { validationResult } = require('express-validator');
const Car = require('../models/cars');
/**
 * Gets all cars from the database
 */
exports.getCars = async (req, res, next) => {
    try {
      const queryResult = await Car.asyncFetchAllCars();
      if(queryResult === 0){
      
        res.status(404).json({ message: 'There is no data in database'})
        return;
    } else {
      
        res.status(200).json({ message: ' Query success', data: queryResult})
        return;
    }
    } catch (error) {
      
    }
};
/**
 * Gets one car by the existing id
 */
exports.getCar = async (req,res,next) => {
  const carId = req.params.carId;
  try {
    const queryResult = await Car.asyncFindCarById(carId);
    if(queryResult === 0){
      
      res.status(422).json({ message: ' There is no data with that id'})
      return;
    } else {
      
      const type_of_car = queryResult.type_of_car;
      res.status(200).json({ message: ' Query success', data: {type_of_car}})
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occured'})
    return;
  }
}
/**
 * Create a new car 
 */  
exports.createCar = async(req,res,next) => {
  
  const errors = validationResult(req);
  const car = new Car();
  try {
    
    if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array() 
    })}
    
    const incommingTypeOfCar = req.body.type_of_car;
    const isCarExists = await car.asyncFindCarBytypeOfCar(incommingTypeOfCar);
    if(isCarExists === 0){
      
      const insertCar = new Car(incommingTypeOfCar);
      await insertCar.save();
      return res.status(200).json({message: 'Inserting succesful'});
    } else {
      return res.status(422).json({message: 'Inserting failed. Data is already exists in db'});
    }
  } catch (error) {
    res.status(500).json({message: 'There is an error during insert'});
    return;
  }
}
/**
 * Update a car 
 */
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
    return;
  }
}
