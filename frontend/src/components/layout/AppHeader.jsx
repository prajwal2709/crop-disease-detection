
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";
import LanguageToggle from "../ui/LanguageToggle";

export default function AppHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = localStorage.getItem("user");
  const username = user ? user.split("@")[0] : "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-left"
        >
          <span className="text-4xl">🌱</span>

          <div>
            <h1 className="font-bold text-2xl text-green-700">
              Crop Doctor
            </h1>

            <p className="text-sm text-gray-500 hidden sm:block">
              Smart Crop Disease Detection
            </p>
          </div>
        </button>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Language */}
          <LanguageToggle />

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

          {/* User */}
          {user ? (
            <>
              <span className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                👤 {username}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
            >
              {t("login")}
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

