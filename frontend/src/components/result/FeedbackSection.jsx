import { useState } from "react";

export default function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      {/* Header */}

      <div className="text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-5xl">

          ⭐

        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-6">

          Rate Your Experience

        </h2>

        <p className="text-gray-500 mt-3 text-lg">

          Your feedback helps us improve our AI crop disease detection.

        </p>

      </div>

      {submitted ? (

        <div className="mt-10">

          <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">

            <div className="text-6xl mb-4">

              🎉

            </div>

            <h3 className="text-2xl font-bold text-green-700">

              Thank You!

            </h3>

            <p className="text-gray-600 mt-3">

              Your feedback has been submitted successfully.

            </p>

          </div>

        </div>

      ) : (

        <>
          {/* Stars */}

          <div className="flex justify-center gap-4 mt-10">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                onClick={() => setRating(star)}
                className="
                  text-5xl
                  transition-all
                  duration-300
                  hover:scale-125
                "
              >
                {rating >= star ? "⭐" : "☆"}
              </button>

            ))}

          </div>

          {/* Rating Text */}

          <div className="text-center mt-6">

            {rating === 1 && (
              <p className="text-red-600 font-semibold">
                Poor
              </p>
            )}

            {rating === 2 && (
              <p className="text-orange-600 font-semibold">
                Fair
              </p>
            )}

            {rating === 3 && (
              <p className="text-yellow-600 font-semibold">
                Good
              </p>
            )}

            {rating === 4 && (
              <p className="text-green-600 font-semibold">
                Very Good
              </p>
            )}

            {rating === 5 && (
              <p className="text-green-700 font-bold">
                Excellent ⭐
              </p>
            )}

          </div>

          {/* Buttons */}

          <div className="flex flex-col md:flex-row gap-5 mt-10">

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="
                flex-1
                py-4
                rounded-2xl
                bg-green-600
                hover:bg-green-700
                text-white
                text-lg
                font-bold
                shadow-lg
                transition
                disabled:opacity-50
              "
            >
              Submit Feedback
            </button>

            <button
              onClick={() => {
                setRating(0);
              }}
              className="
                flex-1
                py-4
                rounded-2xl
                border-2
                border-gray-300
                hover:bg-gray-100
                text-lg
                font-semibold
                transition
              "
            >
              Reset
            </button>

          </div>
        </>
      )}

    </div>
  );
}