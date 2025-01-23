'use client';
import React, { useState,useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from 'axios';


function Notification() {

// function Notification({ data }) {
 const [notifications, setNotifications] = useState([]); // State to store notifications
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  
  const notificationsPerPage = 5; // Number of notifications per page
  const apiUrl = "https://purohit-backend.onrender.com/api/v1/booking/notifications"; 
  
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
      const { notifications, pagination } = response.data.data;
      setNotifications(notifications);
      console.log("notifications in bell",notifications)
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again later.");
      console.log("ërror is ",err)
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchNotifications(currentPage);
    }, [currentPage]);


  const [activeTab, setActiveTab] = useState('Inbox');
  // const tabs = [
  //   { title: 'Inbox', content: 'This is the Inbox content.' },
  //   { title: 'General', content: 'This is the General content.' },
  // ];

  console.log("data in the notification is",data)


  return (
    <div className="z-[9999999] relative">
      <h1 className="text-pandit font-bold">Notifications</h1>
      <hr />
      {/* <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(tab.title)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.title
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div> */}

      <div className="mt-4 h-60 overflow-y-scroll">
  {/* Conditional Rendering based on activeTab */}
  {/* {activeTab === "Inbox" && ( */}
    <div>
    
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
              className={`p-4 rounded-lg shadow-lg flex justify-between bg-yellow-100 text-yellow-500
              }`}
            >
              <div className="flex gap-5">
                <img
                  src={notification.pujaDetails.pujaImage}
                  alt="User"
                  style={{ height: "50px", width: "50px" }}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <p className='text-sm'>{notification.message}</p>
                  <span className="text-sm text-gray-500">From: {notification.senderDetails.firstName}  {notification.senderDetails.lastName}</span>
                  <div className="flex flex-col  mt-1 text-sm">
                    <p className='text-sm'>
                      <span className="font-bold text-sm">Location:</span>{" "}
                    </p>
                    <p className='text-gray-500'>

                      {notification.bookingDetails.location.municipality || "N/A"}   {notification.bookingDetails.location.tollAddress|| "N/A"}
                    </p>
                  <p className='text-gray-500'>
                      {notification.bookingDetails.location.province || "N/A"}   {notification.bookingDetails.location.district|| "N/A"}

                  </p>
                    
                  </div>
                    <p>
                      <span className="font-bold text-sm">Rs:</span>{" "}
                      {notification.pujaDetails.baseFare || "N/A"}
                    </p>
              
                </div>
              </div>
           
            </div>
          ))}
        </div>
      )}
    </div>
  {/* )} */}

  {/* {activeTab === "General" && (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-medium">General</h2>
      <p>This is the General content.</p>
    </div>
  )} */}
</div>
<Link
  href="/user/Dashboard"
  className="w-full text-center inline-block font-medium text-orange-500 border border-orange-500 hover:text-orange-700 transition-colors duration-300 px-4 py-3 mb-2 rounded-md shadow-sm hover:shadow-md"
>
  View All Notifications
</Link>
    </div>
  );
}

export default Notification;
