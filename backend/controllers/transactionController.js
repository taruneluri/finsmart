import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, notes } = req.body;

        const transaction = await Transaction.create({
            userId: req.user._id,
            amount,
            type,
            category,
            date,
            notes
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
    try {
        const { month, year, category, type } = req.query;
        let query = { userId: req.user._id };

        if (category) query.category = category;
        if (type) query.type = type;
        if (month) {
            const currentYear = year ? parseInt(year) : new Date().getFullYear();
            const startDate = new Date(currentYear, parseInt(month) - 1, 1);
            const endDate = new Date(currentYear, parseInt(month), 0);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Check if user owns the transaction
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Check if user owns the transaction
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await transaction.deleteOne();
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single transaction details
// @route   GET /api/transactions/:id
// @access  Private
export const getSingleTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Check if user owns the transaction
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
