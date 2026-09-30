export default function DiagnosisSummary({ info }) {
  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
          📋
        </div>

        <div>

          <h2 className="text-3xl font-bold text-green-700">
            Diagnosis Summary
          </h2>

          <p className="text-gray-500">
            AI generated diagnosis report
          </p>

        </div>

      </div>

      {/* Summary Table */}

      <div className="overflow-hidden rounded-2xl border border-gray-200">

        {/* Crop Status */}

        <div className="grid grid-cols-12 border-b">

          <div className="col-span-4 bg-gray-50 p-5 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
              🌱
            </div>

            <span className="font-semibold text-lg">
              Crop Status
            </span>

          </div>

          <div className="col-span-8 p-5 flex items-center">

            <span
              className={`px-5 py-2 rounded-full font-semibold ${
                info.isHealthy
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {info.isHealthy
                ? "Healthy"
                : "Disease Detected"}
            </span>

          </div>

        </div>

        {/* Disease */}

        <div className="grid grid-cols-12 border-b">

          <div className="col-span-4 bg-gray-50 p-5 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              🦠
            </div>

            <span className="font-semibold text-lg">
              Disease
            </span>

          </div>

          <div className="col-span-8 p-5">

            <h3
              className={`text-xl font-bold ${
                info.isHealthy
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {info.name}
            </h3>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

              {info.category}

            </span>

          </div>

        </div>

        {/* Cause */}

        <div className="grid grid-cols-12 border-b">

          <div className="col-span-4 bg-gray-50 p-5 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              🧬
            </div>

            <span className="font-semibold text-lg">
              Cause
            </span>

          </div>

          <div className="col-span-8 p-5 text-gray-700 leading-8">

            {info.cause}

          </div>

        </div>

        {/* AI Observation */}

        <div className="grid grid-cols-12 border-b">

          <div className="col-span-4 bg-gray-50 p-5 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
              🤖
            </div>

            <span className="font-semibold text-lg">
              AI Observation
            </span>

          </div>

          <div className="col-span-8 p-5 text-gray-700 leading-8">

            {info.observation}

          </div>

        </div>

        {/* Recommendation */}

        <div className="grid grid-cols-12">

          <div className="col-span-4 bg-gray-50 p-5 flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
              ✅
            </div>

            <span className="font-semibold text-lg">
              Recommendation
            </span>

          </div>

          <div className="col-span-8 p-5">

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

              <p className="text-green-700 leading-8 font-medium">

                {info.recommendation}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}