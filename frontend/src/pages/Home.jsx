
import { useState } from "react";
import { AnalyzingOverlay } from "./AnalyzingOverlay";
import UploadModal from "../components/UploadModal";

import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import farmBg from "../assets/farm-background.png";

export default function Home() {
  const [isAnalyzing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleScanClick = () => {
    setShowUploadModal(true);
  };

  return (
    <>
      <div
        className="max-w-7xl mx-auto px-8 py-12 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url(${farmBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isAnalyzing && (
          <AnalyzingOverlay status="Analyzing your crop..." />
        )}

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* Step 1 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <img
              src={step1}
              alt="Capture Leaf"
              className="w-full h-80 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-green-700">
                Capture Leaf
              </h3>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <img
              src={step2}
              alt="Analyze Disease"
              className="w-full h-80 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-green-700">
                Analyze Disease
              </h3>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <img
              src={step3}
              alt="View Treatment"
              className="w-full h-80 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-green-700">
                View Treatment
              </h3>
            </div>
          </div>

        </div>

        {/* Scan Button */}
        <div className="flex justify-center mt-12">

          <button
            onClick={handleScanClick}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              font-semibold
              text-lg
              px-12
              py-4
              rounded-2xl
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Scan Crop
          </button>

        </div>

        {/* Bottom Message */}
        <div className="mt-20 text-center">

          <div className="inline-block px-5 py-2 rounded-xl bg-green-900/40">

            <p className="text-4xl font-extrabold text-white drop-shadow-lg">
              Empowering Farmers with AI
            </p>

            <p className="text-white mt-2 text-lg font-medium">
              Fast • Accurate • Accessible
            </p>

          </div>

        </div>

      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </>
  );
}

