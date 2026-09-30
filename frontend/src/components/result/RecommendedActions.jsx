export default function RecommendedActions({ info }) {
  const icons = ["💧", "🧪", "🌿", "☀️", "🚜", "🛡️"];

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
          📋
        </div>

        <div>

          <h2 className="text-3xl font-bold text-blue-700">
            Recommended Actions
          </h2>

          <p className="text-gray-500">
            Follow these steps to improve crop health
          </p>

        </div>

      </div>

      {/* Table Header */}

      <div className="hidden md:grid grid-cols-12 bg-green-600 text-white rounded-t-2xl font-semibold">

        <div className="col-span-1 p-4 text-center">
          No
        </div>

        <div className="col-span-1 p-4 text-center">
          Icon
        </div>

        <div className="col-span-3 p-4">
          Action
        </div>

        <div className="col-span-6 p-4">
          Description
        </div>

        <div className="col-span-1 p-4 text-center">
          Priority
        </div>

      </div>

      {/* Action Rows */}

      {info.suggestions.map((action, index) => (

        <div
          key={index}
          className="
            grid
            md:grid-cols-12
            gap-3
            border-x
            border-b
            border-gray-200
            p-5
            items-center
            hover:bg-green-50
            transition
          "
        >

          {/* Number */}

          <div className="md:col-span-1 flex justify-center">

            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

              {index + 1}

            </div>

          </div>

          {/* Icon */}

          <div className="md:col-span-1 flex justify-center">

            <div className="text-3xl">

              {icons[index % icons.length]}

            </div>

          </div>

          {/* Title */}

          <div className="md:col-span-3">

            <h3 className="font-bold text-lg text-gray-800">

              {action.title}

            </h3>

          </div>

          {/* Description */}

          <div className="md:col-span-6">

            <p className="text-gray-600 leading-7">

              {action.detail}

            </p>

          </div>

          {/* Priority */}

          <div className="md:col-span-1 flex justify-center">

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                ${
                  index === 0
                    ? "bg-red-100 text-red-700"
                    : index === 1
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {index === 0
                ? "High"
                : index === 1
                ? "Medium"
                : "Low"}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}