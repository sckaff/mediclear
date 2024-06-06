import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isVisible, onClose, setIsVisible, children }) => {
  // Add a function to handle the close button click
  const handleCloseClick = () => {
    setIsVisible(false); // Call the setIsVisible function to update the state
  };

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
          style={{ zIndex: 10000 }}
        >
          <motion.div
            initial={{ opacity: 0, height: "20vh" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "20vh" }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg relative" // Add relative positioning
            style={{
              width: "600px",
              overflowY: "auto",
              maxHeight: "70vh",
              minHeight: "20vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Add a close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
            >
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;