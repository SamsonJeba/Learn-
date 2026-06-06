import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi2';

const faqs = [
  { q: 'Do you teach both Samacheer Kalvi and CBSE curricula?', a: 'Yes! We specialize in both Samacheer Kalvi (State Board) and CBSE curricula. Our teachers are trained in both syllabi and understand the specific requirements of each board.' },
  { q: 'What classes do you teach?', a: 'We teach from Standard 1 all the way through Standard 12. Our programs are structured for Primary (1-5), Middle (6-8), SSLC (9-10), and HSC (11-12) levels.' },
  { q: 'Do you offer Tamil medium instruction?', a: 'Absolutely! We offer both Tamil and English medium instruction. Students can choose the language they are most comfortable with. We believe bilingual learning strengthens conceptual understanding.' },
  { q: 'Is there a free trial class?', a: 'Yes! We offer a free 1-hour demo class with a full assessment. This helps us understand your child\'s current level and recommend the right program. No commitment required.' },
  { q: 'Do you prepare for competitive exams like JEE and NEET?', a: 'Yes, our HSC program includes foundation coaching for JEE Mains, NEET, and other competitive exams. We cover advanced problem-solving techniques and time management strategies.' },
  { q: 'What is the class size and batch schedule?', a: 'We maintain small batches of 6-8 students for personalized attention. Classes are held 3-4 times per week, with weekend batches available. Each session is 1.5 to 2 hours long.' },
  { q: 'How do you track student progress?', a: 'We conduct weekly tests, monthly assessments, and provide detailed progress reports to parents. For board exam students, we organize full-length mock tests every month.' },
  { q: 'What are your fees?', a: 'Our fees vary by class level and subject. Primary starts from Rs.1,500/month, Middle from Rs.2,000/month, SSLC from Rs.2,500/month, and HSC from Rs.3,000/month. We also offer sibling discounts.' }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label"><HiQuestionMarkCircle /> FAQ</div>
          <div className="section-divider" />
          <h2 className="section-title">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p className="section-subtitle">Everything parents and students ask us about Learn+ Academy.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={`faq-${i}`}
              className={`faq-item ${openIndex === i ? 'faq-open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.04 }}
            >
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="faq-q">{faq.q}</span>
                <motion.span
                  className="faq-arrow"
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-list {
          max-width: 740px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          background: white;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.3s;
        }
        .faq-item:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(212,168,67,0.15);
        }
        .faq-open {
          border-color: rgba(212,168,67,0.2);
          box-shadow: 0 4px 20px rgba(212,168,67,0.08);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
          text-align: left;
          font-family: inherit;
          gap: 16px;
        }
        .faq-open .faq-question { color: var(--primary); }
        .faq-q { flex-grow: 1; }
        .faq-arrow {
          color: var(--text-light);
          font-size: 1.2rem;
          flex-shrink: 0;
          display: flex;
          transition: color 0.3s;
        }
        .faq-open .faq-arrow { color: var(--primary); }
        .faq-answer { overflow: hidden; }
        .faq-answer p {
          padding: 0 28px 22px;
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.7;
        }
        @media (max-width: 640px) {
          .faq-question { padding: 16px 20px; font-size: 0.92rem; }
          .faq-answer p { padding: 0 20px 16px; }
        }
      `}</style>
    </section>
  );
}
