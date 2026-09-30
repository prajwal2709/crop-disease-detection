export default function DetectionStats({ info, confidence }) {
  const getSeverityColor = () => {
    switch (info.severityLevel) {
      case "High":
        return "text-red-600 bg-red-100";

      case "Medium":
        return "text-yellow-600 bg-yellow-100";

      default:
        return "text-green-600 bg-green-100";
    }
  };

  return (
    <div className="mb-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-6">

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
          📊
        </div>

        <div>

          <h2 className="text-3xl font-bold text-blue-700">
            Detection Statistics
          </h2>

          <p className="text-gray-500">
            AI prediction overview
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Confidence */}

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

          <div className="text-4xl mb-4">
            🎯
          </div>

          <p className="text-gray-500 text-sm">
            Accuracy
          </p>

          <h2 className="text-4xl font-bold text-green-700 mt-2">
            {confidence}%
          </h2>

        </div>

        {/* Category */}

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

          <div className="text-4xl mb-4">
            🦠
          </div>

          <p className="text-gray-500 text-sm">
            Disease Type
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-2">

            {info.category}

          </h2>

        </div>

        {/* Severity */}

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <p className="text-gray-500 text-sm">
            Severity
          </p>

          <span
            className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${getSeverityColor()}`}
          >
            {info.severity}
          </span>

        </div>

        {/* Crop Status */}

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

          <div className="text-4xl mb-4">
            🌿
          </div>

          <p className="text-gray-500 text-sm">
            Crop Status
          </p>

          <h2
            className={`text-2xl font-bold mt-2 ${
              info.isHealthy
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {info.isHealthy
              ? "Healthy"
              : "Affected"}
          </h2>

        </div>

      </div>

    </div>
  );
}