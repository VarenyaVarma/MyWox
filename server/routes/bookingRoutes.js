const express = require('express');
const {
  getSeats,
  bookSeat,
  getMyBookings,
  getAllBookings,
  deleteBooking,
  getAvailableSeats,
} = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - requires authentication
router.get('/seats/:route', getSeats);
router.get('/available/:route', getAvailableSeats);
router.post('/', authMiddleware, bookSeat);
router.get('/my', authMiddleware, getMyBookings);

// Admin routes - requires admin role
router.get('/all', authMiddleware, adminMiddleware, getAllBookings);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBooking);

module.exports = router;
