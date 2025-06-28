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
    const name = req.body.name;
    const age = req.body.age;

    // create user in db
    res.status(201).json(
        {
            message: 'User created succesfully',
            user:{ id: new Date().toISOString(), name: name, age:age}
        }
    )
}