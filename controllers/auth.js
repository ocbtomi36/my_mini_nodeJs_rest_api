const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = async(req,res,next) => {
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
        const hashedPassword = await bcrypt.hash(password,13);
        const foundPasswd = await User.PasswordExistsByIncommingData(hashedPassword);
        if (foundPasswd !== null) {
            return res.status(422).json({ message: 'Password is alerady exists' });
        } else {
        console.log(hashedPassword)
        const insertingUser = new User(first_name,last_name,date_of_birth,e_mail,hashedPassword);
        await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})
        }
    } catch (error) {
        res.status(500).json({ message: 'An teszt error occured'})
    }
        
}
exports.login = async(req,res,next) => {
    console.log('Itt az auth.js-ben')
    const e_mail = req.body.e_mail; 
    const password = req.body.password;
    let loadedEmailPassword;
    try{
    const foundEmailPassword = await User.EamilExistsByIncommingData(e_mail);
    if (foundEmailPassword === null) {
        return res.status(401).json({ message: "Email doesn't exists! " });
    }
    loadedPassword = foundEmailPassword;
    const isEqual = await bcrypt.compare(password,loadedPassword.password);
    if(!isEqual){
        return res.status(401).json({ message: "Wrong Password! " });
    } 
    console.log(loadedPassword.iduser)
    const token = jwt.sign({
        e_mail: loadedPassword.e_mail,
        userId: loadedPassword.iduser
    }, 'somesupersecretsecret', { expiresIn: '1h'});
    console.log(token);
    res.status(200).json({token: token, userId: loadedPassword.iduser.toString()})
    } catch (error) {
        res.status(500).json({ message: 'An login error occured'})
    }
}