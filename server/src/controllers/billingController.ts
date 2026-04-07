import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export const getInvoices = async (req: AuthRequest, res: Response): Promise<void> => {
    const { state_id, role, id: userId } = req.user!;

    try {
        let query = 'SELECT i.*, o.name as operator_name FROM invoices i JOIN operators o ON i.operator_id = o.id';
        let params: any[] = [];

        if (role === 'state_admin') {
            query += ' WHERE i.state_id = ?';
            params.push(state_id);
        } else if (role === 'operator_admin') {
            query += ' WHERE i.operator_id = (SELECT operator_id FROM users WHERE id = ?)';
            params.push(userId);
        }

        const [rows] = await pool.query<RowDataPacket[]>(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createInvoice = async (req: AuthRequest, res: Response): Promise<void> => {
    // Logic for generating an invoice (e.g. from metrics)
    res.status(501).json({ message: 'Billing generation not implemented yet' });
};

export const processPayment = async (req: AuthRequest, res: Response): Promise<void> => {
    const { invoice_id, payment_method } = req.body;

    try {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE invoices SET status = "PAID", paid_at = CURRENT_TIMESTAMP WHERE id = ?',
            [invoice_id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Invoice not found' });
            return;
        }

        res.status(200).json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Payment processing failed' });
    }
};
