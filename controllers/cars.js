
const Car = require('../models/cars');

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
    res.status(200).json(req.car);
}
/**
 * Create a new car 
 */  
exports.createCar = async(req,res,next) => {
  const incommingTypeOfCar = req.body.type_of_car;
  const car = new Car();
  try {
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
  const incommingTypeOfCar = req.body.type_of_car;
  //console.log(incommingTypeOfCar);
  try {
      const queryTypeOfCar = await Car.FindTypeOfCarByCar(incommingTypeOfCar);
      if(queryTypeOfCar === null){
        const updateCar = new Car(incommingTypeOfCar);
        await updateCar.update(req.car.idcars);
        res.status(200).json({ message: 'Update successfull'})
        return;
      } 
      const dbTypeOfCar = queryTypeOfCar.type_of_car; 
      const dbTypeOfCarId = queryTypeOfCar.idcars;
      if ( req.car.idcars != dbTypeOfCarId && dbTypeOfCar == incommingTypeOfCar ) {
        res.status(422).json({ message: ' Type of Car is already exists with different id'});
        return;
      } else {
        const updateTypeofCar = incommingTypeOfCar;
        const carUpdate = new Car(updateTypeofCar);
        await carUpdate.update(req.car.idcars);
        res.status(200).json({ message: 'Update successfull'})
        return;
      }
  } catch (error) {
    res.status(500).json({message: 'There is an error during update'});
    return;
  }
}
/*
* Delete one car if id exists
*/
exports.deleteCarById = async (req,res,next) => {
    try {
      const [result] = await Car.DeleteCarById(req.car.idcars);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Delete failed - Car not found anymore' });
      }

      res.status(200).json({ message: 'Car delete successful' });
    } catch (error) {
      res.status(500).json({message: 'There is an error during delete'});
    }
    
}

