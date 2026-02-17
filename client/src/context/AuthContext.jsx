import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set token in localStorage and axios headers
  const setAuthToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(
            'http://localhost:5000/api/auth/validate'
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [token]);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
