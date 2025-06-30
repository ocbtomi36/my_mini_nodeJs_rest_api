const { validationResult } = require('express-validator');
const User = require('../models/user')

exports.getUsers = (req, res, next) => {
    User.fetchAll()
    .then(([rows, field]) => {
        if (!rows || rows.length === 0) {
          return res.status(404).json({ message: 'Database is empty' });
        }
        res.status(200).json({
            message: '',
            rows
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
      });
};
exports.createUser = (req,res,next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message: 'Validation failed.',
            errors: errors.array()
        })
    }
    
    const first_name = req.body.first_name; 
    const last_name = req.body.last_name; 
    const date_of_birth = req.body.date_of_birth; 
    const e_mail = req.body.e_mail; 
    const password = req.body.password;
    
    const user = new User(first_name,last_name,date_of_birth,e_mail,password);
    user
    .save()
    .then( () =>{
        res.status(201).json({
        message: 'User is Created',
    })
    })
    .catch(err => {
        console.log()
    });
}