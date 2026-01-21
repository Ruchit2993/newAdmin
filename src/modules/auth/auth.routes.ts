import express from 'express';
import { AuthController } from './auth.controller.ts';
import { validateDto, RegisterValidator, LoginValidator } from './auth.validation.ts';

const router = express.Router();
const authController = new AuthController();

router.post('/register', validateDto(RegisterValidator), authController.register);
router.post('/login', validateDto(LoginValidator), authController.login);

export default router;
