import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiBookOpen, HiAcademicCap } from 'react-icons/hi2';
import { FaCalculator, FaAtom, FaFlask, FaLeaf } from 'react-icons/fa';

const iconMap = { calculator: FaCalculator, atom: FaAtom, flask: FaFlask, leaf: FaLeaf };

const fallbackSubjects = [
  { name: 'Mathematics', icon: 'calculator', description: 'From basic arithmetic to advanced calculus. Master problem-solving with proven techniques. Special focus on SSLC & HSC board exam preparation.', topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Vectors'], color: '#1a365d', levels: ['Std 1-5', 'Std 6-8', 'Std 9-10', 'Std 11-12'], featured: true },
  { name: 'Physics', icon: 'atom', description: 'Understand the laws of the universe. Concept-based learning with practical demonstrations and numerical problem-solving.', topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics'], color: '#2d5a8e', levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'], featured: false },
  { name: 'Chemistry', icon: 'flask', description: 'Master chemical reactions and equations. Visual learning approach for organic chemistry and periodic table mastery.', topics: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'], color: '#1e4d7a', levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'], featured: false },
  { name: 'Biology', icon: 'leaf', description: 'Explore life sciences from cell biology to ecology. Diagram-based learning with memory techniques for exams.', topics: ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Evolution'], color: '#0f2440', levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'], featured: false }
];

export default function Subjects() {
  const [subjects, setSubjects] = useState(fallbackSubjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/subjects')
      .then(res => { if (res.data.length) setSubjects(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...subjects].sort((a, b) => (a.name === 'Mathematics' ? -1 : b.name === 'Mathematics' ? 1 : 0));

  return (
    <section id="subjects" className="section" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiBookOpen /> Our Subjects</div>
          <div className="section-divider" />
          <h2 className="section-title">
            <span className="gold-text">Mathematics</span> &amp; Sciences
          </h2>
          <p className="section-subtitle">
            Comprehensive coaching for Samacheer Kalvi, CBSE &amp; Matriculation boards. 
            Specialized Mathematics program for Std 1 to Std 12.
          </p>
        </div>

        <div className="subjects-grid">
          {sorted.map((subject, i) => {
            const Icon = iconMap[subject.icon] || HiAcademicCap;
            const isMaths = subject.name === 'Mathematics';
            return (
              <motion.div
                key={`subj-${i}`}
                className={`subject-card ${isMaths ? 'subject-card-featured' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {isMaths && <div className="featured-ribbon">Flagship Program</div>}
                <div className="subject-card-top" style={{ 
                  background: isMaths ? 'linear-gradient(135deg, #1a365d, #2d5a8e)' : `linear-gradient(135deg, ${subject.color}15, ${subject.color}08)`,
                  color: isMaths ? 'white' : 'inherit'
                }}>
                  <div className="subject-icon" style={{ 
                    background: isMaths ? 'var(--gradient-gold)' : subject.color,
                    boxShadow: isMaths ? '0 8px 24px rgba(212,168,67,0.4)' : `0 8px 24px ${subject.color}33`
                  }}>
                    <Icon style={{ color: isMaths ? '#1a365d' : 'white' }} />
                  </div>
                  <h3 className="subject-name" style={{ color: isMaths ? 'white' : 'inherit' }}>{subject.name}</h3>
                  {isMaths && <div className="maths-badge">Specialized</div>}
                </div>
                <div className="subject-card-body">
                  <p className="subject-desc">{subject.description}</p>
                  <div className="subject-tags">
                    {subject.topics?.slice(0, 4).map((t, j) => (
                      <span key={`t-${j}`} className="subject-tag" style={{ 
                        background: isMaths ? 'rgba(212,168,67,0.12)' : `${subject.color}12`,
                        color: isMaths ? '#b8922e' : subject.color 
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="subject-footer">
                    <div className="subject-levels">
                      {subject.levels?.map((l, j) => (
                        <span key={`l-${j}`} className="subject-level-badge">{l}</span>
                      ))}
                    </div>
                    <div className="subject-curriculum">
                      <span className="curriculum-tag">Samacheer</span>
                      <span className="curriculum-tag">CBSE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        .subject-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          position: relative;
        }
        .subject-card:hover { box-shadow: var(--shadow-lg); }
        .subject-card-featured {
          box-shadow: 0 8px 32px rgba(212,168,67,0.15);
          border: 1px solid rgba(212,168,67,0.2);
          transform: scale(1.02);
        }
        .subject-card-featured:hover { transform: scale(1.02) translateY(-8px) !important; }
        .featured-ribbon {
          position: absolute;
          top: 16px;
          right: -32px;
          background: var(--gradient-gold);
          color: var(--primary-dark);
          padding: 4px 40px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transform: rotate(45deg);
          z-index: 2;
          box-shadow: 0 2px 8px rgba(212,168,67,0.3);
        }
        .subject-card-top {
          padding: 36px 28px 24px;
          text-align: center;
          position: relative;
        }
        .subject-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 16px;
          transition: all 0.3s;
        }
        .subject-card:hover .subject-icon { transform: scale(1.1) rotate(-5deg); }
        .subject-name {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .maths-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: var(--secondary-light);
          padding: 2px 14px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }
        .subject-card-body { padding: 0 28px 28px; }
        .subject-desc {
          font-size: 0.88rem;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .subject-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .subject-tag {
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 100px;
          font-weight: 600;
        }
        .subject-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }
        .subject-levels {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .subject-level-badge {
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 100px;
          background: #f1f5f9;
          color: var(--text-light);
          font-weight: 600;
        }
        .subject-curriculum {
          display: flex;
          gap: 4px;
        }
        .curriculum-tag {
          font-size: 0.65rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(212,168,67,0.1);
          color: var(--secondary-dark);
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .subjects-grid { grid-template-columns: 1fr; }
          .subject-card-featured { transform: none; }
          .subject-card-featured:hover { transform: translateY(-8px) !important; }
        }
      `}</style>
    </section>
  );
}
