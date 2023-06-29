import express from 'express';
import { authController, loginController } from '../controllers/authController.js';


const router = express.Router();

// Rotues

// Register || POST
router.post('/register', authController);
// Login || POST
router.post('/login', loginController);

export default router;