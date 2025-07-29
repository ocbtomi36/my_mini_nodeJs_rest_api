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
        const foundEmail = await User.EamilExistsByIncommingData(e_mail);
        if (foundEmail !== null) {
            return res.status(422).json({ message: 'Email is alerady exists' });
        }
        const foundPasswd = await User.PasswordExistsByIncommingData(password);
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
// valamik káoszos
exports.updateUserById = async (req,res,next) => {
    const userId = req.params.userId;
    const foundedUser = await User.FindUserById(userId);
    if(foundedUser === null){
        return res.status(422).json({ message: 'There is no data with that id' });
    }
    try {
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
        // Mikor valid egy adat, akkor amikor nem sérti a uniqe megszorítást!!!!!!!!
        // Elsőnek nézzük meg a bejövő emailt, a logika az, hogy azt az esetet nézzük amikor elutasítok, mikor van ez ? amikor a bejövő adattal lekérdezek,
        /*létezik e az adott e-mail */
        const incommingEmalValidation = await User.EamilExistsByIncommingData(e_mail); // van mögötte id, // ha null ok
        const incommingPasswordValidaton = await User.PasswordExistsByIncommingData(password); // van mögötte id // ha null ok
        if(incommingEmalValidation !== null){
            // akkor létezik ez és kéne a hozzá tartozó id, ha ez megeggyezik a bejövő id-val ok ha nem elutasít
            const e_mailId = incommingEmalValidation.iduser;
            if(e_mailId != userId){
                return res.status(422).json({ message: 'Email is alerady exists with different id' });
            }
        }
        if(incommingPasswordValidaton !== null){
            const passwdId = incommingPasswordValidaton.iduser;
            console.log(passwdId)
            if(passwdId != userId) {
                return res.status(422).json({ message: 'Password is alerady exists with different id' });
            }
        }
        if('bela'){
        const updatingUser = new User(first_name,last_name,date_of_birth,e_mail,password);
        await updatingUser.updateUserById(userId);
        res.status(201).json({
                    message: 'User is Updated'})
        } else {
        if(incommingEmalValidation == null && incommingPasswordValidaton == null){
            const updatingUser = new User(first_name,last_name,date_of_birth,e_mail,password);
            await updatingUser.updateUserById(userId);
            res.status(201).json({
                    message: 'User is Updated'})
        }
    }
    } catch {
        res.status(500).json({ message: 'An error occured'})
        return;
    }

    // hacker rank
}

