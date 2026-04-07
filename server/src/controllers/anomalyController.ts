import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

/** Get live threat feed (anomalies) for the current state or global. */
export const getAnomalies = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        // Multi-tenant filtering
        const stateFilter = role === 'state_admin' ? 'WHERE state_id = ?' : '';
        const params = role === 'state_admin' ? [state_id] : [];

        // Currently, we don't have an 'anomalies' table. 
        // We might want to query audit_logs or suspicious metrics.
        // For now, return some structural data from DB or placeholder.
        
        // Let's assume we want to find GGR variances over a threshold (> 0.5%)
        // or operator downtime events.
        const [anomalies] = await pool.query<RowDataPacket[]>(
            `SELECT 
                'API_TIMEOUT' as type, 
                'critical' as severity, 
                o.name as operator, 
                'active' as status, 
                o.id as operator_id
             FROM operators o
             ${stateFilter}
             LIMIT 5`,
            params
        );

        res.status(200).json(anomalies);
    } catch (error) {
        console.error('Error fetching anomalies:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/** Get regional risk scores (based on variance/compliance). */
export const getRiskScores = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        const sid = role === 'state_admin' ? state_id : Number(req.query.state_id);
        if (!sid && role !== 'global_admin') {
             res.status(400).json({ message: 'state_id required for risk scoring' });
             return;
        }

        // Aggregate risk by LGA
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT 
                l.name as region,
                FLOOR(RAND() * 80) + 10 as score -- Placeholder logic for risk calculation
             FROM lgas l
             WHERE l.state_id = ?`,
            [sid]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching risk scores:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
