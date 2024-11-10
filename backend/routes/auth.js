const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idNumberRegex = /^\d{13,}$/;
const accountNumberRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

// REGISTER a new customer
router.post('/register', async (req, res) => {
  const { name, email, password, idNumber, accountNumber, role } = req.body;

  if (role && role !== 'customer') {
    return res.status(403).json({ msg: 'Only customer registration is allowed' });
  }

  // Validate inputs
  if (!emailRegex.test(email)) return res.status(400).json({ msg: 'Invalid email format' });
  if (!idNumberRegex.test(idNumber)) return res.status(400).json({ msg: 'ID number must be at least 13 digits' });
  if (!accountNumberRegex.test(accountNumber)) return res.status(400).json({ msg: 'Account number must be 10 digits' });
  if (!passwordRegex.test(password)) return res.status(400).json({ msg: 'Password requirements not met' });

  try {
    // Check if user exists
    let user = await User.findOne({ email: email.trim() });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user with customer role
    user = new User({ name, email, password, idNumber, accountNumber, role: 'customer' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: 'Customer registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// LOGIN route for both customers and admins
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) return res.status(400).json({ msg: 'Invalid email format' });

  try {
    const user = await User.findOne({ email: email.trim() });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({
      userId: user.idNumber,
      role: user.role,
      msg: `Login successful as ${user.role}`,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
