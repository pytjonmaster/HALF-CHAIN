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
  revokeSession,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSystemStats
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
router.get('/admin/users', protect, authorize('admin'), getAllUsers);
router.get('/admin/users/:id', protect, authorize('admin'), getUserById);
router.put('/admin/users/:id', protect, authorize('admin'), updateUser);
router.delete('/admin/users/:id', protect, authorize('admin'), deleteUser);
router.get('/admin/stats', protect, authorize('admin'), getSystemStats);

module.exports = router; 