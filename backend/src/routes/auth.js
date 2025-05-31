const express = require('express');
const router = express.Router();
const { 
  signup, 
  signin, 
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getSessions,
  revokeSession
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleAuth');
const { validate, authValidation } = require('../middleware/validation');

// Public routes
router.post('/signup', authValidation.signup, validate, signup);
router.post('/signin', authValidation.signin, validate, signin);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', authValidation.signin, validate, forgotPassword);
router.post('/reset-password/:token', authValidation.resetPassword, validate, resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/sessions', protect, getSessions);
router.delete('/sessions/:token', protect, revokeSession);

// Admin routes
router.get('/admin/users', protect, authorize('admin'), async (req, res) => {
  // TODO: Implement admin user list
  res.json({ message: 'Admin route - List all users' });
});

module.exports = router; 