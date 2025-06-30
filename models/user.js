const db = require('../database/database')


module.exports = class User {
    constructor( first_name, last_name, date_of_birth, e_mail, password) {
        
        this.first_name = first_name, 
        this.last_name = last_name, 
        this.date_of_birth = date_of_birth, 
        this.e_mail = e_mail, 
        this.password = password
    }  
    save(){
        return db.execute('INSERT INTO users (first_name, last_name, date_of_birth, e_mail, password) VALUES (?, ?, ?, ?, ?)',
            [this.first_name,this.last_name,this.date_of_birth,this.e_mail,this.password]);
    }   
    static fetchAll() {
        return db.execute('SELECT first_name FROM users');

    }
    static findById(id) {
        
    }
    /*
    static findItem(title) {
       return db.execute('SELECT id FROM products WHERE title = ?', [title])
    }
       */

};