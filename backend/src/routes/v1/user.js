import { Router } from 'express';
import { UserController } from '../../controllers/UserController.js';
import { verifyToken, authorizeRoles } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);
router.get('/', authorizeRoles('admin'), UserController.getUsers);
router.delete('/:id', authorizeRoles('admin'), UserController.deleteUser);
router.get('/me', authorizeRoles('admin', 'user'), UserController.getProfile);

export default router;