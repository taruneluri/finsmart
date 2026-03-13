import express from 'express';
import { processChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to handle chat messages
// Needs to be protected so we can use req.user.id to fetch transactions
router.post('/', protect, processChat);

export default router;
