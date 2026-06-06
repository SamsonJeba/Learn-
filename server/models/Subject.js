const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: 'book' },
  description: { type: String, required: true },
  topics: [String],
  color: { type: String, default: '#4f46e5' },
  levels: [String],
  image: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
