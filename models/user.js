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
    static async asyncFetchAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return  rows.length > 0 ? rows : 0;

    }
    static findUserById(userId) {
        
        return db.execute('SELECT first_name, last_name, date_of_birth, e_mail FROM users where users.iduser = ?', [userId]);
    }
    static deleteUserById(userId) {
        return db.execute('DELETE from users where users.iduser = ?', [userId]);
    }
    
    updateUserById(userId) {
       return db.execute('UPDATE users SET first_name = ?, last_name = ?, date_of_birth = ?, e_mail = ?, password = ? WHERE users.iduser = ?', [this.first_name,this.last_name,this.date_of_birth,this.e_mail,this.password,userId])
    }

};