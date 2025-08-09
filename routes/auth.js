const express = require('express');

const { body } = require('express-validator');

const { validateUserInput } = require('../helper/helper')

const authController = require('../controllers/auth')
 
const router = express.Router();

// Build some signup logic deeper. This is same as addnewuser
router.post('/signup', [
    // check if string contains whitespaces and spec chars ? to do
    body('first_name').trim().isLength({min:1,max:20}).withMessage('length of first name is incorrect'),
    body('last_name').trim().isLength({min:1,max:20}).withMessage('length of last name is incorrect'),
    body('date_of_birth').trim().isLength({min:10,max:10}).withMessage('length of date of birth is incorrect'), //database format must be date then i get back YYYY-MM-DD string
    body('date_of_birth').trim().isDate('YYYY-MM-DD').withMessage("this field does't match with 'YYYY-MM-DD' format"),
    body('e_mail').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
    body('password').trim().isLength({min:1,max:45}).withMessage('length of last name is incorrect')

],validateUserInput,authController.signup);

router.post('/login',authController.login);

module.exports = router;