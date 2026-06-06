import { motion } from 'framer-motion';
import { HiAcademicCap, HiUserGroup, HiChartBar, HiHeart, HiLightBulb, HiTrophy } from 'react-icons/hi2';

const features = [
  { icon: HiAcademicCap, title: 'Expert TN Teachers', desc: 'Qualified educators with deep knowledge of Samacheer & CBSE curriculum.' },
  { icon: HiUserGroup, title: 'Small Batches', desc: 'Maximum 8 students per class for individual attention and doubt clearance.' },
  { icon: HiChartBar, title: 'Proven Results', desc: '99% of our students achieve A+ grades in board exams year after year.' },
  { icon: HiHeart, title: 'Tamil-Friendly', desc: 'Bilingual teaching in Tamil & English for better conceptual understanding.' },
  { icon: HiLightBulb, title: 'Smart Methods', desc: 'Visual learning, shortcut techniques, and problem-solving strategies.' },
  { icon: HiTrophy, title: 'Board Exam Prep', desc: 'Specialized coaching for SSLC, HSC, and competitive exams.' }
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiHeart /> Why Learn+</div>
          <div className="section-divider" />
          <h2 className="section-title">
            Tamil Nadu's Trusted <span className="gold-text">Maths Academy</span>
          </h2>
          <p className="section-subtitle">
            For over 15 years, we've been helping students across Tamil Nadu master Mathematics and Science
            with a proven teaching methodology that delivers exceptional results.
          </p>
        </div>

        <div className="about-grid">
          {features.map((feat, i) => (
            <motion.div
              key={`feat-${i}`}
              className="about-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="about-card-icon">
                <feat.icon />
              </div>
              <h3 className="about-card-title">{feat.title}</h3>
              <p className="about-card-desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="about-stats-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="stat-block">
            <div className="stat-block-number">15+</div>
            <div className="stat-block-label">Years in Tamil Nadu</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <div className="stat-block-number">50+</div>
            <div className="stat-block-label">Tamil Nadu Districts</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <div className="stat-block-number">50K+</div>
            <div className="stat-block-label">Board Toppers</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <div className="stat-block-number">#1</div>
            <div className="stat-block-label">Maths Tuition in TN</div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; }
        .about-card { background: var(--bg-card); border-radius: var(--radius-md); padding: 36px 32px; box-shadow: var(--shadow-sm); border: 1px solid rgba(26,54,93,0.04); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .about-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gradient-gold); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
        .about-card:hover::before { transform: scaleX(1); }
        .about-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
        .about-card-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: white; margin-bottom: 20px; background: linear-gradient(135deg, var(--primary), var(--primary-light)); box-shadow: 0 6px 20px rgba(26,54,93,0.2); }
        .about-card-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--text); }
        .about-card-desc { font-size: 0.92rem; color: var(--text-light); line-height: 1.7; }
        .about-stats-row { display: flex; align-items: center; justify-content: center; gap: 40px; margin-top: 80px; padding: 40px; background: linear-gradient(135deg, var(--primary-dark), var(--primary)); border-radius: var(--radius-lg); flex-wrap: wrap; }
        .stat-block { text-align: center; min-width: 120px; }
        .stat-block-number { font-size: 2.4rem; font-weight: 900; color: var(--secondary); letter-spacing: -1px; }
        .stat-block-label { font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 4px; font-weight: 500; }
        .stat-divider { width: 1px; height: 50px; background: rgba(255,255,255,0.15); }
        @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr; } .about-stats-row { gap: 20px; padding: 24px 16px; } .stat-divider { display: none; } .stat-block { min-width: 80px; } .stat-block-number { font-size: 1.8rem; } }
      `}</style>
    </section>
  );
}
