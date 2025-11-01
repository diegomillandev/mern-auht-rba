import { Router } from 'express';
import { UserController } from '../../controllers/UserController.js';
import { verifyToken, authorizeRoles } from '../../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);
router.get('/', authorizeRoles('admin'), UserController.getUsers);
router.delete('/:id', authorizeRoles('admin'), UserController.deleteUser);
router.get('/me', authorizeRoles('admin', 'user'), UserController.getProfile);
router.put('/me', authorizeRoles('admin', 'user'), UserController.updateProfile);
router.patch('/me', authorizeRoles('admin', 'user'), UserController.updatePassword);

export default router;