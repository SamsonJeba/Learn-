import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { HiAcademicCap, HiUserGroup, HiStar, HiTrophy } from 'react-icons/hi2';

const stats = [
  { icon: HiAcademicCap, value: 5000, suffix: '+', label: 'Students Taught' },
  { icon: HiTrophy, value: 99, suffix: '%', label: 'Success Rate' },
  { icon: HiUserGroup, value: 500, suffix: '+', label: 'Schools Served' },
  { icon: HiStar, value: 15, suffix: '+', label: 'Years Legacy' }
];

function useCountUp(target, duration = 2500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function MathParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const mathSymbols = ['\u03C0', '\u03A3', '\u221A', '\u221E', '\u222B', '\u0394', '\u03B1', '\u2248'];
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      size: Math.random() * 20 + 14,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.1 + 0.02,
      rotation: Math.random() * 360
    }));

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += 0.08;
        if (p.x < -50 || p.x > canvas.width + 50) p.speedX *= -1;
        if (p.y < -50 || p.y > canvas.height + 50) p.speedY *= -1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity})`;
        ctx.font = `bold ${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" />;
}

function StatItem({ icon: Icon, value, suffix, label }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="stat-item">
      <Icon className="stat-icon" />
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Hero({ onEnroll }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-pattern" />
      <MathParticles />
      <div className="hero-overlay" />
      <div className="hero-content container">
        <motion.div className="hero-text" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <span className="badge-dot" /> Mathematics Specialists
            <span className="badge-gold">Since 2010</span>
          </motion.div>

          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            Master Mathematics
            <br />
            <span className="hero-gradient-text">Excel in Science</span>
          </motion.h1>

          <motion.p className="hero-desc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            Tamil Nadu's premier tuition centre for Mathematics &amp; Science, led by{' '}
            <strong style={{ color: 'var(--secondary-light)' }}>Caleb Messiah</strong>.{' '}
            Samacheer Kalvi &amp; CBSE curriculum | Classes 1 to 12 | SSLC &amp; HSC Specialists
          </motion.p>

          <motion.div className="hero-tags" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            {['Samacheer Kalvi', 'CBSE', 'Matriculation', 'Std 1-12'].map((tag, i) => (
              <span key={`tag-${i}`} className="hero-tag">{tag}</span>
            ))}
          </motion.div>

          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
            <button className="btn btn-gold" onClick={onEnroll}>
              Book Free Trial
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#about" className="btn btn-outline">Explore Programs</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-stats" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          {stats.map((stat, i) => (
            <StatItem key={`stat-${i}`} {...stat} />
          ))}
        </motion.div>
      </div>

      <motion.a href="#about" className="scroll-indicator" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <HiChevronDown size={24} />
      </motion.a>

      <style>{`
        .hero-section { min-height: 100vh; background: var(--gradient-hero); position: relative; display: flex; align-items: center; overflow: hidden; }
        .hero-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 25% 25%, rgba(212,168,67,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212,168,67,0.03) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(26,54,93,0.2) 0%, transparent 60%); z-index: 1; }
        .hero-particles { position: absolute; inset: 0; z-index: 1; }
        .hero-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 60%); z-index: 2; }
        .hero-content { position: relative; z-index: 3; width: 100%; padding-top: 100px; text-align: center; }
        .hero-text { max-width: 800px; text-align: center; margin: 0 auto; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(212,168,67,0.12); border: 1px solid rgba(212,168,67,0.25); padding: 10px 22px; border-radius: 100px; font-size: 0.85rem; color: var(--secondary-light); font-weight: 600; margin-bottom: 28px; flex-wrap: wrap; margin-left: auto; margin-right: auto; }
        .badge-dot { width: 8px; height: 8px; background: var(--secondary); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        .badge-gold { background: var(--gradient-gold); color: var(--primary-dark); padding: 2px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .hero-title { font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 900; line-height: 1.08; color: white; margin-bottom: 20px; letter-spacing: -1px; }
        .hero-gradient-text { background: var(--gradient-heading); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-desc { font-size: 1.15rem; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 24px; max-width: 620px; margin-left: auto; margin-right: auto; }
        .hero-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; justify-content: center; }
        .hero-tag { padding: 6px 16px; border-radius: 100px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); font-size: 0.82rem; font-weight: 500; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .hero-stats { display: flex; gap: 50px; margin-top: 80px; padding: 36px 0 0; border-top: 1px solid rgba(212,168,67,0.12); flex-wrap: wrap; justify-content: center; }
        .stat-item { text-align: center; min-width: 130px; }
        .stat-icon { font-size: 1.4rem; color: var(--secondary); margin-bottom: 8px; }
        .stat-number { font-size: 2rem; font-weight: 800; color: white; letter-spacing: -0.5px; }
        .stat-label { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 4px; }
        .scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: rgba(212,168,67,0.4); z-index: 3; cursor: pointer; transition: color 0.3s; }
        .scroll-indicator:hover { color: var(--secondary); }
        @media (max-width: 768px) { .hero-stats { gap: 24px; justify-content: center; margin-top: 50px; } .stat-item { min-width: 100px; } .stat-number { font-size: 1.5rem; } .hero-buttons { flex-direction: column; align-items: center; } .hero-buttons .btn { width: 100%; justify-content: center; } .hero-content { padding-top: 80px; } }
      `}</style>
    </section>
  );
}
