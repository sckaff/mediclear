import React, { useState } from 'react';

const PasswordModal = ({ onSubmit }: { onSubmit: (password: string) => void }) => {
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password); // Send password to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Access Demo</h2>
        <form onSubmit={handlePasswordSubmit}>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 mb-4 w-full text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter password"
            required
        />
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