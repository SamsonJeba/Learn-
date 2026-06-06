import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Subjects from './components/Subjects';
import Levels from './components/Levels';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import EnrollmentModal from './components/EnrollmentModal';
import Toast from './components/Toast';

function App() {
  const [loading, setLoading] = useState(true);
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="loader-logo">Learn+</div>
          <div className="loader-bar">
            <div className="loader-bar-fill" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <div className="app">
        <Navbar onEnroll={() => setEnrollmentOpen(true)} />
        <main>
          <Hero onEnroll={() => setEnrollmentOpen(true)} />
          <About />
          <Subjects />
          <Levels onEnroll={() => setEnrollmentOpen(true)} />
          <Testimonials />
          <Contact onEnroll={() => setEnrollmentOpen(true)} />
          <FAQ />
        </main>
        <Footer />
        <EnrollmentModal
          isOpen={enrollmentOpen}
          onClose={() => setEnrollmentOpen(false)}
          onSuccess={(msg) => showToast(msg)}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </AnimatePresence>
  );
}

export default App;
