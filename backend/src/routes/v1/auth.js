import { Router } from 'express';
import { AuthController } from '../../controllers/AuthControllers.js';

const router = Router();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)

export default router;