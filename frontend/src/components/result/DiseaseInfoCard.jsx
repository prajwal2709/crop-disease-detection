export default function DiseaseInfoCard({ info }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">

      {/* ================= Symptoms ================= */}

      <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-3xl">
            🦠
          </div>

          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Symptoms
            </h2>

            <p className="text-gray-500 text-sm">
              Visible disease signs
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {info.symptoms.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <div className="mt-1 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">

                {index + 1}

              </div>

              <p className="text-gray-700 leading-7">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* ================= Spread ================= */}

      <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl">
            🌍
          </div>

          <div>

            <h2 className="text-2xl font-bold text-yellow-600">

              Spread

            </h2>

            <p className="text-gray-500 text-sm">

              How the disease spreads

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {info.spread.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <div className="mt-1 w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">

                {index + 1}

              </div>

              <p className="text-gray-700 leading-7">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* ================= Prevention ================= */}

      <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
            🛡️
          </div>

          <div>

            <h2 className="text-2xl font-bold text-green-700">

              Prevention

            </h2>

            <p className="text-gray-500 text-sm">

              Best farming practices

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {info.prevention.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <div className="mt-1 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">

                ✓

              </div>

              <p className="text-gray-700 leading-7">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}