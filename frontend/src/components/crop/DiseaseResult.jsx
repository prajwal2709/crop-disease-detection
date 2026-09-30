import React, { useState } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import voiceService from '../../services/voice';

/**
 * DiseaseResult Component
 * Displays the disease detection results in a farmer-friendly format
 */
const DiseaseResult = ({ result }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  if (!result) return null;

  const { disease, description, treatment, confidence } = result;
  const isHealthy = disease?.toLowerCase() === 'healthy';
  const confidencePercentage = (confidence || 0) * 100;

  const handleSpeak = () => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
    } else {
      voiceService.speakResult(result);
      setIsSpeaking(true);
      
      // Auto-stop speaking indicator after speech
      setTimeout(() => setIsSpeaking(false), 10000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Disease Status Card */}
      <Card className={`${isHealthy ? 'bg-green-50 border-2 border-healthy' : 'bg-red-50 border-2 border-disease'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Status Icon */}
            <div className="flex items-center gap-3 mb-4">
              {isHealthy ? (
                <svg
                  className="w-12 h-12 text-healthy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-12 h-12 text-disease"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
              
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold ${isHealthy ? 'text-healthy' : 'text-disease'}`}>
                  {disease}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isHealthy ? 'Your crop looks good!' : 'Disease detected'}
                </p>
              </div>
            </div>
          </div>

          {/* Voice button */}
          {voiceService.isSupported() && (
            <button
              onClick={handleSpeak}
              className={`p-3 rounded-full shadow-lg transition-all ${
                isSpeaking 
                  ? 'bg-primary text-white animate-pulse' 
                  : 'bg-white text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label={isSpeaking ? 'Stop speaking' : 'Read result aloud'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </button>
          )}
        </div>
      </Card>

      {/* Confidence Score */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Accuracy
        </h3>
        <ProgressBar 
          percentage={confidencePercentage} 
          label="How sure we are"
          showPercentage={true}
        />
        <p className="text-sm text-gray-600 mt-2">
          {confidencePercentage >= 80 && 'Very confident in this result'}
          {confidencePercentage >= 60 && confidencePercentage < 80 && 'Fairly confident in this result'}
          {confidencePercentage < 60 && 'Please take another clear photo for better accuracy'}
        </p>
      </Card>

      {/* Description */}
      {description && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary"
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
            What is this?
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            {description}
          </p>
        </Card>
      )}

      {/* Treatment - only show if disease detected */}
      {!isHealthy && treatment && (
        <Card className="bg-amber-50 border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            What to do?
          </h3>
          <p className="text-base text-gray-800 leading-relaxed">
            {treatment}
          </p>
          <div className="mt-4 bg-white rounded-lg p-3 border border-amber-300">
            <p className="text-sm text-amber-900 font-medium">
              💡 <strong>Important:</strong> Consult with a local agricultural expert for personalized advice.
            </p>
          </div>
        </Card>
      )}

      {/* Healthy crop message */}
      {isHealthy && (
        <Card className="bg-green-50 border border-green-200">
          <div className="flex gap-3">
            <svg
              className="w-8 h-8 text-healthy flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-healthy mb-2">
                Great news!
              </h3>
              <p className="text-base text-gray-700">
                Your crop appears to be healthy. Continue with regular care and monitoring to keep it in good condition.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DiseaseResult;
