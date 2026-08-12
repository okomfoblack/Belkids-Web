// routes/authRoutes.js
import express from 'express';
import { 
  signup, 
  login,        
  forgotPassword, 
  resetPassword,
  verifyResetToken
} from '../controllers/authController.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);  // ✅ Changed from PUT to POSTcc
router.get('/verify-reset-token/:token', verifyResetToken);

export default router;