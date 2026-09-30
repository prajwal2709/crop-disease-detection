import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Header Component (Enhanced)
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("user");

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-primary-dark rounded-lg transition-colors"
            >
              ←
            </button>
          )}

          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>

            <h1 className="text-xl md:text-2xl font-display font-bold">
              Crop Disease Detection
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {/* History Icon */}
          {isHome && (
            <button
              onClick={() => navigate('/history')}
              className="p-2 hover:bg-primary-dark rounded-lg transition-colors"
            >
              🕒
            </button>
          )}

          {/* 🔐 AUTH SECTION */}
          {!user ? (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 hover:scale-105 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative">

              {/* Avatar + Name */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  {user[0].toUpperCase()}
                </div>
                <span className="text-sm hidden md:block">{user}</span>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-xl shadow-lg p-2">

                  <p className="px-3 py-2 text-sm text-gray-600 border-b">
                    {user}
                  </p>

                  <button
                    onClick={() => navigate('/history')}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    History
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                      window.location.reload();
                    }}
                    className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;