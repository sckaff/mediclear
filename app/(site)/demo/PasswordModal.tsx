import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

interface PasswordModalProps {
  onAuthenticated: () => void; // Callback to notify parent when authenticated
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded password check inside the modal
    if (password === '4cc3ssM3d1cl3@r') {
      onAuthenticated(); // Notify parent component that the user is authenticated
    } else {
      setError('Incorrect password. Please try again.'); // Show error message
    }
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Access Demo</h2>
        <form onSubmit={handlePasswordSubmit} className="relative">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password types
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Clear error when typing
              }}
              className="border border-gray-300 dark:border-gray-600 p-2 mb-4 w-full text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 pr-10"
              placeholder="Enter password"
              required
            />

            {/* Eye Icon for showing/hiding password */}
            <span
              className="absolute top-3 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
              style={{ fontSize: '1.25rem' }} // Increase icon size
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye/eye-slash icon */}
            </span>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error if password is incorrect */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
