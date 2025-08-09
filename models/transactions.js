const db = require('../database/database')

module.exports = class Transaction {

    constructor( type_of_transaction, users_iduser, cars_idcars) {
        
        this.type_of_transaction = type_of_transaction, 
        this.users_iduser = users_iduser, 
        this.cars_idcars = cars_idcars
    } 

    static async getAllTransactions(){
        const [rows] = await db.query('SELECT * FROM transactions');
                return  rows.length > 0 ? rows : null;
    }
}