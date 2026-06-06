const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  subjects: [String],
  preferredTime: String,
  message: String,
  status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'enrolled', 'closed'] }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
