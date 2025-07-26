const { validationResult } = require('express-validator');
const User = require('../models/user');
//const { post } = require('../routes/user');

/**
 * Gets all users from the database
 */
exports.getUsers = async (req, res, next) => {
    try{
        const queryResult = await User.FetchAllUsers();
        if(queryResult === null) {
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
        const queryResult = await User.FindUserById(incommingId);
        if(queryResult === null) {
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
        const password = req.body.password;
        const foundEmail = await User.EamilExists(e_mail);
        if (foundEmail !== null) {
            return res.status(422).json({ message: 'Email is alerady exists' });
        }
        const foundPasswd = await User.PasswordExists(password);
        if (foundPasswd !== null) {
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
exports.updateUserById = async (req,res,next) => {
    const userId = req.params.userId;
    const foundedUser = await User.FindUserById(userId);
    if(foundedUser === null){
        return res.status(422).json({ message: 'There is no data with that id' });
    }
    const foundedEmail = foundedUser.e_mail; //jo a bejövő id-hez ez az email tartozik
    const foundedPassword = foundedUser.password; //jo a bejövő id-hez ez a password tartozik
    // bejövő adat validálás
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message: 'Validation failed.',
            errors: errors.array()
        })
    }
    // betöltjük a bejövő adatokat
    const first_name = req.body.first_name; 
    const last_name = req.body.last_name; 
    const date_of_birth = req.body.date_of_birth; 
    const e_mail = req.body.e_mail; 
    const password = req.body.password;
    // félreteszem innen. A logikát később
    console.log(foundedEmail, foundedPassword);

}

