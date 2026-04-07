import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export const getAuditLogs = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        const filter = role === 'state_admin' ? 'WHERE state_id = ?' : '';
        const params = role === 'state_admin' ? [state_id] : [];

        const [logs] = await pool.query<RowDataPacket[]>(
            `SELECT a.*, u.username 
             FROM audit_logs a 
             JOIN users u ON a.user_id = u.id 
             ${filter} 
             ORDER BY a.created_at DESC 
             LIMIT 100`,
            params
        );

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
