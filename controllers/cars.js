
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
/**
 * update one car by the id
 */
/** 
 * Hogyan updatelünk ? 
 * 1. Leellenörizzük, hogy a bejövő adatban van e hiba. Ha igen hiba akkor hibával térek vissza.
 * 2. Leellenőrizzük, hogy a bejövő auto, ami egyedi létezik e az adatbázisban, ha igen akkor mi az azonosítója.
 * Ha megegyezzik ami bejön pl 1 és 1 akkor nincs gond lehet updatelni.
 * Ha nem hiba.
 * Ha még nem szerepel az adatbázisban és jó a formátum k
*/
exports.updateCar = async (req,res,next) => {
const paramId = req.params.carId;
const incommingCarType = req.body.type_of_car;
const errors = validationResult(req);
const auto = new Car();
  try {
    if(!errors.isEmpty()){
      return res.status(422).json({message: 'Validation failed.',
            errors: errors.array() // a bejövő adatok validálása, nem üres és megfelel az adatbázisnak.
    })}
    const isValidId = await auto.asyncFindCarById(paramId);
    console.log(isValidId)
    if(isValidId === 0){
      return res.status(422).json({message: 'Validation failed, there is no data with that id'})
    }
    const carDatasFromDb = await auto.asyncFindCarBytypeOfCar(incommingCarType);
    const dataIdCars = carDatasFromDb.idcars.toString(); // adatbázisból
    const dataTypeOfCar = carDatasFromDb.type_of_car; // adatbázisból
    if(dataIdCars !== paramId && incommingCarType == dataTypeOfCar){
      // itt azt kaptuk vissza, hogy az auto létezik az adatbázisban, de nem azzal az id-val amit beküldtek. Ez elutasítás
      //Unique megszoriítás
      res.status(422).json({ message: 'This type of car is already exists in db with different id' });
      return;
    }
  } catch (error) {
    res.status(500).json({message: 'An error occured'});
  } 
}
