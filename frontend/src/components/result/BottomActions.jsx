import { useNavigate } from "react-router-dom";

export default function BottomActions() {
  const navigate = useNavigate();

  const handleDownload = () => {
    window.print(); // Can be replaced with PDF generation later
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Crop Disease Detection Report",
          text: "Check out my AI Crop Disease Detection Report.",
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Report link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-10">

      {/* Header */}

      <div className="text-center mb-8">

        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-5xl mx-auto">

          🚀

        </div>

        <h2 className="text-3xl font-bold text-green-700 mt-5">

          Next Actions

        </h2>

        <p className="text-gray-500 mt-2">

          Save, share or start another crop analysis.

        </p>

      </div>

      {/* Buttons */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Detect Again */}

        <button
          onClick={() => navigate("/")}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-3
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-3xl
            py-8
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          "
        >

          <span className="text-5xl">

            🌱

          </span>

          <h3 className="font-bold text-xl">

            Detect Again

          </h3>

          <p className="text-green-100 text-sm">

            Analyze another crop image

          </p>

        </button>

        {/* Download */}

        <button
          onClick={handleDownload}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-3xl
            py-8
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          "
        >

          <span className="text-5xl">

            📄

          </span>

          <h3 className="font-bold text-xl">

            Download Report

          </h3>

          <p className="text-blue-100 text-sm">

            Save this result as PDF

          </p>

        </button>

        {/* Share */}

        <button
          onClick={handleShare}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-3
            bg-purple-600
            hover:bg-purple-700
            text-white
            rounded-3xl
            py-8
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          "
        >

          <span className="text-5xl">

            📤

          </span>

          <h3 className="font-bold text-xl">

            Share Report

          </h3>

          <p className="text-purple-100 text-sm">

            Share with farmers & experts

          </p>

        </button>

      </div>

    </div>
  );
}