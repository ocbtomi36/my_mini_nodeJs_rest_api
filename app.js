const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const db = require('./database/database')
const app = express();

app.use(bodyParser.json()); // this is for application/json

app.use((req,res,next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET ,POST , PUT , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.next()
})

app.use('/user',userRoutes);

app.listen(3000);