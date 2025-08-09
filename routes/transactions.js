const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

const isAuth = require('../middleware/is-auth');


router.get('/transactions',isAuth,transactionsController.getAllTransactions);
