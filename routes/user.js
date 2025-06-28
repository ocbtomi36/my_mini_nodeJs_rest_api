const express = require('express');

const { body } = require('express-validator');

const userController = require('../controllers/users');

const router = express.Router();

//GET route is /user/users

router.get('/users', userController.getUsers);

//POST route for create a new user
router.post('/user',[
    body('name').trim().isLength({min:1,max:45}),
    body('age').isNumeric()

],userController.createUser);


module.exports = router;