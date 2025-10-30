import { Router } from 'express';
import { UserController } from '../../controllers/UserController.js';
import { verifyToken, authorizeRoles } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, authorizeRoles('admin'), UserController.getUsers);
router.get('/me', verifyToken, UserController.getProfile);
router.delete('/:id', verifyToken, authorizeRoles('admin'), UserController.deleteUser);

export default router;