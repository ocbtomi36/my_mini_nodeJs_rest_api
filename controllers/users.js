const { validationResult } = require('express-validator');
const User = require('../models/user');
//const { post } = require('../routes/user');

/**
 * Gets all users from the database
 */
exports.getUsers = async (req, res, next) => {
    try{
        const queryResult = await User.asyncFetchAllUsers();
        if(queryResult === 0) {
            return res.status(404).json({ message: 'Database is empty' });
        } else {
            res.status(200).json({
                message: 'Query is success',
                data: queryResult})
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
        return;
    }
}
/**
 * Gets one users from the database if id exists.
 */
exports.getUser = async (req,res,next) => {
    try{
        const incommingId = req.params.userId;
        const queryResult = await User.asyncFindUserById(incommingId);
        if(queryResult === 0) {
            return res.status(422).json({ message: 'There is no data with that id' });
        } else {
            res.status(200).json({
                message: 'Query is success',
                data: queryResult})
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
        return;
    }
}
exports.deleteUserById = (req,res,next) => {
    const userId = req.params.userId;
    User.findUserById(userId)
    .then(([user]) => {
        if(!user || user.length === 0) {
            return res.status(404).json({ message: 'There is no user with that id' });
        } 
        return User.deleteUserById(userId);
    })
    .then(() => {
        res.status(200).json({ message: 'User deleted succesfully'});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        } 
        next(err);
      });
}
/**
 * Create a user by incomming data
*/
exports.createUser = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message: 'Validation failed.',
            errors: errors.array()
        })
    }
    
    try {
        const first_name = req.body.first_name; 
        const last_name = req.body.last_name; 
        const date_of_birth = req.body.date_of_birth; 
        const e_mail = req.body.e_mail; 
        const password = req.body.password.toLowerCase();
        const isEmailExists = await User.asyncEamilExists(e_mail);
        if (isEmailExists !== 0) {
            return res.status(422).json({ message: 'Email is alerady exists' });
        }
        const isPasswdExists = await User.asyncPasswordExists(password);
        if (isPasswdExists !== 0) {
            return res.status(422).json({ message: 'Password is alerady exists' });
        } else {
        const insertingUser = new User(first_name,last_name,date_of_birth,e_mail,password);
        await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
        return;
    }
    
} 
exports.updateUserById = (req,res,next) => {
    const userId = req.params.userId;
    User.findUserById(userId)
    .then(([user]) => {
        const errors = validationResult(req);
        if(!user || user.length === 0) {
            return res.status(404).json({ message: 'There is no user with that id' });
        } else if(!errors.isEmpty()){
            return res.status(422).json({message: 'Validation Failed', errors: errors.array()})
        } else {
            const first_name = req.body.first_name; 
            const last_name = req.body.last_name; 
            const date_of_birth = req.body.date_of_birth; 
            const e_mail = req.body.e_mail; 
            const password = req.body.password.toLowerCase();
            const updatedUser = new User(first_name,last_name,date_of_birth,e_mail,password);
            updatedUser.updateUserById(userId);
            return res.status(200).json({
            message: 'User is Updated',})
        }
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}