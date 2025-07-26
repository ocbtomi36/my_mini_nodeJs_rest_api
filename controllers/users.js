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
