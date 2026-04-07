import express from 'express';
import { getOperators, createOperator, updateOperator, deleteOperator } from '../controllers/operatorController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// Reading operators is allowed for both superadmin and state admins
router.get('/', authorize(['global_admin', 'state_admin']), getOperators);

// Creating, updating, and deleting is ONLY for superadmin (global_admin)
// This fulfills the requirement: "state admin can't create operators"
router.post('/', authorize(['global_admin']), createOperator);
router.put('/:id', authorize(['global_admin']), updateOperator);
router.delete('/:id', authorize(['global_admin']), deleteOperator);

export default router;
