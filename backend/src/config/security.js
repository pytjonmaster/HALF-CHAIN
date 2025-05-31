  const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Auth rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again after an hour'
});

// CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Security middleware setup
const setupSecurityMiddleware = (app) => {
  // Basic security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Rate limiting
  app.use('/api/', limiter);
  app.use('/api/auth/', authLimiter);

  // CORS
  app.use(cors(corsOptions));
};

module.exports = {
  setupSecurityMiddleware,
  corsOptions
}; 