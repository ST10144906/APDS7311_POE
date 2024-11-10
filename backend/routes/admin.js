// routes/adminTransactionRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Route to get all transactions (admin access)
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

// Route to toggle transaction verification status (admin access)
router.patch('/transactions/:id/verify', async (req, res) => {
  try {
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid transaction ID' });
    }

    // Find the transaction by ID
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Toggle the verification status
    transaction.verified = !transaction.verified;
    const updatedTransaction = await transaction.save();

    res.status(200).json({ msg: 'Verification status updated', transaction: updatedTransaction });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: 'Error updating verification status', error: error.message });
  }
});

module.exports = router;
