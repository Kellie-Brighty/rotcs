import express from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only admins and auditors can view logs
router.get('/logs', authenticate, authorize(['global_admin', 'state_admin', 'auditor']), getAuditLogs);

export default router;
