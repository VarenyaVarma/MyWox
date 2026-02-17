import React from 'react';

const SeatInfo = ({ totalSeats, bookedSeats, availableSeats, route }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-600 font-semibold mb-2">TOTAL SEATS</div>
        <div className="text-4xl font-bold text-blue-900">{totalSeats}</div>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
        <div className="text-sm text-red-600 font-semibold mb-2">RESERVED</div>
        <div className="text-4xl font-bold text-red-900">{bookedSeats}</div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <div className="text-sm text-green-600 font-semibold mb-2">AVAILABLE</div>
        <div className="text-4xl font-bold text-green-900">{availableSeats}</div>
      </div>
    </div>
  );
};

export default SeatInfo;
