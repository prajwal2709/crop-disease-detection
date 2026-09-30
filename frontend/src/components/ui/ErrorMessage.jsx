import React from 'react';

/**
 * ErrorMessage Component
 * Display error messages with icon
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border-2 border-disease rounded-xl p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Error Icon */}
        <svg
          className="w-8 h-8 text-disease flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-disease mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-700 text-base mb-4">
            {message || 'Please try again later.'}
          </p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-primary font-semibold hover:underline"
            >
              Try Again →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
