import express from 'express';
import { getInvoices, processPayment } from '../controllers/billingController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/invoices', authenticate, getInvoices);
router.post('/pay', authenticate, processPayment);

export default router;
