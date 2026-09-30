import { useLocation, useNavigate } from "react-router-dom";
import { getDiseaseDisplay } from "../data/diseaseInfo";
import { useTranslation } from "../context/LanguageContext";

import LanguageToggle from "../components/ui/LanguageToggle";

import HeroSection from "../components/result/HeroSection";
import DiagnosisSummary from "../components/result/DiagnosisSummary";
import DiseaseInfoCard from "../components/result/DiseaseInfoCard";
import RecommendedActions from "../components/result/RecommendedActions";
import FarmerTip from "../components/result/FarmerTip";
import DetectionStats from "../components/result/DetectionStats";
import AIAssistant from "../components/result/AIAssistant";
import FeedbackSection from "../components/result/FeedbackSection";
import BottomActions from "../components/result/BottomActions";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, t } = useTranslation();

  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md">
          <div className="text-6xl mb-5">🌿</div>

          <h2 className="text-3xl font-bold text-green-700">
            {t("noResult")}
          </h2>

          <p className="text-gray-500 mt-4">
            No prediction data found.
            Please scan a crop image first.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition"
          >
            🌱 Go Home
          </button>
        </div>
      </div>
    );
  }

  const {
    disease,
    confidence = 0,
    image,
    success = true,
  } = data;

  const info = getDiseaseDisplay(disease, language);

  const isUnknown =
    !success ||
    confidence < 70 ||
    !disease ||
    disease === "Unknown" ||
    disease === "Unknown Disease";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-green-200 rounded-2xl shadow-md text-green-700 font-semibold hover:bg-green-50 transition"
            >
              🏠 Home
            </button>

            <button
              onClick={() => navigate("/history")}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-green-200 rounded-2xl shadow-md text-green-700 font-semibold hover:bg-green-50 transition"
            >
              📜 History
            </button>

          </div>

          <LanguageToggle />
        </div>

        {/* Hero */}
        <HeroSection
          image={image}
          info={info}
          confidence={confidence}
        />

        {/* Diagnosis */}
        <DiagnosisSummary
          info={info}
        />

        {/* Unknown Disease Card */}
        {isUnknown ? (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">
              🔍 Analysis Inconclusive
            </h2>

            <p className="text-gray-700 mb-5">
              The uploaded image could not be confidently matched with any
              disease available in the current dataset.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>✅ Upload a clearer image of the affected leaf.</li>
              <li>✅ Ensure the leaf occupies most of the image.</li>
              <li>✅ Avoid blurry or dark photos.</li>
              <li>✅ Capture the image in natural daylight.</li>
              <li>✅ Avoid multiple leaves in a single image.</li>
              <li>✅ Consult an agricultural expert if symptoms persist.</li>
            </ul>
          </div>
        ) : (
          <>
            {/* Disease Information */}
            <DiseaseInfoCard
              info={info}
            />

            {/* AI Farming Insights */}
            <RecommendedActions
              info={info}
            />

            {/* Farmer Tip */}
            <FarmerTip
              info={info}
            />
          </>
        )}

        {/* Statistics */}
        <DetectionStats
          info={info}
          confidence={confidence}
        />

        {/* AI Assistant only for valid diseases */}
        {!isUnknown && (
          <AIAssistant
            info={info}
            confidence={confidence}
          />
        )}

        {/* Feedback */}
        <FeedbackSection />

        {/* Bottom Buttons */}
        <BottomActions />

      </div>
    </div>
  );
}