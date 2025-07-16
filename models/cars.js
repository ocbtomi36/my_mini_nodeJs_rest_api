
const db = require('../database/database');

module.exports = class Car {
    constructor(type_of_car){
        this.type_of_car = type_of_car
    }
    save(){
        return db.execute('INSERT INTO my_mini_nodejs_app_db_github.cars (type_of_car) VALUES (?)',[this.type_of_car]);
    }
    static fetchAllCars(){
        return db.execute('SELECT type_of_car FROM my_mini_nodejs_app_db_github.cars');
    }
    static findCarById(carId){
        return db.execute(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where idcars = ?',[carId])
    }
    static findCarBytypeOfCar(car){
        return db.execute(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where type_of_car = ?',[car])
    }
};
