const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  location: { type: String, required: true },
  alert_type: { type: String, required: true },
  message: { type: String, required: true },
  solution: { type: String, required: true }
});

module.exports = mongoose.model('Alert', AlertSchema);
