import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiCheck, HiAcademicCap } from 'react-icons/hi2';
import { GiBookshelf, GiMaterialsScience, GiGraduateCap } from 'react-icons/gi';

const fallbackLevels = [
  { name: 'Primary (Std 1-5)', icon: 'bookshelf', description: 'Build strong foundations in Mathematics with fun, interactive learning methods tailored for young minds.', features: ['Fun visual learning methods', 'Tamil & English medium', 'Basic arithmetic mastery', 'Tables & speed math practice', 'Regular parent updates', 'Confidence building activities'], price: 'Starting from \u20B91,500/month', color: '#2d5a8e', popular: false, order: 1 },
  { name: 'Middle (Std 6-8)', icon: 'science', description: 'Strengthen conceptual understanding and problem-solving skills across all Math & Science subjects.', features: ['Concept-based learning approach', 'Problem-solving techniques', 'Weekly practice tests', 'Doubt clearance sessions', 'Progress reports to parents', 'Science practical demos'], price: 'Starting from \u20B92,000/month', color: '#1a365d', popular: true, order: 2 },
  { name: 'SSLC (Std 9-10)', icon: 'graduate', description: 'Comprehensive SSLC board exam preparation with past paper practice and time management strategies.', features: ['Board exam focused curriculum', 'Past 10 years paper practice', 'Chapter-wise revision program', 'Mock tests every month', 'Answer writing techniques', 'Individual weak-area focus'], price: 'Starting from \u20B92,500/month', color: '#0f2440', popular: false, order: 3 },
  { name: 'HSC (Std 11-12)', icon: 'graduate', description: 'Advanced preparation for HSC board exams and competitive exams (JEE/NEET) with college entrance guidance.', features: ['Advanced syllabus coverage', 'JEE/NEET foundation prep', 'HSC board specialization', 'Weekly full-length tests', 'Weekend doubt classes', 'Career counseling sessions'], price: 'Starting from \u20B93,000/month', color: '#d4a843', popular: false, order: 4 }
];

export default function Levels({ onEnroll }) {
  const [levels, setLevels] = useState(fallbackLevels);

  useEffect(() => {
    axios.get('/api/levels')
      .then(res => { if (res.data.length) setLevels(res.data); })
      .catch(() => {});
  }, []);

  const iconMap = { bookshelf: GiBookshelf, science: GiMaterialsScience, graduate: GiGraduateCap };

  return (
    <section id="levels" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiAcademicCap /> Our Programs</div>
          <div className="section-divider" />
          <h2 className="section-title">
            Complete <span className="gold-text">Academic Journey</span>
          </h2>
          <p className="section-subtitle">
            Structured programs for every class from Std 1 to Std 12. Samacheer Kalvi, CBSE &amp; Matriculation boards covered.
          </p>
        </div>

        <div className="levels-grid">
          {levels.map((level, i) => {
            const Icon = iconMap[level.icon] || GiBookshelf;
            return (
              <motion.div
                key={`lv-${i}`}
                className={`level-card ${level.popular ? 'level-popular' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {level.popular && <div className="level-badge">Most Popular</div>}
                <div className="level-icon-wrap" style={{ background: `linear-gradient(135deg, ${level.color}33, ${level.color}11)`, borderColor: level.color }}>
                  <Icon style={{ color: level.color, fontSize: '1.5rem' }} />
                </div>
                <h3 className="level-name">{level.name}</h3>
                <p className="level-desc">{level.description}</p>
                <div className="level-curriculum-tags">
                  <span className="level-curr-tag">Samacheer</span>
                  <span className="level-curr-tag">CBSE</span>
                  <span className="level-curr-tag">Matric</span>
                </div>
                <div className="level-price">{level.price}</div>
                <ul className="level-features">
                  {level.features.map((f, j) => (
                    <li key={`f-${j}`} className="level-feature">
                      <HiCheck className="level-check" style={{ color: 'var(--secondary)' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`btn ${level.popular ? 'btn-gold' : 'btn-outline'}`} onClick={onEnroll} style={{ width: '100%', justifyContent: 'center' }}>
                  Enroll Now
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .levels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; align-items: start; }
        .level-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 36px 28px; position: relative; transition: all 0.3s ease; display: flex; flex-direction: column; }
        .level-popular { background: rgba(212,168,67,0.06); border-color: rgba(212,168,67,0.2); transform: scale(1.03); }
        .level-popular:hover { transform: scale(1.03) translateY(-8px) !important; }
        .level-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--gradient-gold); color: var(--primary-dark); padding: 6px 22px; border-radius: 100px; font-size: 0.78rem; font-weight: 700; white-space: nowrap; box-shadow: 0 4px 15px rgba(212,168,67,0.3); }
        .level-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid; }
        .level-name { font-size: 1.3rem; font-weight: 800; margin-bottom: 10px; color: white; }
        .level-desc { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 16px; }
        .level-curriculum-tags { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
        .level-curr-tag { font-size: 0.7rem; padding: 3px 10px; border-radius: 6px; background: rgba(212,168,67,0.1); color: var(--secondary-light); font-weight: 600; }
        .level-price { font-size: 1.6rem; font-weight: 800; color: var(--secondary); margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .level-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; flex-grow: 1; }
        .level-feature { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: rgba(255,255,255,0.75); }
        .level-check { font-size: 1.1rem; flex-shrink: 0; }
        @media (max-width: 768px) { .level-popular { transform: none; } .level-popular:hover { transform: translateY(-8px) !important; } }
      `}</style>
    </section>
  );
}
