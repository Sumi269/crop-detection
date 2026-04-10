const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

// Helper: Password Complexity Validation
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Helper: Email format validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper: Mobile number validation (+ country code)
const validateMobile = (mobile) => {
  const re = /^\+\d{1,4}\d{7,14}$/;
  return re.test(mobile);
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || (!email && !mobile) || !password) {
      return res.status(400).json({ error: "Name, Password, and either Email or Mobile are required." });
    }

    if (email && !validateEmail(email)) return res.status(400).json({ error: "Invalid email format." });
    if (mobile && !validateMobile(mobile)) return res.status(400).json({ error: "Invalid mobile format. Must include country code (e.g. +91)." });

    // Check if user exists
    const query = [];
    if (email) query.push({ email });
    if (mobile) query.push({ mobile });

    const existingUser = await User.findOne({ $or: query });
    if (existingUser) return res.status(400).json({ error: "User already registered, please login" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();

    // Auto login
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body; // loginId can be email or mobile

    if (!loginId || !password) {
      return res.status(400).json({ error: "Please provide credentials." });
    }

    const user = await User.findOne({ $or: [{ email: loginId }, { mobile: loginId }] });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
