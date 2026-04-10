const express = require('express');
const User = require('../models/User');
const History = require('../models/History');
const Alert = require('../models/Alert');
const { adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// 1. Dashboard Analytics
router.get('/analytics', adminMiddleware, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const uploadCount = await History.countDocuments();
    
    // Aggregate for common disease
    const diseaseStats = await History.aggregate([
        { $group: { _id: "$disease", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 3 }
    ]);

    res.json({ userCount, uploadCount, diseaseStats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. User Management
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Detection Monitoring
router.get('/detections', adminMiddleware, async (req, res) => {
  try {
    const history = await History.find().populate('user_id', 'name email').sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Alert Management
router.get('/alerts', async (req, res) => {
    try {
      const alerts = await Alert.find();
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.post('/alerts', adminMiddleware, async (req, res) => {
    try {
      const { location, alert_type, message, solution } = req.body;
      const newAlert = new Alert({ location, alert_type, message, solution });
      await newAlert.save();
      res.json(newAlert);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.delete('/alerts/:id', adminMiddleware, async (req, res) => {
    try {
      await Alert.findByIdAndDelete(req.params.id);
      res.json({ message: "Alert deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
