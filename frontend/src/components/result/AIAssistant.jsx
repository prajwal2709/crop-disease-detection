import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export default function AIAssistant({
  info,
  confidence,
}) {
  const { openChat } = useContext(ChatContext);

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 shadow-2xl p-8 mb-8">

      {/* Background Decorations */}

      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Section */}

        <div>

          <div className="flex items-center gap-4 mb-6">

            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-5xl shadow-lg">

              🤖

            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">

                AI Crop Assistant

              </h2>

              <p className="text-green-100 mt-2">

                Your personal farming expert

              </p>

            </div>

          </div>

          <p className="text-lg text-green-50 leading-8">

            Ask detailed questions about

            <span className="font-bold text-white">

              {" "}{info.name}

            </span>

            . Get personalized treatment methods,
            fertilizer recommendations, pesticide advice,
            disease prevention techniques and expert
            farming guidance powered by Artificial Intelligence.

          </p>

          {/* Features */}

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

              <div className="text-3xl mb-2">

                ⚡

              </div>

              <h4 className="font-bold text-white">

                Instant Response

              </h4>

              <p className="text-sm text-green-100 mt-1">

                Get answers in seconds.

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

              <div className="text-3xl mb-2">

                🎯

              </div>

              <h4 className="font-bold text-white">

                Personalized Advice

              </h4>

              <p className="text-sm text-green-100 mt-1">

                Based on your detected disease.

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

              <div className="text-3xl mb-2">

                🌾

              </div>

              <h4 className="font-bold text-white">

                Farming Tips

              </h4>

              <p className="text-sm text-green-100 mt-1">

                Best agricultural practices.

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">

              <div className="text-3xl mb-2">

                🕒

              </div>

              <h4 className="font-bold text-white">

                Available 24×7

              </h4>

              <p className="text-sm text-green-100 mt-1">

                Ask questions anytime.

              </p>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col items-center justify-center text-center">

          <div className="w-56 h-56 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20">

            <span className="text-8xl">

              🤖

            </span>

          </div>

          <h3 className="text-2xl font-bold text-white mt-8">

            Need More Information?

          </h3>

          <p className="text-green-100 mt-3 leading-7 max-w-sm">

            Our AI assistant can explain the disease,
            recommend treatments, answer farming
            questions and guide you step-by-step.

          </p>

          <button
            onClick={() =>
  openChat({
    disease: info.name,
    confidence: confidence,
    severity: info.severity,
  })
}
            className="
              mt-8
              px-10
              py-4
              bg-white
              text-green-700
              rounded-2xl
              font-bold
              text-lg
              shadow-xl
              hover:scale-105
              transition-all
              duration-300
            "
          >
            💬 Ask AI Assistant
          </button>

        </div>

      </div>

    </div>
  );
}