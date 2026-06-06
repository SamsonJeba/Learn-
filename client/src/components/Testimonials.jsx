import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { HiStar, HiChevronLeft, HiChevronRight, HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa';

const fallbackTestimonials = [
  { name: 'Priya Karthik', role: 'SSLC Topper - 2025', content: 'Learn+ completely changed my attitude towards Mathematics. I went from failing grades to scoring 98/100 in my SSLC board exams! The teachers here are truly magicians.', rating: 5 },
  { name: 'R. Balasubramanian', role: 'Parent of HSC Student', content: 'My son joined Learn+ for 12th standard Maths and Physics. The personalized attention and regular mock tests helped him clear his board exams with distinction. Worth every rupee!', rating: 5 },
  { name: 'Ananya S.', role: 'HSC Student - 2024', content: 'The JEE foundation program at Learn+ gave me a huge advantage. The shortcut techniques and problem-solving strategies helped me crack both my HSC board and JEE Mains.', rating: 5 },
  { name: 'M. Rajeshwari', role: 'Parent of Std 7 Student', content: 'My daughter used to struggle with basic math concepts. Now she actually enjoys solving problems! The bilingual teaching (Tamil + English) made such a difference.', rating: 5 },
  { name: 'Karthik S.', role: 'CBSE Class 10 Student', content: 'I moved from CBSE to Samacheer and was worried about the transition. Learn+ made it seamless. Scored 95% in my board exams!', rating: 4 }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => { if (res.data.length) setTestimonials(res.data); })
      .catch(() => {});
  }, []);

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section" style={{ background: 'linear-gradient(180deg, #f5f7fa, #ffffff)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiChatBubbleLeftRight /> Testimonials</div>
          <div className="section-divider" />
          <h2 className="section-title">
            What Our <span className="gold-text">Students Say</span>
          </h2>
          <p className="section-subtitle">Real success stories from students and parents across Tamil Nadu.</p>
        </div>

        <div className="testimonials-carousel">
          <button className="test-arrow test-arrow-left" onClick={prev} aria-label="Previous">
            <HiChevronLeft />
          </button>
          <div className="test-card-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="test-card"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
              >
                <div className="test-quote-decor">
                  <FaQuoteLeft className="test-quote-icon" />
                </div>
                <p className="test-content">{t.content}</p>
                <div className="test-stars">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <HiStar key={`s-${i}`} className="test-star" />
                  ))}
                </div>
                <div className="test-divider-line" />
                <div className="test-author">
                  <div className="test-avatar">{t.name.charAt(0)}</div>
                  <div className="test-author-info">
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="test-arrow test-arrow-right" onClick={next} aria-label="Next">
            <HiChevronRight />
          </button>
          <div className="test-dots">
            {testimonials.map((_, i) => (
              <button key={`dot-${i}`} className={`test-dot ${i === current ? 'test-dot-active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Go to testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-carousel { max-width: 720px; margin: 0 auto; position: relative; }
        .test-card-wrapper { min-height: 320px; display: flex; align-items: center; }
        .test-card { text-align: center; padding: 48px 40px; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); width: 100%; position: relative; border: 1px solid rgba(212,168,67,0.08); }
        .test-quote-decor { position: absolute; top: -20px; left: 40px; width: 50px; height: 50px; background: var(--gradient-gold); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(212,168,67,0.3); }
        .test-quote-icon { font-size: 1.2rem; color: var(--primary-dark); }
        .test-content { font-size: 1.1rem; line-height: 1.8; color: var(--text); margin-bottom: 20px; font-style: italic; }
        .test-stars { display: flex; justify-content: center; gap: 4px; margin-bottom: 20px; }
        .test-star { color: var(--secondary); font-size: 1.3rem; }
        .test-divider-line { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, var(--secondary), transparent); margin: 0 auto 20px; }
        .test-author { display: flex; align-items: center; justify-content: center; gap: 14px; }
        .test-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; box-shadow: 0 4px 12px rgba(26,54,93,0.2); }
        .test-author-info { text-align: left; }
        .test-name { font-weight: 700; color: var(--text); font-size: 1rem; }
        .test-role { font-size: 0.82rem; color: var(--text-light); }
        .test-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; border: none; background: white; box-shadow: var(--shadow-md); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--text); transition: all 0.3s; z-index: 2; }
        .test-arrow:hover { background: var(--primary); color: white; box-shadow: var(--shadow-glow-blue); }
        .test-arrow-left { left: -70px; }
        .test-arrow-right { right: -70px; }
        .test-dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
        .test-dot { width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--primary-light); background: transparent; cursor: pointer; transition: all 0.3s; padding: 0; }
        .test-dot-active { background: var(--gradient-gold); border-color: var(--secondary); width: 32px; border-radius: 10px; }
        @media (max-width: 860px) { .test-arrow { display: none; } .test-card { padding: 36px 24px; } .test-quote-decor { left: 24px; } }
      `}</style>
    </section>
  );
}
