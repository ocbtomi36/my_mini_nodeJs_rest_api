const db = require('../database/database')


module.exports = class User {
    constructor( first_name, last_name, date_of_birth, e_mail, password,created_at, updated_at) {
        
        this.first_name = first_name, 
        this.last_name = last_name, 
        this.date_of_birth = date_of_birth, 
        this.e_mail = e_mail, 
        this.password = password
        /*
        this.created_at = created_at,
        this.updated_at = updated_at
        this.deleted_at = null
        */
    }  
    save(){
       return db.execute('INSERT INTO users (first_name, last_name, date_of_birth, e_mail, password) VALUES (?, ?, ?, ?, ?)',
            [this.first_name,this.last_name,this.date_of_birth,this.e_mail,this.password]);
        /* must be modified 
        INSERT INTO `my_mini_nodejs_app_db_github`.`users` (`first_name`, `last_name`, `date_of_birth`, `e_mail`, `password`, `created_at`, `updated_at`) VALUES ('Thomas', 'Db', '1981.01.01', 'tom@tom.hu', 'teszt', '2025.06.28', '2025.06.28');
        return db.execute('INSERT INTO person (name, date_of_birth) VALUES (?, ?)',
            [this.name, this.date_of_birth]);
            */
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