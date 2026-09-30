import React from 'react';

/**
 * Card Component
 * Reusable card container for content
 */
const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
