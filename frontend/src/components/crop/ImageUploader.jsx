import React, { useRef, useState } from 'react';
import Card from '../ui/Card';

/**
 * ImageUploader Component
 * Handles image upload and camera capture for mobile devices
 */
const ImageUploader = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(selectedImage || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass file to parent
    onImageSelect(file);
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {previewUrl ? (
        <Card className="relative animate-fade-in">
          <img
            src={previewUrl}
            alt="Selected crop"
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
          
          {/* Clear button */}
          <button
            onClick={clearImage}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Clear image"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload from gallery */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input-file"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="input-file-label animate-slide-up">
            <svg
              className="w-16 h-16 text-primary mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-semibold text-primary mb-1">
              Upload Photo
            </p>
            <p className="text-sm text-gray-600">
              Choose from gallery
            </p>
          </label>

          {/* Capture from camera */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="input-file"
            id="camera-capture"
          />
          <label htmlFor="camera-capture" className="input-file-label animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <svg
              className="w-16 h-16 text-primary mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-lg font-semibold text-primary mb-1">
              Take Photo
            </p>
            <p className="text-sm text-gray-600">
              Use camera
            </p>
          </label>
        </div>
      )}

      {/* Helper text */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <svg
            className="w-6 h-6 text-blue-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Tips for best results:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Take clear photos in good lighting</li>
              <li>Focus on affected leaf or plant part</li>
              <li>Avoid blurry or dark images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
