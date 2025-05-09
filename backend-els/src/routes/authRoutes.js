import { Router } from 'express';
import { register, login, refreshAccessToken } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

export default router;
