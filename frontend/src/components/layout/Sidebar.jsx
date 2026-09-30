import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menu = [
    { icon: "🏠", labelKey: "navHome", path: "/" },
    { icon: "📷", labelKey: "navDetect", path: "/detect" },
    { icon: "📜", labelKey: "navHistory", path: "/history" },
  ];

  return (
    <aside className="hidden md:flex w-56 lg:w-64 shrink-0 flex-col bg-white border-r border-green-100 min-h-[calc(100vh-65px)]">
      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-secondary"
              }`}
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
