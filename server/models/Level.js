const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: 'school' },
  description: { type: String, required: true },
  features: [String],
  price: { type: String, default: 'Contact us' },
  color: { type: String, default: '#4f46e5' },
  popular: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Level', levelSchema);
