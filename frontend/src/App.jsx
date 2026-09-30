
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Result from "./pages/Result";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";

import AIChatbot from "./components/AIChatbot";

/**
 * Protected Route
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

/**
 * Main App
 */
function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* Home */}

        <Route
          path="/"
          element={
            <MainLayout>
              <>
                <Home />
                <AIChatbot />
              </>
            </MainLayout>
          }
        />

        {/* Detect */}

        <Route
          path="/detect"
          element={
            <ProtectedRoute>
              <MainLayout>
                <>
                  <Detect />
                  <AIChatbot />
                </>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Result */}

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <MainLayout>
                <>
                  <Result />
                  <AIChatbot />
                </>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* History */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <MainLayout>
                <>
                  <History />
                  <AIChatbot />
                </>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </Router>
  );
}

export default App;

