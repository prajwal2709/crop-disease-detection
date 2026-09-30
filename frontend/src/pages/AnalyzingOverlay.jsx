export const AnalyzingOverlay = ({ status }) => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <h3 className="text-xl font-semibold text-green-800">
      {status || "Analyzing..."}
    </h3>
  </div>
);