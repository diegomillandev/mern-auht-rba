import { Router } from 'express';
import authRoutes from './auth.js';
import UserRoutes from './user.js';

const router = Router();

router.use('/auth', authRoutes)
router.use('/users', UserRoutes);

export default router;