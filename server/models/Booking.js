const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    route: {
      type: String,
      enum: ['Ameerpet', 'Jubilee Hills'],
      required: [true, 'Route is required'],
    },
    seatNumber: {
      type: Number,
      required: [true, 'Seat number is required'],
      min: 1,
      max: 40,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique seat per route (only one booking per seat per route)
bookingSchema.index({ route: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
