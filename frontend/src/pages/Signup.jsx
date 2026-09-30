import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useTranslation } from "../context/LanguageContext";
import LanguageToggle from "../components/ui/LanguageToggle";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignup = async () => {
    setError("");

    if (!email || !password) {
      setError(t("fillAll"));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || t("signupFailed"));
      }
    } catch {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-farm-bg flex flex-col">
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md card shadow-md">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3" aria-hidden="true">🌾</div>
            <h2 className="text-2xl font-bold text-primary-dark">{t("signupTitle")}</h2>
            <p className="text-gray-600 mt-2">{t("signupSubtitle")}</p>
          </div>

          {error && (
            <p className="text-red-600 text-center mb-4 bg-red-50 rounded-lg py-2 px-3">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />

            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            />

            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? t("creating") : t("signup")}
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            {t("haveAccount")}{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary font-semibold hover:underline"
            >
              {t("login")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
