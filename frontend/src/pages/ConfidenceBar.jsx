// ConfidenceBar.jsx
export const ConfidenceBar = ({ confidence }) => {
  const getColor = (val) => {
    if (val >= 90) return "bg-green-600"; // High
    if (val >= 70) return "bg-yellow-500"; // Medium
    return "bg-red-500"; // Low
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ${getColor(confidence)}`}
        style={{ width: `${confidence}%` }}
      />
    </div>
  );
};