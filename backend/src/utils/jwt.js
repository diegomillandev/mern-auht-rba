import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_REFRESH_SECRET } from '../constants/env.js';

export const signToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, {
        expiresIn: '15m',
    });
}

export const refreshToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });
}  