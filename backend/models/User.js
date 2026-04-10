const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, sparse: true },
  mobile: { type: String, sparse: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

// Ensure at least one contact method exists via a pre hook or validation layer
UserSchema.pre('validate', function(next) {
  if (!this.email && !this.mobile) {
    next(new Error("Either email or mobile must be provided"));
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
