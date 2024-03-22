import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignUpModal = ({ result, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-[10px] left-[10px] mr-[10px] transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl ${
            result === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          <div className="max-w-xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }}
            >
              {result === 'success'
                ? 'Success! You\'re in. Exclusive updates and early access await. Stay tuned!'
                : 'Sign up failed. Please try again later.'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;