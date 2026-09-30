export default function FarmerTip({ info }) {
  return (
    <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-[32px] shadow-xl p-8 mb-8 overflow-hidden relative">

      {/* Background Decoration */}

      <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full"></div>

      <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left Side */}

        <div className="flex items-start gap-6">

          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-5xl shadow-lg">

            💡

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">

              Farmer Tip

            </h2>

            <p className="text-green-100 mt-2 text-lg">

              Expert advice to keep your crops healthy

            </p>

            <div className="mt-6 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">

              <p className="text-white leading-8 text-lg">

                {info.farmerTip}

              </p>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-col items-center">

          <div className="text-8xl">

            🌾

          </div>

          <p className="text-green-100 mt-4 text-center font-medium">

            Healthy Farming
            <br />
            Better Harvest

          </p>

        </div>

      </div>

    </div>
  );
}