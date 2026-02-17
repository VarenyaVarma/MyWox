import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { bookingAPI } from '../utils/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      setBookings(response.data.bookings || []);
      setStats(response.data.stats || {});
      setError('');
    } catch (err) {
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await bookingAPI.deleteBooking(id);
      setBookings(bookings.filter((b) => b._id !== id));
      fetchAdminData(); // Refresh stats
    } catch (err) {
      alert('Failed to delete booking');
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">Manage all bus bookings and view statistics</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Statistics Cards */}
          {stats && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Total Bookings */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">
                  TOTAL BOOKINGS
                </h3>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalBookings}
                </p>
              </div>

              {/* Ameerpet Stats */}
              {stats.byRoute?.Ameerpet && (
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-gray-600 text-sm font-semibold mb-3">
                    AMEERPET ROUTE
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked:</span>
                      <span className="font-bold text-gray-900">
                        {stats.byRoute.Ameerpet.booked}/40
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-bold text-green-600">
                        {stats.byRoute.Ameerpet.available}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(
                            (stats.byRoute.Ameerpet.booked / 40) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Jubilee Hills Stats */}
              {stats.byRoute?.['Jubilee Hills'] && (
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                  <h3 className="text-gray-600 text-sm font-semibold mb-3">
                    JUBILEE HILLS ROUTE
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked:</span>
                      <span className="font-bold text-gray-900">
                        {stats.byRoute['Jubilee Hills'].booked}/40
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-bold text-green-600">
                        {stats.byRoute['Jubilee Hills'].available}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(
                            (stats.byRoute['Jubilee Hills'].booked / 40) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* All Bookings Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
            </div>

            {bookings.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No bookings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Passenger Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Seat
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {booking.user?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {booking.user?.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {booking.route}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-semibold">
                            {booking.seatNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() =>
                              handleDeleteBooking(booking._id)
                            }
                            disabled={deleteLoading === booking._id}
                            className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {deleteLoading === booking._id
                              ? 'Deleting...'
                              : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
