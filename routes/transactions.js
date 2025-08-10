const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

const { validateUserInput, isTransactionExistsById  } = require('../helper/helper')

const isAuth = require('../middleware/is-auth');


router.get('/transactions',isAuth,transactionsController.getAllTransactions);
router.get('/:transactionId',isTransactionExistsById,transactionsController.getOneTransaction);
module.exports = router;
