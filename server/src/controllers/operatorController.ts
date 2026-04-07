import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

/**
 * Get all operators.
 * global_admin: sees all.
 * state_admin: sees only their state's operators.
 */
export const getOperators = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role } = req.user!;

    try {
        const whereClause = role === 'state_admin' ? 'WHERE state_id = ?' : '';
        const params = role === 'state_admin' ? [state_id] : [];

        const [operators] = await pool.query<RowDataPacket[]>(
            `SELECT o.*, s.name as state_name FROM operators o 
             LEFT JOIN states s ON o.state_id = s.id 
             ${whereClause}`,
            params
        );

        res.status(200).json(operators);
    } catch (error) {
        console.error('Error fetching operators:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Create a new operator.
 * Restricted to global_admin.
 */
export const createOperator = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, name, license_number, api_endpoint, api_key, status } = req.body;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can create operators' });
        return;
    }

    try {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO operators (state_id, name, license_number, api_endpoint, api_key, status) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [state_id, name, license_number, api_endpoint, api_key, status || 'active']
        );

        res.status(201).json({ 
            message: 'Operator created successfully', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error creating operator:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Update an operator.
 * Restricted to global_admin.
 */
export const updateOperator = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { state_id, name, license_number, api_endpoint, api_key, status } = req.body;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can update operators' });
        return;
    }

    try {
        await pool.query(
            `UPDATE operators SET state_id = ?, name = ?, license_number = ?, api_endpoint = ?, api_key = ?, status = ? 
             WHERE id = ?`,
            [state_id, name, license_number, api_endpoint, api_key, status, id]
        );

        res.status(200).json({ message: 'Operator updated successfully' });
    } catch (error) {
        console.error('Error updating operator:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Delete an operator.
 * Restricted to global_admin.
 */
export const deleteOperator = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can delete operators' });
        return;
    }

    try {
        await pool.query('DELETE FROM operators WHERE id = ?', [id]);
        res.status(200).json({ message: 'Operator deleted successfully' });
    } catch (error) {
        console.error('Error deleting operator:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
