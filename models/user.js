const db = require('../database/database')


module.exports = class User {
    constructor( first_name, last_name, date_of_birth, e_mail, password) {
        
        this.first_name = first_name, 
        this.last_name = last_name, 
        this.date_of_birth = date_of_birth, 
        this.e_mail = e_mail, 
        this.password = password
    }  
    async save(){
         return await db.execute('INSERT INTO users (first_name, last_name, date_of_birth, e_mail, password) VALUES (?, ?, ?, ?, ?)',
            [this.first_name,this.last_name,this.date_of_birth,this.e_mail,this.password]);
    }   
    static async asyncFetchAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return  rows.length > 0 ? rows : 0;

    }
    static async asyncFindUserById(userId) {
        
        const [row] = await db.query('SELECT * FROM users where users.iduser = ?', [userId]);
        return row.length > 0 ? row : 0;
    }
    static async asyncDeleteUserById(userId) {
        return await db.execute('DELETE from users where users.iduser = ?', [userId]);
    }
    
    updateUserById(userId) {
       return db.execute('UPDATE users SET first_name = ?, last_name = ?, date_of_birth = ?, e_mail = ?, password = ? WHERE users.iduser = ?', [this.first_name,this.last_name,this.date_of_birth,this.e_mail,this.password,userId])
    }
    /** 
     * Addition queries for validation of email password
    */
    /**
     * Validate e-mail, if exists
     */
    static async asyncEamilExists(incommingData) {
        
        const [row] = await db.query('SELECT e_mail FROM users where e_mail = ?', [incommingData]);
        return row.length > 0 ? row : 0;
    }
    /**
     * Validate password, if exists
     */
    static async asyncPasswordExists(incommingData) {
        
        const [row] = await db.query('SELECT password FROM users where password = ?', [incommingData]);
        return row.length > 0 ? row : 0;
    }
};