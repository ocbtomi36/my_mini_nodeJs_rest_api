
const { validationResult } = require('express-validator');
const Car = require('../models/cars');

function paramValidator(error) {
  
}
/**
 * Gets all cars from the database, ready
 */
exports.getCars = async (req, res, next) => {
    try {
      const queryResult = await Car.FetchAllCars();
      if(queryResult === null){
      
        res.status(204).json({ message: 'There is no data in database'})
        return;
    } else {
        res.status(200).json({ message: ' Query success', data: queryResult})
        return;
    }
    } catch (error) {
      res.status(500).json({ message: 'An error occured'})
      return;
    }
};
/**
 * Gets one car by the existing id, ready
 */
exports.getCar = async (req,res,next) => {
  const carId = req.params.carId;
  try {
    const queryResult = await Car.FindTypeOfCarById(carId);
    if(queryResult === null){
      
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
  const incommingTypeOfCar = req.body.type_of_car;
  const car = new Car();
  try {
    if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array() 
    })}
    const insertTypeOfCar = await Car.FindTypeOfCarByCar(incommingTypeOfCar);
    if(insertTypeOfCar !== null){
      res.status(422).json({ message: 'This data is already exist'})
      return;
    } else {
      const insertCar = new Car(incommingTypeOfCar);
      await insertCar.save();
      return res.status(200).json({message: 'Inserting succesful'});
    }
  } catch (error) {
    res.status(500).json({message: 'There is an error during insert'});
    return;
  }
}
// update a car by id
exports.updateCar = async (req,res,next) => {
  const errors = validationResult(req);
  const incommingTypeOfCar = req.body.type_of_car;
  const incommingId = req.params.carId;
  const car = new Car();
  try {
    if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array() 
    })}
    const queryResult = await Car.FindTypeOfCarById(incommingId);
    if(queryResult === null){
      
      res.status(422).json({ message: ' There is no data with that id'})
      return;
    } else { 
      const queryTypeOfCar = await Car.FindTypeOfCarByCar(incommingTypeOfCar);
      
      if(queryTypeOfCar === null){
        const updateCar = new Car(incommingTypeOfCar);
        await updateCar.update(incommingId);
        res.status(200).json({ message: 'Update successfull'})
        return;
      } 
      const dbTypeOfCar = queryTypeOfCar.type_of_car; // adatbázis adat
      const dbTypeOfCarId = queryTypeOfCar.idcars;
      if ( incommingId != dbTypeOfCarId && dbTypeOfCar == incommingTypeOfCar ) {
        res.status(422).json({ message: ' Type of Car is already exists with different id'});
        return;
      } else {
        const updateTypeofCar = incommingTypeOfCar;
        const carUpdate = new Car(updateTypeofCar);
        await carUpdate.update(incommingId);
        res.status(200).json({ message: 'Update successfull'})
        return;
      }
    }
  } catch (error) {
    res.status(500).json({message: 'There is an error during insert'});
    return;
  }
}
