import React from 'react';

/**
 * ProgressBar Component
 * Visual progress indicator with percentage
 */
const ProgressBar = ({ percentage, label = '', showPercentage = true }) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Determine color based on percentage
  const getColorClass = () => {
    if (clampedPercentage >= 80) return 'bg-healthy';
    if (clampedPercentage >= 60) return 'bg-primary';
    if (clampedPercentage >= 40) return 'bg-yellow-500';
    return 'bg-disease';
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">
              {clampedPercentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div className="progress-bar">
        <div
          className={`progress-fill ${getColorClass()}`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {showPercentage && clampedPercentage > 10 && (
            <span className="text-xs font-bold text-white">
              {clampedPercentage.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
