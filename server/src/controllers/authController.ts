import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET || 'rotcs_secret_key_2026';



export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.*, s.name as state_name, s.code as state_code, s.slug as state_slug 
             FROM users u 
             LEFT JOIN states s ON u.state_id = s.id 
             WHERE u.username = ?`,
            [username]
        );

        if (rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const user = rows[0];
        if (password !== user.password_hash) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, state_id: user.state_id, state_slug: user.state_slug },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                state_id: user.state_id,
                state_name: user.state_name,
                state_code: user.state_code,
                state_slug: user.state_slug
            }
        });
    } catch (error: unknown) {
        const err = error as NodeJS.ErrnoException & { code?: string };
        const isDbError = err?.code === 'ECONNREFUSED' || err?.code === 'ETIMEDOUT' || err?.code === 'ER_ACCESS_DENIED_ERROR' || err?.code === 'ER_BAD_DB_ERROR' || (typeof err?.code === 'string' && err.code.startsWith('ER_'));

        if (isDbError) {
            console.error('Database connection error during login:', error);
        }

        console.error('Login error:', error);
        res.status(500).json({
            message: isDbError ? 'Database unavailable. Is MySQL running? Have you run database/schema.sql and database/seed.sql?' : 'Server error',
        });
    }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: 'User not found in token' });
        return;
    }

    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.id, u.username, u.email, u.role, u.state_id, s.name as state_name, s.code as state_code, s.slug as state_slug 
             FROM users u 
             LEFT JOIN states s ON u.state_id = s.id 
             WHERE u.id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user: rows[0] });
    } catch (error) {
        console.error('getCurrentUser error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
