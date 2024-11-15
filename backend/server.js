// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const session = require('express-session');
const xssClean = require('xss-clean');
const ExpressBrute = require('express-brute');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

dotenv.config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/trans');
const adminTransactionRoutes = require('./routes/admin');


// Initialize Express
const app = express();

// Logging for monitoring
app.use(morgan('combined'));

// Security middleware
app.use(helmet()); // Set various HTTP headers for security
app.use(xssClean()); // Sanitize input to prevent XSS attacks
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow cross-origin requests from specific origin
app.use(express.json()); 
app.use(cookieParser()); // Use cookie-parser middleware for cookie management

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  skip: (req) => req.ip === '::1', // Skip rate limiting for localhost (adjust as needed)
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

// Express Brute for additional brute force protection on login
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour
});
app.use('/api/auth/login', bruteforce.prevent);

// Helmet middleware for additional security headers
app.use(helmet.frameguard({ action: 'deny' })); // Prevent clickjacking
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "trusted-images.com"],
      connectSrc: ["'self'", "api.trusted.com"],
      frameAncestors: ["'none'"], 
    },
  })
);

// HTTPS enforcement (only in production)
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); // Only enable this if behind a reverse proxy
  app.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      return next();
    }
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

// HSTS to enforce HTTPS
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year
  includeSubDomains: true,
  preload: true,
}));

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Securely set SESSION_SECRET in your .env file
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    maxAge: 60000, 
  },
}));

// CSRF Protection
//const csrfProtection = csrf({ cookie: true });
//app.use(csrfProtection);

// MongoDB connection (remove deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  // SSL Certificates for HTTPS
const options = {
  key: fs.readFileSync('keys/privateKey.pem'),  // Path to private key
  cert: fs.readFileSync('keys/certificate.pem') // Path to certificate
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminTransactionRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
