import express from 'express';
import { getAnomalies, getRiskScores } from '../controllers/anomalyController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAnomalies);
router.get('/risk-scores', authenticate, getRiskScores);

export default router;
