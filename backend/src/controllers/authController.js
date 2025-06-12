const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const EmailService = require('../services/emailService');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await EmailService.sendVerificationEmail(email, name, verificationToken);

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: 'Please check your email to verify your account'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/signin
// @access  Public
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Add session
    user.sessions.push({
      token,
      device: req.headers['user-agent'],
      ip: req.ip,
      lastActive: new Date()
    });

    // Keep only last 5 sessions
    if (user.sessions.length > 5) {
      user.sessions = user.sessions.slice(-5);
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isEmailVerified: user.isEmailVerified
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    await EmailService.sendPasswordResetEmail(user.email, user.name, resetToken);

    res.json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all sessions
// @route   GET /api/auth/sessions
// @access  Private
exports.getSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Revoke session
// @route   DELETE /api/auth/sessions/:token
// @access  Private
exports.revokeSession = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.sessions = user.sessions.filter(
      session => session.token !== req.params.token
    );
    await user.save();

    res.json({ message: 'Session revoked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ADMIN ROUTES

// @desc    Get all users (Admin only)
// @route   GET /api/auth/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get search query if provided
    const search = req.query.search || '';
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    // Get total count for pagination
    const total = await User.countDocuments(searchQuery);

    // Get users with pagination (excluding passwords)
    const users = await User.find(searchQuery)
      .select('-password -resetPasswordToken -emailVerificationToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get users statistics
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          verifiedUsers: {
            $sum: { $cond: ['$isEmailVerified', 1, 0] }
          },
          adminUsers: {
            $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      },
      stats: stats[0] || { totalUsers: 0, verifiedUsers: 0, adminUsers: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single user details (Admin only)
// @route   GET /api/auth/admin/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -resetPasswordToken -emailVerificationToken');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/auth/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, isEmailVerified } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isEmailVerified === 'boolean') user.isEmailVerified = isEmailVerified;

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/auth/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow admin to delete themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get system statistics (Admin only)
// @route   GET /api/auth/admin/stats
// @access  Private/Admin
exports.getSystemStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $facet: {
          userStats: [
            {
              $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                verifiedUsers: { $sum: { $cond: ['$isEmailVerified', 1, 0] } },
                adminUsers: { $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } }
              }
            }
          ],
          recentSignups: [
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            { $project: { name: 1, email: 1, createdAt: 1, isEmailVerified: 1 } }
          ],
          dailySignups: [
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 30 }
          ]
        }
      }
    ]);

    // Get active sessions count
    const activeSessions = await User.aggregate([
      { $unwind: '$sessions' },
      { $group: { _id: null, totalSessions: { $sum: 1 } } }
    ]);

    res.json({
      ...stats[0],
      activeSessions: activeSessions[0]?.totalSessions || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 