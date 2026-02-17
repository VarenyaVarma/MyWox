import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { bookingAPI } from '../utils/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data.bookings || []);
      setError('');
    } catch (err) {
      setError('Failed to load booking history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600 mb-8">
            Your confirmed bus bookings
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Bookings Yet
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't booked any seats. Visit the booking page to reserve
                a seat.
              </p>
              <a
                href="/booking"
                className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Book a Seat
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                          <span className="text-3xl font-bold text-pink-600">
                            {booking.seatNumber}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.route}
                          </h3>
                          <p className="text-gray-600">
                            Seat {booking.seatNumber}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-gray-600">Booking Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Booking Status</p>
                          <p className="font-semibold text-green-600">
                            ✓ Confirmed
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
