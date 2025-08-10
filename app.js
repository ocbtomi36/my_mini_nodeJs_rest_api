const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

app.use(bodyParser.json()); // this is for application/json

app.use((req,res,next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'OPTIONS ,GET ,POST , PUT , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use('/user',userRoutes);
app.use('/car',carRoutes);
app.use('/auth',authRoutes); 
app.use('/transaction',transactionRoutes);


app.use((error, req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});

/*
opcionális
let datum = new Date().toLocaleDateString().replaceAll(' ','').substring(0,10);
let time = new Date().toLocaleTimeString();
let formatedDate = datum + ' ' + time
console.log(formatedDate);
*/
app.listen(3000);

// 393 for get side