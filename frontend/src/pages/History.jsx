import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { getDiseaseDisplay } from "../data/diseaseInfo";
import { useTranslation } from "../context/LanguageContext";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const fetchHistory = async () => {
    const email = localStorage.getItem("user");

    if (!email) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/history?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (res.ok) {
        setHistory(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const email = localStorage.getItem("user");

    try {
      await fetch(`${API_BASE_URL}/history/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email }),
      });

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <h2 className="page-title">📜 {t("historyTitle")}</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">{t("loading")}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4" aria-hidden="true">📭</div>
          <p className="text-gray-600 text-lg mb-6">{t("noHistory")}</p>
          <button type="button" onClick={() => navigate("/detect")} className="btn-primary">
            📷 {t("startFirst")}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {history.map((item) => {
            const display = getDiseaseDisplay(item.disease, language);
            return (
              <div key={item.id || item.timestamp} className="card">
                <img
                  src={item.image}
                  alt="scan"
                  className="w-full h-40 object-cover rounded-xl mb-3 border border-green-100"
                />
                <h3 className="text-lg font-bold text-primary-dark">{display.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {t("confidence")}: {item.confidence}%
                </p>
                <p className="text-gray-400 text-xs mt-1">{item.timestamp}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="btn-danger mt-3"
                >
                  🗑 {t("delete")}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
