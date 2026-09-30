import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menu = [
    { icon: "🏠", labelKey: "navHome", path: "/" },
    { icon: "📷", labelKey: "navDetect", path: "/detect" },
    { icon: "📜", labelKey: "navHistory", path: "/history" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-green-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] safe-area-pb">
      <div className="flex justify-around items-center px-2 py-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
            >
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
