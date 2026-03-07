import Budget from '../models/budgetModel.js';
import Transaction from '../models/transactionModel.js';
import mongoose from 'mongoose';

// @desc    Set or update monthly budget
// @route   POST /api/budget
// @access  Private
export const setBudget = async (req, res) => {
    try {
        const { monthlyBudget, month, year } = req.body;

        const budget = await Budget.findOneAndUpdate(
            { userId: req.user._id, month, year },
            { monthlyBudget },
            { new: true, upsert: true }
        );

        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get budget summary (Income, Expense, Savings, and Progress)
// @route   GET /api/budget/summary
// @access  Private
export const getBudgetSummary = async (req, res) => {
    try {
        const { month, year } = req.query;
        const currentMonth = parseInt(month) || new Date().getMonth() + 1;
        const currentYear = parseInt(year) || new Date().getFullYear();

        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);

        // Aggregation pipeline for totals
        const totals = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id),
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const summary = {
            totalIncome: 0,
            totalExpense: 0,
            savings: 0,
            budget: 0,
            percentageUsed: 0
        };

        totals.forEach((item) => {
            if (item._id === 'income') summary.totalIncome = item.total;
            if (item._id === 'expense') summary.totalExpense = item.total;
        });

        summary.savings = summary.totalIncome - summary.totalExpense;

        // Fetch user's budget for the month
        const budgetData = await Budget.findOne({
            userId: req.user._id,
            month: currentMonth,
            year: currentYear
        });

        if (budgetData) {
            summary.budget = budgetData.monthlyBudget;
            summary.percentageUsed = (summary.totalExpense / summary.budget) * 100;
        }

        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
