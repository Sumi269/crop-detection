const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image_url: { type: String, required: true },
  crop: { type: String, required: true },
  disease: { type: String, required: true },
  confidence: { type: Number },
  solution: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
