import { useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import MobileNav from "./MobileNav";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">

      {/* Show Header only on Home page */}
      {location.pathname === "/" && <AppHeader />}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

    </div>
  );
};

export default MainLayout;