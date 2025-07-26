
const db = require('../database/database');

module.exports = class Car {
    constructor(type_of_car){
        this.type_of_car = type_of_car
    }
    async save(){
        return await db.execute('INSERT INTO cars (type_of_car) VALUES (?)',[this.type_of_car]);
    }
    static async FetchAllCars(){
        const [row] = await db.query('SELECT * FROM cars');
        return row.length > 0 ? row : null;
    }
    static async FindTypeOfCarById(carId){
        const [row] = await db.query(' SELECT * FROM cars where idcars = ?',[carId])
        return row.length > 0 ? row[0] : null;
    }
    async update(carId){
        return await db.execute('UPDATE cars SET type_of_car = ? where idcars = ?',[this.type_of_car,carId])
    }
    // Validation functions
    static async FindTypeOfCarByCar(car){
        const [row] = await db.query(' SELECT * FROM cars where type_of_car = ?',[car])
        return row.length > 0 ? row[0] : null;
    }
};

