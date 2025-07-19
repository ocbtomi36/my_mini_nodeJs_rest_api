
const db = require('../database/database');

module.exports = class Car {
    constructor(type_of_car){
        this.type_of_car = type_of_car
    }
    async save(){
        return await db.execute('INSERT INTO my_mini_nodejs_app_db_github.cars (type_of_car) VALUES (?)',[this.type_of_car]);
    }
    static async asyncFetchAllCars(){
        const [row] = await db.query('SELECT type_of_car FROM my_mini_nodejs_app_db_github.cars');
        return row.length > 0 ? row : 0;
    }
    static async asyncFindCarById(carId){
        const [row] = await db.query(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where idcars = ?',[carId])
        return row.length > 0 ? row[0] : 0;
    }
    async asyncFindCarBytypeOfCar(car){
        const [row] = await db.query(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where type_of_car = ?',[car])
        return row.length > 0 ? row[0] : 0;
        
    }
    async asyncFindCarById(carId){
        const [row] = await db.query(' SELECT * FROM  my_mini_nodejs_app_db_github.cars where idcars = ?',[carId])
        return row.length > 0 ? row[0] : 0;
    }

    
    async asyncUpdateCarById(carId){
            return await db.execute('UPDATE cars SET type_of_car = ? where idcars = ?',[this.type_of_car,carId])
    }
};
