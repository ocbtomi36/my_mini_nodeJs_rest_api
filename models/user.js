const db = require('../database/database')


module.exports = class User {
    constructor( iduser, first_name, last_name, date_of_birth, e_mail, password,created_at,updated_at) {
        this.iduser = iduser;
        this.first_name = first_name, 
        this.last_name = last_name, 
        this.date_of_birth = date_of_birth, 
        this.e_mail = e_mail, 
        this.password = password,
        this.created_at = created_at,
        this.updated_at = updated_at
    }
    
    save(){
        /* must be modified
        return db.execute('INSERT INTO person (name, date_of_birth) VALUES (?, ?)',
            [this.name, this.date_of_birth]);
            */
    }   
    static fetchAll() {
        

    }
    static findById(id) {

    }
    /*
    static findItem(title) {
       return db.execute('SELECT id FROM products WHERE title = ?', [title])
    }
       */

};