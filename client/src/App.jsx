import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children, isAuthenticated, requiredRole = null }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            {user?.role === 'admin' ? (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/history" element={<BookingHistory />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
