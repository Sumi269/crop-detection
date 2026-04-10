const express = require('express');
const History = require('../models/History');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const history = await History.find({ user_id: req.user.id }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await History.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    res.json({ message: "History item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
