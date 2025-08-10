const db = require('../database/database')

module.exports = class Transaction {

    constructor( type_of_transaction, users_iduser, cars_idcars) {
        
        this.type_of_transaction = type_of_transaction, 
        this.users_iduser = users_iduser, 
        this.cars_idcars = cars_idcars
    } 

    static async FetchAllTransactions(){
        const [rows] = await db.query('SELECT transactions.idtransaction, users.iduser, users.first_name, users.last_name, cars.type_of_car, transactions.type_of_transaction FROM transactions INNER JOIN cars ON cars.idcars=transactions.cars_idcars INNER JOIN users ON users.iduser = transactions.users_iduser');
        return  rows.length > 0 ? rows : null;
    }
    static async FindTransactionById(transactionId){
            const [row] = await db.query('SELECT transactions.idtransaction, users.iduser, users.first_name, users.last_name, cars.type_of_car, transactions.type_of_transaction FROM transactions INNER JOIN cars ON cars.idcars=transactions.cars_idcars INNER JOIN users ON users.iduser = transactions.users_iduser where idtransaction = ?',[transactionId])
            return row.length > 0 ? row[0] : null;
    }
}