
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
    // átírom asyc awaitre, mert kell az adatbázisból, hogy milyen autót tartalmaz.
    async asyncFindCarBytypeOfCar(car){
        try{
        const [row] = await db.query(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where type_of_car = ?',[car])
        return row.length > 0 ? row[0] : 0;
        } catch (err) {
            throw new Error('Error in database query');
        }
    }
    async asyncFindCarById(carId){
        try{
        const [row] = await db.query(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where idcars = ?',[carId])
        return row.length > 0 ? row[0] : 0;
        
        } catch (err) {
            throw new Error('Error in database query')
        }
    }

    
    updateCarById(carId){
        return db.execute('UPDATE users SET type_of_car = ? where idcars = ?',[this.type_of_car,carId])
    }
};
