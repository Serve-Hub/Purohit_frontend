import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "./Breadcrumbs/Breadcrumb";

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
        params: { page, limit: notificationsPerPage },
      });

      console.log("Response from API:", response);

      const { notifications, pagination } = response.data.data;
      setNotifications(notifications);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again later.");
      console.error("Error fetching notifications:", err);
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

  // Accept booking



  // Delete notification
 

  // Fetch notifications when the component mounts or the page changes
  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  return (
    <>
      {/* <Breadcrumb pageName="All Notifications" /> */}
    <div className="max-w-5xl mx-auto p-4 h-[100vh] mb-50">
      {/* <h1 className="text-3xl font-semibold text-center mb-6 text-pandit">
        All Notifications
      </h1> */}

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
                  src={notification?.pujaDetails?.pujaImage}
                  alt="Puja"
                  style={{ height: "50px", width: "50px" }}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <p>{notification?.message}</p>
                  <span className="text-sm text-gray-500">
                    From: {notification?.senderDetails?.firstName} {notification?.senderDetails?.lastName}
                  </span>

                  <div className="flex gap-2 mt-1 text-sm">
                    <p className="font-bold text-sm pe-2">Location:</p>
                    <p className="text-gray-500">
                      {notification.bookingDetails?.location.tollAddress || "N/A"},{" "}
                      {notification.bookingDetails?.location.municipality || "N/A"},{" "}
                      {notification.bookingDetails?.location.district || "N/A"},{" "}
                      {notification.bookingDetails?.location.province || "N/A"}
                    </p>
                  </div>

                  <p className="text-sm">
                    Status: <span className="font-bold">{notification?.status}</span>
                  </p>

                </div>
              </div>
  
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {notifications.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
    </>

  );
}

export default NotificationFull;
