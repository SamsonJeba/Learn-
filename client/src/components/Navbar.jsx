import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiAcademicCap } from 'react-icons/hi2';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Programs', href: '#levels' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar({ onEnroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-inner container">
        <a href="#home" className="navbar-logo">
          <div className="logo-icon">
            <HiAcademicCap className="logo-cap" />
            <span className="logo-plus-badge">+</span>
          </div>
          <div className="logo-text-group">
            <span className="logo-text">Learn<span className="logo-accent">+</span></span>
            <span className="logo-tagline">Maths &amp; Science Academy</span>
          </div>
        </a>

        <div className="navbar-desktop">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
              <span className="nav-link-underline" />
            </a>
          ))}
          <button className="btn btn-gold" onClick={onEnroll} style={{ padding: '12px 28px', fontSize: '0.88rem' }}>
            Enroll Now
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-links">
              {navLinks.map((link, i) => (
                <motion.a
                  key={`nav-m-${i}`}
                  href={link.href}
                  className="mobile-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="btn btn-gold mobile-enroll"
                onClick={() => { setMenuOpen(false); onEnroll(); }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Enroll Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 20px 0; transition: all 0.4s ease; background: transparent; }
        .navbar-scrolled { background: rgba(10,22,40,0.95); backdrop-filter: blur(24px); padding: 12px 0; box-shadow: 0 4px 30px rgba(0,0,0,0.3); border-bottom: 1px solid rgba(212,168,67,0.1); }
        .navbar-inner { display: flex; align-items: center; justify-content: space-between; }
        .navbar-logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 44px; height: 44px; background: var(--gradient-gold); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--primary-dark); position: relative; }
        .logo-cap { font-size: 1.3rem; }
        .logo-plus-badge { position: absolute; top: -6px; right: -6px; width: 18px; height: 18px; background: var(--primary); border: 2px solid var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: var(--secondary-light); }
        .logo-text-group { display: flex; flex-direction: column; }
        .logo-text { font-size: 1.4rem; font-weight: 800; color: white; line-height: 1.2; }
        .logo-accent { color: var(--secondary); }
        .logo-tagline { font-size: 0.65rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 2px; font-weight: 500; }
        .navbar-desktop { display: flex; align-items: center; gap: 36px; }
        .nav-link { color: rgba(255,255,255,0.75); font-size: 0.92rem; font-weight: 500; position: relative; padding: 4px 0; transition: color 0.3s; }
        .nav-link:hover { color: var(--secondary-light); }
        .nav-link-underline { position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: var(--gradient-gold); transition: width 0.3s ease; border-radius: 2px; }
        .nav-link:hover .nav-link-underline { width: 100%; }
        .hamburger { display: none; background: none; border: none; color: white; cursor: pointer; padding: 8px; z-index: 1001; }
        .mobile-menu { overflow: hidden; background: rgba(10,22,40,0.98); backdrop-filter: blur(24px); position: absolute; top: 100%; left: 0; right: 0; border-bottom: 1px solid rgba(212,168,67,0.15); }
        .mobile-menu-links { display: flex; flex-direction: column; padding: 16px 24px 32px; gap: 8px; }
        .mobile-link { color: rgba(255,255,255,0.75); font-size: 1.05rem; font-weight: 500; padding: 14px 18px; border-radius: 12px; transition: all 0.2s; border-left: 3px solid transparent; }
        .mobile-link:hover { background: rgba(212,168,67,0.08); color: var(--secondary-light); border-left-color: var(--secondary); }
        .mobile-enroll { margin-top: 16px; justify-content: center; width: 100%; }
        @media (max-width: 768px) { .navbar-desktop { display: none; } .hamburger { display: flex; } .navbar { padding: 14px 0; } .navbar-scrolled { padding: 8px 0; } }
      `}</style>
    </motion.nav>
  );
}
