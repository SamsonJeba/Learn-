import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { HiX } from 'react-icons/hi';

const grades = ['Std 1', 'Std 2', 'Std 3', 'Std 4', 'Std 5', 'Std 6', 'Std 7', 'Std 8', 'Std 9 (SSLC)', 'Std 10 (SSLC)', 'Std 11 (HSC)', 'Std 12 (HSC)'];
const subjectOptions = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
const curriculumOptions = ['Samacheer Kalvi', 'CBSE', 'Matriculation'];

export default function EnrollmentModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    studentName: '', parentName: '', email: '', phone: '',
    grade: '', curriculum: '', subjects: [], preferredTime: '', message: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSubject = (subj) => {
    setForm(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subj)
        ? prev.subjects.filter(s => s !== subj)
        : [...prev.subjects, subj]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subjects.length) return alert('Please select at least one subject.');
    setSending(true);
    try {
      await axios.post('/api/enrollment', form);
      onSuccess('Enrollment submitted! We will contact you within 24 hours.');
      onClose();
      setForm({ studentName: '', parentName: '', email: '', phone: '', grade: '', curriculum: '', subjects: [], preferredTime: '', message: '' });
    } catch {
      alert('Failed to submit. Please try again.');
    }
    setSending(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} onClick={e => e.stopPropagation()}>
            <div className="modal-top-bar" />
            <button className="modal-close" onClick={onClose}><HiX /></button>
            <h2 className="modal-title">Enroll at <span className="gold-text">Learn+</span></h2>
            <p className="modal-subtitle">Fill in your details and we'll get back to you within 24 hours to schedule your free trial.</p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-row">
                <div className="form-group">
                  <label className="form-label">Student Name *</label>
                  <input className="form-input" name="studentName" value={form.studentName} onChange={handleChange} required placeholder="Student's full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Parent Name *</label>
                  <input className="form-input" name="parentName" value={form.parentName} onChange={handleChange} required placeholder="Parent's full name" />
                </div>
              </div>
              <div className="modal-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="modal-row">
                <div className="form-group">
                  <label className="form-label">Class/Grade *</label>
                  <select className="form-input" name="grade" value={form.grade} onChange={handleChange} required>
                    <option value="">Select class...</option>
                    {grades.map(g => <option key={`gr-${g}`} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Curriculum *</label>
                  <select className="form-input" name="curriculum" value={form.curriculum} onChange={handleChange} required>
                    <option value="">Select curriculum...</option>
                    {curriculumOptions.map(c => <option key={`cu-${c}`} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-row">
                <div className="form-group">
                  <label className="form-label">Subjects *</label>
                  <div className="subject-chips">
                    {subjectOptions.map(s => (
                      <button key={`sub-${s}`} type="button" className={`chip ${form.subjects.includes(s) ? 'chip-active' : ''}`} onClick={() => toggleSubject(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <input className="form-input" type="text" name="preferredTime" value={form.preferredTime} onChange={handleChange} placeholder="e.g. After 4 PM, Weekends" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Message</label>
                <textarea className="form-input form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Any special requirements..." rows={3} />
              </div>
              <button className="btn btn-gold" type="submit" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
                {sending ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        .modal-overlay { position: fixed; inset: 0; background: rgba(6,14,26,0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .modal-content { background: white; border-radius: var(--radius-lg); padding: 40px; max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 30px 80px rgba(0,0,0,0.3); }
        .modal-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--gradient-gold); border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
        .modal-close { position: absolute; top: 18px; right: 18px; background: none; border: none; cursor: pointer; font-size: 1.3rem; color: var(--text-light); padding: 4px; border-radius: 8px; transition: background 0.2s; }
        .modal-close:hover { background: #f1f5f9; }
        .modal-title { font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
        .modal-title .gold-text { background: var(--gradient-heading); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .modal-subtitle { font-size: 0.92rem; color: var(--text-light); margin-bottom: 28px; }
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .modal-form .form-group { display: flex; flex-direction: column; gap: 6px; }
        .modal-form .form-label { font-size: 0.85rem; font-weight: 600; color: var(--text); }
        .modal-form .form-input { padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; color: var(--text); font-size: 0.95rem; font-family: inherit; transition: all 0.3s; outline: none; }
        .modal-form .form-input:focus { border-color: var(--secondary); box-shadow: 0 0 0 3px rgba(212,168,67,0.1); background: white; }
        .modal-form select.form-input option { background: white; color: var(--text); }
        .modal-form .form-textarea { resize: vertical; }
        .subject-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { padding: 8px 18px; border-radius: 100px; border: 2px solid #e2e8f0; background: white; color: var(--text-light); cursor: pointer; font-size: 0.88rem; font-weight: 500; transition: all 0.2s; font-family: inherit; }
        .chip:hover { border-color: var(--secondary); color: var(--secondary-dark); }
        .chip-active { background: var(--gradient-gold); color: var(--primary-dark); border-color: transparent; font-weight: 700; }
        @media (max-width: 640px) { .modal-content { padding: 24px; } .modal-row { grid-template-columns: 1fr; } }
      `}</style>
    </AnimatePresence>
  );
}
