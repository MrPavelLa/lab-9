const Transaction = require('../models/transactionModel');

exports.createTransaction = async (req, res) => {
  const { code, operationName, date, time, amount, category, accounts, target, isdeleted} = req.body;

  const transaction = new Transaction({
    code, 
    operationName, 
    date, 
    time, 
    amount, 
    category, 
    accounts, 
    target, 
    isdeleted
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, target } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, target },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { isdeleted: true },
      { new: true }
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(deletedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTransactionsForCode = async (req, res) => {
  const { code } = req.params;

  try {
    const transactions = await Transaction.find({ code });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
