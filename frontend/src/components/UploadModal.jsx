
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import uploadIllustration from "../assets/upload-illustration.png";

export default function UploadModal({ onClose }) {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const email = localStorage.getItem("user");

    if (!email) {
      alert("Please login first");
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
        onClose();
        navigate("/result", { state: data });
      } else {
        alert(data.error || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-3xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-[420px] object-cover rounded-3xl"
          />
        ) : (
          <div className="text-center">

            <img
              src={uploadIllustration}
              alt="Upload"
              className="mx-auto h-[340px] object-contain"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Upload Crop Image
            </button>

          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files[0])}
        />

        {image && (
          <div className="text-center mt-4">

            <p className="font-semibold text-green-700">
              {image.name}
            </p>

            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-3 text-green-700 underline"
            >
              Change Image
            </button>

          </div>
        )}

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg"
        >
          {loading ? "Analyzing..." : "Analyze Crop"}
        </button>

      </div>

    </div>
  );
}

