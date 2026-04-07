import { Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { AuthRequest } from '../middlewares/authMiddleware.js';

/**
 * Get all users.
 * Restricted to global_admin.
 */
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can list users' });
        return;
    }

    try {
        const [users] = await pool.query<RowDataPacket[]>(
            `SELECT u.id, u.username, u.email, u.role, u.state_id, u.status, s.name as state_name 
             FROM users u 
             LEFT JOIN states s ON u.state_id = s.id`
        );

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Create a new user (State Admin, Auditor, Operator Admin, etc.).
 * Restricted to global_admin.
 */
export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const { username, email, password, role, state_id, status } = req.body;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can create users' });
        return;
    }

    try {
        // Simple plain password hashing as per current auth setup (it's not actually hashed in the current repo)
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO users (username, email, password_hash, role, state_id, status) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [username, email, password, role, state_id || null, status || 'active']
        );

        res.status(201).json({ 
            message: 'User account created successfully', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Update a user.
 * Restricted to global_admin.
 */
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { username, email, password, role, state_id, status } = req.body;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can update users' });
        return;
    }

    try {
        // If password is provided, update it too
        let query = `UPDATE users SET username = ?, email = ?, role = ?, state_id = ?, status = ?`;
        let params = [username, email, role, state_id || null, status];

        if (password) {
            query += `, password_hash = ?`;
            params.push(password);
        }

        query += ` WHERE id = ?`;
        params.push(id);

        await pool.query(query, params);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Delete a user.
 * Restricted to global_admin.
 */
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (req.user?.role !== 'global_admin') {
        res.status(403).json({ message: 'Only superadmin can delete users' });
        return;
    }

    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
