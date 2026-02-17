import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SeatInfo from '../components/SeatInfo';
import { bookingAPI } from '../utils/api';

const Dashboard = () => {
  const [ameerpetData, setAmeerpetData] = useState(null);
  const [jubileeData, setJubileeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSeatsData();
  }, []);

  const fetchSeatsData = async () => {
    try {
      const [ameerpetRes, jubileeRes] = await Promise.all([
        bookingAPI.getSeats('Ameerpet'),
        bookingAPI.getSeats('Jubilee Hills'),
      ]);

      setAmeerpetData(ameerpetRes.data);
      setJubileeData(jubileeRes.data);
      setError('');
    } catch (err) {
      setError('Failed to load seat information');
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
            <p className="mt-4 text-gray-600">Loading seat information...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-12">
            View available seats for each route
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ameerpet Route */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ameerpet</h2>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚌</span>
                </div>
              </div>

              {ameerpetData && (
                <>
                  <SeatInfo
                    totalSeats={ameerpetData.totalSeats}
                    bookedSeats={ameerpetData.bookedSeats}
                    availableSeats={ameerpetData.availableSeats}
                    route="Ameerpet"
                  />
                  <a
                    href="/booking"
                    className="w-full mt-6 block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Seat
                  </a>
                </>
              )}
            </div>

            {/* Jubilee Hills Route */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Jubilee Hills</h2>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚌</span>
                </div>
              </div>

              {jubileeData && (
                <>
                  <SeatInfo
                    totalSeats={jubileeData.totalSeats}
                    bookedSeats={jubileeData.bookedSeats}
                    availableSeats={jubileeData.availableSeats}
                    route="Jubilee Hills"
                  />
                  <a
                    href="/booking"
                    className="w-full mt-6 block text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Book Seat
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 Tip
            </h3>
            <p className="text-blue-800">
              Check seat availability for both routes above. Go to "Book Seat" to
              reserve your preferred seat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
