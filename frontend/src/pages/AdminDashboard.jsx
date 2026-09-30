import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/dashboard`);
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        🌿 CropAI Admin Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500">👥 Total Users</h2>
          <p className="text-5xl font-bold text-blue-600 mt-4">
            {dashboard.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500">🌱 Total Predictions</h2>
          <p className="text-5xl font-bold text-green-600 mt-4">
            {dashboard.totalPredictions}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500">⭐ Total Feedback</h2>
          <p className="text-5xl font-bold text-yellow-500 mt-4">
            {dashboard.totalFeedback}
          </p>
        </div>

      </div>

      {/* Recent Users */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          👥 Recent Users
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-green-100">

              <th className="p-3 text-left">Email</th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recentUsers.length === 0 ? (

              <tr>

                <td className="p-3 text-center">
                  No Users Found
                </td>

              </tr>

            ) : (

              dashboard.recentUsers.map((user, index) => (

                <tr key={index} className="border-b">

                  <td className="p-3">
                    {user.email}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            {/* Recent Predictions */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          🌱 Recent Predictions
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-green-100">

              <th className="p-3 text-left">
                User
              </th>

              <th className="p-3 text-left">
                Disease
              </th>

              <th className="p-3 text-left">
                Confidence
              </th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recentPredictions.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="p-3 text-center"
                >

                  No Predictions Found

                </td>

              </tr>

            ) : (

              dashboard.recentPredictions.map((prediction, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {prediction.user}
                  </td>

                  <td className="p-3">
                    {prediction.disease}
                  </td>

                  <td className="p-3">
                    {prediction.confidence}%
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            {/* Recent Feedback */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          ⭐ Recent AI Feedback
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-green-100">

              <th className="p-3 text-left">
                User
              </th>

              <th className="p-3 text-left">
                Disease
              </th>

              <th className="p-3 text-left">
                Rating
              </th>

              <th className="p-3 text-left">
                Feedback
              </th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recentFeedback.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="p-3 text-center"
                >

                  No Feedback Found

                </td>

              </tr>

            ) : (

              dashboard.recentFeedback.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {item.user}
                  </td>

                  <td className="p-3">
                    {item.disease}
                  </td>

                  <td className="p-3">

                    {item.rating === 5
                      ? "👍 Helpful"
                      : "👎 Not Helpful"}

                  </td>

                  <td className="p-3">
                    {item.feedback}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminDashboard;