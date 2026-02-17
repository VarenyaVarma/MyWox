const Booking = require('../models/Booking');
const User = require('../models/User');

const TOTAL_SEATS = 40;

exports.getSeats = async (req, res) => {
  try {
    const { route } = req.params;

    // Validate route
    if (!['Ameerpet', 'Jubilee Hills'].includes(route)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid route',
      });
    }

    // Count booked seats for this route
    const bookedCount = await Booking.countDocuments({ route });
    const availableSeats = TOTAL_SEATS - bookedCount;

    res.status(200).json({
      success: true,
      route,
      totalSeats: TOTAL_SEATS,
      bookedSeats: bookedCount,
      availableSeats,
    });
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching seat information',
      error: error.message,
    });
  }
};

exports.bookSeat = async (req, res) => {
  try {
    const { route, seatNumber } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!route || !seatNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide route and seat number',
      });
    }

    // Validate route
    if (!['Ameerpet', 'Jubilee Hills'].includes(route)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid route',
      });
    }

    // Validate seat number
    if (seatNumber < 1 || seatNumber > TOTAL_SEATS) {
      return res.status(400).json({
        success: false,
        message: `Seat number must be between 1 and ${TOTAL_SEATS}`,
      });
    }

    // Check if seat is already booked
    const existingBooking = await Booking.findOne({ route, seatNumber });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This seat is already booked',
      });
    }

    // Check if user already has a booking on this route
    const userBooking = await Booking.findOne({ user: userId, route });
    if (userBooking) {
      return res.status(400).json({
        success: false,
        message: 'You already have a booking on this route',
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      route,
      seatNumber,
    });

    await booking.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Seat booked successfully',
      booking,
    });
  } catch (error) {
    console.error('Book seat error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking seat',
      error: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    // Get statistics
    const stats = {
      totalBookings: bookings.length,
      byRoute: {},
    };

    // Calculate stats by route
    const routes = ['Ameerpet', 'Jubilee Hills'];
    for (const route of routes) {
      const routeBookings = bookings.filter((b) => b.route === route);
      stats.byRoute[route] = {
        booked: routeBookings.length,
        available: TOTAL_SEATS - routeBookings.length,
        total: TOTAL_SEATS,
      };
    }

    res.status(200).json({
      success: true,
      stats,
      bookings,
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message,
    });
  }
};

exports.getAvailableSeats = async (req, res) => {
  try {
    const { route } = req.params;

    // Validate route
    if (!['Ameerpet', 'Jubilee Hills'].includes(route)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid route',
      });
    }

    // Get all booked seat numbers for this route
    const bookedSeats = await Booking.find({ route }, 'seatNumber');
    const bookedSeatNumbers = bookedSeats.map((b) => b.seatNumber);

    // Generate available seat numbers
    const availableSeatNumbers = [];
    for (let i = 1; i <= TOTAL_SEATS; i++) {
      if (!bookedSeatNumbers.includes(i)) {
        availableSeatNumbers.push(i);
      }
    }

    res.status(200).json({
      success: true,
      route,
      availableSeats: availableSeatNumbers,
      count: availableSeatNumbers.length,
    });
  } catch (error) {
    console.error('Get available seats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available seats',
      error: error.message,
    });
  }
};
