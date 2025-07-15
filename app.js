const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car')

const app = express();

app.use(bodyParser.json()); // this is for application/json

app.use((req,res,next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET ,POST , PUT , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/user',userRoutes);
app.use('/car',carRoutes);

/*
opcionális
let datum = new Date().toLocaleDateString().replaceAll(' ','').substring(0,10);
let time = new Date().toLocaleTimeString();
let formatedDate = datum + ' ' + time
console.log(formatedDate);
*/
app.listen(3000);