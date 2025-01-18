import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function NotificationFull() {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const notificationsPerPage = 5; // Number of notifications per page
  const apiUrl = "https://purohit-backend.onrender.com/api/v1/booking/notifications";

  // Fetch notifications from the backend
  const fetchNotifications = async (page) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token_id");
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit: notificationsPerPage }
      });
console.log("response from view notification",response)
      const { notifications: data, pagination } = response.data.data;
      setNotifications(data);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again later.");
      console.log("ërror is ",err)
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchNotifications(page);
    }
  };

  // Delete notification handler (for now, just a console log)
  const handleDeleteNotification = (id) => {
    console.log(`Notification with ID ${id} deleted.`);
  };

  // Fetch notifications when the component mounts or the page changes
  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-pandit">
        All Notifications
      </h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-600">No notifications available.</div>
      ) : (
        <div className="space-y-10">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg shadow-lg flex justify-between ${
                notification.type === "info"
                  ? "bg-blue-100 text-blue-800"
                  : notification.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : notification.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <div className="flex gap-5 justify-between">
                <img
                  src={notification.userImg || "/img/default_user.jpg"}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {notification.username} requested for {notification.pujaName}
                  </span>
                  <div className="flex gap-2">
                    <p>{notification.address}</p>
                    <p>
                      <span className="font-bold">Rs</span>
                      {notification.offeredPrice}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                  <Link href="#" className="font-medium">
                    View Profile
                  </Link>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-md bg-green-400 text-white text-sm font-medium hover:bg-green-600 transition">
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="px-4 py-2 rounded-md bg-red-400 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {notifications.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationFull;
