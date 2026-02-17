import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  validateToken: () => api.get('/auth/validate'),
};

export const bookingAPI = {
  getSeats: (route) => api.get(`/bookings/seats/${route}`),
  getAvailableSeats: (route) => api.get(`/bookings/available/${route}`),
  bookSeat: (route, seatNumber) =>
    api.post('/bookings', { route, seatNumber }),
  getMyBookings: () => api.get('/bookings/my'),
  getAllBookings: () => api.get('/bookings/all'),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),
};
