const Transaction = require('../models/transactions');

/**
 * Gets all transactions from the database
 */
exports.getAllTransactions = async (req, res, next) => {
    
    try {
      const queryResult = await Transaction.FetchAllTransactions();
      if(queryResult === null || queryResult.length === 0){
        return res.status(200).json({ message: 'There is no data in database'})
    } else {
      console.log(queryResult)
        res.status(200).json({ message: ' Query success', data: queryResult})
        return;
    }
    } catch (error) {
      res.status(500).json({ message: 'An error occured'})
      return;
    }
};
exports.getOneTransaction = async (req,res,next) => {
  try {
    res.status(200).json({ message: 'csöcs', data: req.transaction});
  } catch (error) {
    res.status(500).json({ message: 'An error occured'})
  }
}