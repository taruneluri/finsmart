import express from 'express';
import { setBudget, getBudgetSummary } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, setBudget);
router.get('/summary', protect, getBudgetSummary);

export default router;
