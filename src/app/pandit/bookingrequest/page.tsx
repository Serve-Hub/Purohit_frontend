'use client'
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/src/components/pandit/Layouts/DefaultLaout";
import Breadcrumb from "@/src/components/pandit/Breadcrumbs/Breadcrumb";
import $axios from "@/src/lib/axios.instance";
import BookingrequestRow from "@/src/components/pandit/BookingrequestRow";

function page() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<any>(""); // Error state

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); 
  };


  type PujaDetails = {
    _id: string;
    adminID: string;
    pujaName: string;
    pujaImage: string;
    baseFare: number;
    category: string;
    description: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  type SenderDetails = {
    _id: string;
    avatar:string;
    coverPhoto:string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string | null;
    googleId: string | null;
    isAdmin: boolean;
    isPandit: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    bio:string;
    __v: number;
  };
  
  type Notification = {
    _id: string;
    userID: string;
    pujaID: string;
    bookingDetails:BookingDetails;
    selectedPandit: Array<any>;
    acceptedPandit: Array<any>;
    createdAt: string;
    isRead: boolean;
    message: string;
    pujaDetails: PujaDetails;
    receiverID: string;
    relatedId: string;
    relatedModel: string;
    senderDetails: SenderDetails;
    senderID: string;
    status: string;
    type: string; 
    updatedAt: string;
    __v: number;
  };
  type Location = {
    district: string;
    municipality: string;
    province: string;
    tollAddress: string;
  };
  
  type BookingDetails = {
    _id: string;
    userID: string;
    pujaID: string;
    selectedPandit: Array<any>;
    acceptedPandit: Array<string>;
    createdAt: string;
    date: string;
    location: Location;
    panditAcceptedCount: number;
    paymentStatus: string;
    status: string;
    time: string;
    updatedAt: string;
    __v: number;
  };

  const [notifications, setNotifications] = useState<Notification[]>([]); // State to store notifications

  const notificationsPerPage = 5; // Number of notifications per page
  const apiUrl = "https://purohit-backend.onrender.com/api/v1/booking/notifications";

  // Fetch notifications from the backend
  const fetchNotifications = async (page:number) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token_id");

    try {
      const response = await $axios.get("/api/v1/booking/notifications", {
        params: { page, limit: notificationsPerPage },
      });

      console.log("Response from API:", response);

      const { notifications, pagination } = response.data.data;
      setNotifications(notifications);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again later.");
      console.log("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchNotifications(page);
    }
  };




 

  // Fetch notifications when the component mounts or the page changes
  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage,refresh]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Request" />
      <div>
      <div className="max-w-5xl mx-auto p-4 h-[100vh] mb-50">
      {/* <h1 className="text-3xl font-semibold text-center mb-6 text-pandit">
        Booking Request
      </h1> */}

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-600">No notifications available.</div>
      ) : (
        <div className="space-y-10">
          {notifications.filter((notification)=>notification.type==="Booking Request").map((notification) => (
            <BookingrequestRow  notification={notification} key={notification._id} onRefresh={handleRefresh} // ✅ Pass the callback
/>
         
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
    </div>
    </DefaultLayout>

  )
}

export default page