import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SeatInfo from '../components/SeatInfo';
import { bookingAPI } from '../utils/api';

const Booking = () => {
  const [selectedRoute, setSelectedRoute] = useState('Ameerpet');
  const [seatData, setSeatData] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSeatData();
  }, [selectedRoute]);

  const fetchSeatData = async () => {
    try {
      setLoading(true);
      const [seatsRes, availableRes] = await Promise.all([
        bookingAPI.getSeats(selectedRoute),
        bookingAPI.getAvailableSeats(selectedRoute),
      ]);

      setSeatData(seatsRes.data);
      setAvailableSeats(availableRes.data.availableSeats || []);
      setSelectedSeat(null);
      setError('');
      setSuccess('');
    } catch (err) {
      setError('Failed to load seat information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSeat = async () => {
    if (!selectedSeat) {
      setError('Please select a seat');
      return;
    }

    try {
      setLoading(true);
      const response = await bookingAPI.bookSeat(selectedRoute, selectedSeat);

      if (response.data.success) {
        setSuccess('Seat booked successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/history';
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to book seat'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Seat</h1>
          <p className="text-gray-600 mb-8">
            Select your route and preferred seat
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Route Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Route
              </label>
              <div className="flex gap-4">
                {['Ameerpet', 'Jubilee Hills'].map((route) => (
                  <button
                    key={route}
                    onClick={() => setSelectedRoute(route)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                      selectedRoute === route
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {route}
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Statistics */}
            {seatData && (
              <SeatInfo
                totalSeats={seatData.totalSeats}
                bookedSeats={seatData.bookedSeats}
                availableSeats={seatData.availableSeats}
                route={selectedRoute}
              />
            )}

            {/* Seat Grid */}
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                <p className="mt-2 text-gray-600">Loading seats...</p>
              </div>
            ) : (
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Your Seat
                </label>
                <div className="grid grid-cols-10 gap-2 mb-6">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((seat) => (
                    <button
                      key={seat}
                      onClick={() => {
                        if (availableSeats.includes(seat)) {
                          setSelectedSeat(selectedSeat === seat ? null : seat);
                        }
                      }}
                      disabled={!availableSeats.includes(seat)}
                      className={`aspect-square rounded-lg font-semibold transition-colors ${
                        selectedSeat === seat
                          ? 'bg-pink-600 text-white'
                          : availableSeats.includes(seat)
                          ? 'bg-green-100 text-green-900 hover:bg-green-200 cursor-pointer'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex gap-6 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-pink-600 rounded"></div>
                    <span>Selected</span>
                  </div>
                </div>

                {/* Selected Seat Display */}
                {selectedSeat && (
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-pink-600 font-semibold">
                      Selected Seat
                    </p>
                    <p className="text-3xl font-bold text-pink-900">
                      Seat {selectedSeat}
                    </p>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookSeat}
                  disabled={!selectedSeat || loading}
                  className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
