import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';

export default function Toast({ message, type = 'success', onClose }) {
  const Icon = type === 'success' ? HiCheckCircle : HiXCircle;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          style={{ background: type === 'success' ? 'linear-gradient(135deg, #065f46, #047857)' : 'linear-gradient(135deg, #991b1b, #b91c1c)' }}
        >
          <Icon className="toast-icon" />
          <span className="toast-message">{message}</span>
          <button className="toast-close" onClick={onClose}><HiX /></button>
        </motion.div>
      )}
      <style>{`
        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 16px 24px; border-radius: 14px; display: flex; align-items: center; gap: 12px; color: white; font-weight: 500; font-size: 0.95rem; z-index: 9999; box-shadow: 0 12px 40px rgba(0,0,0,0.3); min-width: 320px; max-width: 480px; }
        .toast-icon { font-size: 1.4rem; flex-shrink: 0; }
        .toast-message { flex-grow: 1; }
        .toast-close { background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.7); cursor: pointer; padding: 6px; display: flex; font-size: 1rem; border-radius: 8px; transition: all 0.2s; }
        .toast-close:hover { background: rgba(255,255,255,0.2); color: white; }
        @media (max-width: 480px) { .toast { min-width: auto; left: 16px; right: 16px; transform: none; } }
      `}</style>
    </AnimatePresence>
  );
}
