import { useNavigate } from "react-router-dom";

export default function HeroSection({
  image,
  info,
  confidence,
}) {
  const navigate = useNavigate();

  const confidenceColor = () => {
    if (confidence >= 85) return "bg-green-600";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const severityColor = () => {
    switch (info.severityLevel) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}

        <div className="flex justify-center">

          <div className="relative">

            {/* Glow */}

            <div className="absolute inset-0 bg-green-300 rounded-full blur-3xl opacity-20"></div>

            <img
              src={image}
              alt="Uploaded Crop"
              className="
                relative
                w-80
                h-80
                object-cover
                rounded-3xl
                border-4
                border-green-100
                shadow-2xl
              "
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          {/* Status */}

          <span
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold ${
              info.isHealthy
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {info.isHealthy
              ? "🌿 Healthy Crop"
              : "⚠ Disease Detected"}
          </span>

          {/* Disease Name */}

          <h1 className="text-5xl font-extrabold text-green-700 mt-6 leading-tight">

            {info.name}

          </h1>

          {/* Category */}

          <div className="mt-4">

            <span className="inline-block px-4 py-2 rounded-xl bg-green-50 text-green-700 font-semibold">

              {info.category}

            </span>

          </div>

          {/* Confidence */}

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span className="text-gray-500 font-medium">

                Prediction Confidence

              </span>

              <span className="font-bold text-lg text-green-700">

                {confidence}%

              </span>

            </div>

            <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

              <div
                className={`h-full ${confidenceColor()} transition-all duration-1000`}
                style={{
                  width: `${Math.min(confidence, 100)}%`,
                }}
              />

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-5 mt-8">

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-sm text-gray-500">

                Severity

              </p>

              <span
                className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold ${severityColor()}`}
              >
                {info.severity}
              </span>

            </div>

            <div className="bg-blue-50 rounded-2xl p-5">

              <p className="text-sm text-gray-500">

                Crop Status

              </p>

              <h3 className="text-xl font-bold mt-3">

                {info.isHealthy
                  ? "Healthy"
                  : "Affected"}

              </h3>

            </div>

          </div>

          {/* Detect Again */}

          <button
            onClick={() => navigate("/")}
            className="
              mt-8
              w-full
              bg-green-600
              hover:bg-green-700
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            🔄 Detect Another Crop
          </button>

        </div>

      </div>

    </div>
  );
}