import express from 'express';
import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSingleTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addTransaction)
    .get(protect, getTransactions);

router.route('/:id')
    .put(protect, updateTransaction)
    .delete(protect, deleteTransaction)
    .get(protect, getSingleTransaction);

export default router;
