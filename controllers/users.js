
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
            res.status(200).json({message: 'Query is success', data: req.user})
    } catch (error) {
        res.status(500).json({ message: 'An error occured'})
        return;
    }
}
/**
 * Create a user by incomming data
*/
exports.createUser = async(req,res,next) => {
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
/**
 * Delete a user by id
*/
exports.deleteUser = async (req,res,next) => {
    try {
        console.log(req.user.iduser)
        const [ result ] = await User.DeleteUserById(req.user.iduser);
        if(result.affectedRows === 0){
            return res.status(404).json({ message: 'Delete failed - User not found anymore' });
        }
        res.status(200).json({message: 'User delete successful'});
    } catch (error) {
        res.status(500).json({ message: 'There is an error during deleting'})
    }
}
exports.updateUserById = async (req,res,next) => {
    try {
        const userId = req.user.iduser;
        const first_name = req.body.first_name; 
        const last_name = req.body.last_name; 
        const date_of_birth = req.body.date_of_birth; 
        const e_mail = req.body.e_mail; 
        const password = req.body.password;
        const incommingEmailValidation = await User.EamilExistsByIncommingData(e_mail); 
        const incommingPasswordValidaton = await User.PasswordExistsByIncommingData(password);
        if (incommingEmailValidation == null && incommingPasswordValidaton == null) {
            console.log('egyik sincs benne, lehet beszúrni')
            const userUpdate = new User(first_name,last_name,date_of_birth,e_mail,password);
            await userUpdate.updateUserById(userId);
            res.status(200).json({message: 'User update successful'});
        } else if(incommingEmailValidation != null && incommingPasswordValidaton != null){ 
            if(incommingEmailValidation.iduser == userId && incommingPasswordValidaton.iduser == userId){
                const userUpdate = new User(first_name,last_name,date_of_birth,e_mail,password);
                await userUpdate.updateUserById(userId);
                res.status(200).json({message: 'User update successful'});
            } else {
                res.status(422).json({message: " Email or password already exists by an other user."});
            }
        } else if(incommingEmailValidation == null && incommingPasswordValidaton != null){
            if(incommingPasswordValidaton.iduser == userId){
                const userUpdate = new User(first_name,last_name,date_of_birth,e_mail,password);
                await userUpdate.updateUserById(userId);
                res.status(200).json({message: 'User update successful'});
            } else {
                res.status(422).json({message: "Password already exists by an other user."});
            }
        } else if(incommingEmailValidation != null && incommingPasswordValidaton == null){
            if(incommingEmailValidation.iduser == userId){
                const userUpdate = new User(first_name,last_name,date_of_birth,e_mail,password);
                await userUpdate.updateUserById(userId);
                res.status(200).json({message: 'User update successful'});
            } else {
                res.status(422).json({message: "Email already exists by an other user."});
            }
        } 
    } catch {
        res.status(500).json({ message: 'An error occured Ok'})
        return;
    }
}
