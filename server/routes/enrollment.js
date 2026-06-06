const router = require('express').Router();
const Enrollment = require('../models/Enrollment');
const { sendTrialBookingNotification } = require('../emailService');

router.post('/', async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    
    // Send email notification (non-blocking - won't slow the response)
    sendTrialBookingNotification(req.body).then(result => {
      console.log('Trial booking email result:', result.success ? 'Sent' : 'Failed');
    });
    
    res.status(201).json({ 
      message: 'Enrollment submitted successfully! We will contact you soon.', 
      enrollment
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
