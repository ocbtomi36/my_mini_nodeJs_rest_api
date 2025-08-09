const Transaction = require('../models/transactions');

/**
 * Gets all cars from the database, ready
 */
exports.getAllTransactions = async (req, res, next) => {
    try {
      const queryResult = await Transaction.getAllTransactions;
      if(queryResult === null){
      
        res.status(204).json({ message: 'There is no data in database'})
        return;
    } else {
        res.status(200).json({ message: ' Query success', data: queryResult})
        return;
    }
    } catch (error) {
      res.status(500).json({ message: 'An error occured'})
      return;
    }
};