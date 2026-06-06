import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-gold-bar" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <HiAcademicCap />
                <span className="footer-logo-plus">+</span>
              </div>
              <div>
                <span className="footer-logo-text">Learn<span className="gold">+</span></span>
                <span className="footer-logo-tag">Maths &amp; Science Academy</span>
              </div>
            </div>
            <p className="footer-desc">
              Tamil Nadu's premier tuition centre for Mathematics and Science, founded and led by <strong style={{color:'rgba(212,168,67,0.9)'}}>Caleb Messiah</strong>. Empowering students from Std 1 to Std 12 with excellence in education since 2010.
            </p>
            <div className="footer-social">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <a key={`soc-${i}`} href="#" className="footer-social-link" aria-label={`Social link ${i + 1}`}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <a href="#home" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About Us</a>
            <a href="#subjects" className="footer-link">Subjects</a>
            <a href="#levels" className="footer-link">Programs</a>
            <a href="#testimonials" className="footer-link">Testimonials</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Programs</h4>
            <a href="#levels" className="footer-link">Primary (Std 1-5)</a>
            <a href="#levels" className="footer-link">Middle (Std 6-8)</a>
            <a href="#levels" className="footer-link">SSLC (Std 9-10)</a>
            <a href="#levels" className="footer-link">HSC (Std 11-12)</a>
            <a href="#levels" className="footer-link">JEE/NEET Foundation</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-link footer-link-static">12, North Usman Road</div>
            <div className="footer-link footer-link-static">T. Nagar, Chennai - 600017</div>
            <div className="footer-link footer-link-static">Tamil Nadu, India</div>
            <a href="tel:+919999999999" className="footer-link">+91 99999 99999</a>
            <a href="mailto:info@learnplus.in" className="footer-link">info@learnplus.in</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Learn+ Maths &amp; Science Academy. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer { background: #060e1a; color: rgba(255,255,255,0.6); padding: 80px 0 0; position: relative; }
        .footer-gold-bar { height: 4px; background: var(--gradient-gold); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .footer-logo-icon { width: 44px; height: 44px; background: var(--gradient-gold); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: var(--primary-dark); position: relative; }
        .footer-logo-plus { position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; background: var(--primary); border: 2px solid var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 800; color: var(--secondary-light); }
        .footer-logo-text { font-size: 1.4rem; font-weight: 800; color: white; }
        .gold { color: var(--secondary); }
        .footer-logo-tag { display: block; font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px; }
        .footer-desc { font-size: 0.88rem; line-height: 1.8; margin-bottom: 24px; max-width: 340px; }
        .footer-social { display: flex; gap: 10px; }
        .footer-social-link { width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); font-size: 0.9rem; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.05); }
        .footer-social-link:hover { background: var(--gradient-gold); color: var(--primary-dark); transform: translateY(-3px); border-color: transparent; }
        .footer-heading { font-size: 1rem; font-weight: 700; color: white; margin-bottom: 20px; position: relative; padding-bottom: 10px; }
        .footer-heading::after { content: ''; position: absolute; bottom: 0; left: 0; width: 30px; height: 2px; background: var(--gradient-gold); }
        .footer-link { display: block; font-size: 0.88rem; color: rgba(255,255,255,0.5); margin-bottom: 12px; transition: all 0.3s; }
        .footer-link:hover { color: var(--secondary-light); padding-left: 4px; }
        .footer-link-static { cursor: default; }
        .footer-link-static:hover { color: rgba(255,255,255,0.5); padding-left: 0; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; font-size: 0.82rem; color: rgba(255,255,255,0.3); }
        .footer-bottom-links { display: flex; gap: 24px; }
        .footer-bottom-links a:hover { color: var(--secondary-light); }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } .footer-col:first-child { grid-column: 1 / -1; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; gap: 8px; text-align: center; } }
      `}</style>
    </footer>
  );
}
