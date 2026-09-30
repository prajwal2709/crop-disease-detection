import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useTranslation } from "../context/LanguageContext";
import LanguageToggle from "../components/ui/LanguageToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, [navigate]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError(t("enterCredentials"));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", email);
        navigate("/");
      } else {
        setError(data.message || t("loginFailed"));
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
            <div className="text-5xl mb-3" aria-hidden="true">🌱</div>
            <h2 className="text-2xl font-bold text-primary-dark">{t("loginTitle")}</h2>
            <p className="text-gray-600 mt-2">{t("loginSubtitle")}</p>
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-20"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-medium"
              >
                {showPassword ? t("hide") : t("show")}
              </button>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? t("loggingIn") : t("login")}
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            {t("noAccount")}{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-primary font-semibold hover:underline"
            >
              {t("signup")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
