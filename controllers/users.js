const { validationResult } = require('express-validator');

exports.getUsers = (req, res, next) => {
    res.status(200).json({
        name: "Tomi",
        age: 34
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