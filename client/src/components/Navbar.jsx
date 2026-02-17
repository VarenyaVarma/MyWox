import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBus } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-700 hover:text-pink-600';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
              <FaBus className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">MyWox</span>
          </Link>

          <div className="flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <>
                    <Link 
                      to="/admin" 
                      className={`${isActive('/admin')} transition-colors`}
                    >
                      Admin Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`${isActive('/dashboard')} transition-colors`}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/booking" 
                      className={`${isActive('/booking')} transition-colors`}
                    >
                      Book a Seat
                    </Link>
                    <Link 
                      to="/history" 
                      className={`${isActive('/history')} transition-colors`}
                    >
                      History
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className={`${isActive('/login')} transition-colors`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`${isActive('/register')} transition-colors`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
