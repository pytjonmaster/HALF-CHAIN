const express = require('express');
require('dotenv').config();

const connectDB = require('./config/database');
const { setupSecurityMiddleware } = require('./config/security');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Setup security middleware
setupSecurityMiddleware(app);

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 