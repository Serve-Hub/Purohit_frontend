import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function AvailablePandits({ notificationId }) {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token_id");
            console.log("token is ",token)
  // Fetch available pandits based on bookingId
  const fetchAvailablePandits = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://purohit-backend.onrender.com/api/v1/booking/bookings/${notificationId}/accepted-pandits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Available Pandits Response:", response.data);
      setPandits(response.data.data);
    } catch (err) {
      setError("Failed to fetch available pandits.");
      console.error("Error fetching available pandits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notificationId) {
      fetchAvailablePandits();
    }
  }, [notificationId]);

  // Accept booking
  const handleAccept = async () => {
    try {
      const res = await axios.put(
        `https://purohit-backend.onrender.com/api/v1/booking/notifications/accept/${notificationId}`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking Accepted:", res.data);
      alert("Booking accepted successfully!");
    } catch (error) {
      console.error("Error accepting booking:", error);
      alert("Failed to accept booking. Please try again.");
    }
  };

  // Reject booking
  const handleReject = async () => {
    try {
      await axios.put(
        `https://purohit-backend.onrender.com/api/v1/booking/notifications/reject/${notificationId}`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking Rejected");
      alert("Booking rejected successfully!");
    } catch (error) {
      console.error("Error rejecting booking:", error);
      alert("Failed to reject booking. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white w-1/2 p-6 rounded-lg">
      <h2 className="text-xl font-bold">Available Pandits</h2>
      
      {loading ? (
        <p>Loading available pandits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pandits.length === 0 ? (
        <p>No available pandits found.</p>
      ) : (
        pandits.map((pandit) => (
          <div key={pandit._id} className="flex gap-3 border items-center p-4 rounded-lg">
            <img src={pandit.imageUrl || ''} alt="Pandit" className="h-20 w-20 rounded-full border" />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">{pandit.name}</h1>
              <p className="text-sm text-gray-500">{pandit.role}</p>
              <p>Ratings: {pandit.rating || 'N/A'}</p>

              <Link href="#" className="font-medium text-blue-500">
                View Profile
              </Link>
            </div>
          </div>
        ))
      )}

      <div className="flex gap-3 justify-between border p-4 mt-4 rounded-lg">
        <button
          onClick={handleAccept}
          className="px-4 py-2 rounded-md bg-green-400 text-white text-sm font-medium hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 rounded-md bg-red-400 text-white text-sm font-medium hover:bg-red-600 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default AvailablePandits;
