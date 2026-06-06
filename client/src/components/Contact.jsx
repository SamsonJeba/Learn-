import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiPhone, HiEnvelope, HiMapPin, HiClock, HiPaperAirplane } from 'react-icons/hi2';

export default function Contact({ onEnroll }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post('/api/contact', form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert('Failed to send. Please try again or call us directly.');
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section section-dark">
      <div className="section-pattern" />
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiEnvelope /> Get In Touch</div>
          <div className="section-divider" />
          <h2 className="section-title">
            Start Your <span className="gold-text">Learning Journey</span>
          </h2>
          <p className="section-subtitle">Visit us or reach out. We'd love to discuss how we can help your child excel.</p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <HiPhone />
              </div>
              <div>
                <div className="contact-info-label">Phone / WhatsApp</div>
                <a href="tel:+919999999999" className="contact-info-value">+91 99999 99999</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <HiEnvelope />
              </div>
              <div>
                <div className="contact-info-label">Email</div>
                <a href="mailto:info@learnplus.in" className="contact-info-value">info@learnplus.in</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <HiMapPin />
              </div>
              <div>
                <div className="contact-info-label">Address</div>
                <div className="contact-info-value">12, North Usman Road,<br />T. Nagar, Chennai - 600017<br />Tamil Nadu</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <HiClock />
              </div>
              <div>
                <div className="contact-info-label">Hours</div>
                <div className="contact-info-value">Mon-Sat: 9:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 1:00 PM</div>
              </div>
            </div>

            <div className="contact-cta-card">
              <div className="cta-card-gold" />
              <h4>Free Trial Class!</h4>
              <p>Book a free 1-hour demo class and assessment for your child. No commitment.</p>
              <button className="btn btn-gold" onClick={onEnroll} style={{ width: '100%', justifyContent: 'center' }}>
                Book Free Trial
              </button>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="form-heading">Send us a Message</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input" name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select subject...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea className="form-input form-textarea" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us about your learning needs..." rows={4} />
            </div>
            <button className="btn btn-gold" type="submit" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
              {sending ? 'Sending...' : sent ? (
                <>Sent! We'll call you back <HiPaperAirplane style={{ transform: 'rotate(45deg)' }} /></>
              ) : (
                <>Send Message <HiPaperAirplane style={{ transform: 'rotate(45deg)' }} /></>
              )}
            </button>
          </motion.form>
        </div>
      </div>

      <style>{`
        .section-pattern { position: absolute; inset: 0; background-image: radial-gradient(rgba(212,168,67,0.03) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start; position: relative; z-index: 1; }
        .contact-info { display: flex; flex-direction: column; gap: 24px; }
        .contact-info-item { display: flex; align-items: center; gap: 16px; }
        .contact-info-icon { width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; border: 1px solid rgba(212,168,67,0.2); background: rgba(212,168,67,0.15); color: var(--secondary-light); }
        .contact-info-label { font-size: 0.78rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 2px; }
        .contact-info-value { font-size: 1rem; color: rgba(255,255,255,0.9); font-weight: 500; line-height: 1.5; }
        .contact-info-value:hover { color: var(--secondary-light); }
        .contact-cta-card { background: rgba(10,22,40,0.6); border: 1px solid rgba(212,168,67,0.2); border-radius: var(--radius-md); padding: 28px; margin-top: 20px; position: relative; overflow: hidden; }
        .cta-card-gold { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gradient-gold); }
        .contact-cta-card h4 { font-size: 1.15rem; color: var(--secondary); margin-bottom: 8px; font-weight: 700; }
        .contact-cta-card p { font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 18px; line-height: 1.6; }
        .contact-form { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 36px; display: flex; flex-direction: column; gap: 20px; }
        .form-heading { font-size: 1.3rem; font-weight: 700; color: white; margin-bottom: 4px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.7); }
        .form-input { padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: white; font-size: 0.95rem; font-family: inherit; transition: all 0.3s; outline: none; }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus { border-color: var(--secondary); box-shadow: 0 0 0 3px rgba(212,168,67,0.1); background: rgba(255,255,255,0.06); }
        .form-textarea { resize: vertical; min-height: 110px; }
        select.form-input option { background: #0a1628; color: white; }
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .contact-form { padding: 24px; } }
      `}</style>
    </section>
  );
}
