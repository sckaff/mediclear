import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isVisible, onClose, children }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => onClose()}
          style={{ zIndex: 10000 }} // High z-index for overlay
        >
            <motion.div
            initial={{ opacity: 0, height: "20vh" }} // Start from lower opacity and smaller height
            animate={{ opacity: 1, height: "auto" }} // Animate to full opacity and desired height
            exit={{ opacity: 0, height: "20vh" }} // Exit animation to lower opacity and smaller height
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
            style={{ 
                width: "600px", 
                overflowY: "auto",
                maxHeight: "70vh", // Maximum height
                minHeight: "40vh", // Minimum height
              }}
            onClick={e => e.stopPropagation()} // Prevent click from propagating to overlay
            >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;