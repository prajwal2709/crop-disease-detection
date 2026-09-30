import React from 'react';

/**
 * Loader Component
 * Loading spinner with optional message
 */
const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="spinner"></div>
      <p className="text-lg text-gray-600 font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;
