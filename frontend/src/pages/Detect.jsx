
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useTranslation } from "../context/LanguageContext";

import uploadIllustration from "../assets/upload-illustration.png";

export default function Detect() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleImageChange = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!image) {
      alert(t("alertUpload"));
      return;
    }

    const email = localStorage.getItem("user");

    if (!email) {
      alert(t("alertLogin"));
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", image);
      formData.append("email", email);

      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/result", { state: data });
      } else {
        alert(data.error || t("predictionFailed"));
      }
    } catch (err) {
      console.error(err);
      alert(t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Upload Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        {preview ? (
          <img
            src={preview}
            alt="Crop Preview"
            className="w-full h-[420px] object-cover rounded-3xl shadow-md"
          />
        ) : (
          <div className="relative rounded-3xl overflow-hidden bg-green-50">

            <img
              src={uploadIllustration}
              alt="Upload Crop"
              className="w-full h-[360px] object-contain"
            />

            {/* Upload Button */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="
                  px-8
                  py-3
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Upload Crop Image
              </button>

            </div>

          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleImageChange(e.target.files[0])}
        />

        {/* Selected Image */}
        {image && (
          <div className="mt-5 text-center">

            <p className="text-gray-600">
              Selected Image
            </p>

            <p className="font-semibold text-green-700 mt-1">
              {image.name}
            </p>

            <button
              onClick={() => fileInputRef.current.click()}
              className="
                mt-4
                px-6
                py-2
                rounded-lg
                border
                border-green-600
                text-green-700
                hover:bg-green-50
                transition
              "
            >
              Change Image
            </button>

          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="
            w-full
            mt-8
            py-4
            rounded-2xl
            bg-green-600
            hover:bg-green-700
            text-white
            text-lg
            font-semibold
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.02]
            disabled:opacity-50
          "
        >
          {loading ? "Analyzing Crop..." : "Analyze Crop"}
        </button>

      </div>

    </div>
  );
}

