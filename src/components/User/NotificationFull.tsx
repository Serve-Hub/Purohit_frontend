import React, { useState } from 'react';
import Link from 'next/link';
function NotificationFull() {
  // Static data for notifications
  const notifications = [
    {
      id: 1,
      username:"user A",
      puja:"pujaA",
      type: 'info',
      offeredPrice:90,
      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
    {
      id: 2,
      username:"user A",
      puja:"pujaA",
      offeredPrice:90,

            type: 'success',
      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'

    },
    {
      id: 3,
      username:"user A",
      puja:"pujaA",
      offeredPrice:90,

            type: 'error',
      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
    {
      id: 4,

      username:"user A",
      puja:"pujaA",
            type: 'warning',
      offeredPrice:90,

      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
    {
      id: 5,
      username:"user A",
      puja:"pujaA",
      type: 'info',
      offeredPrice:90,

      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
    {
      id: 6,
      username:"user A",
      puja:"pujaA",
            type: 'warning',
      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
    {
      id: 7,
      username:"user A",
      puja:"pujaA",
      offeredPrice:90,

            type: 'success',
      timestamp: new Date().toISOString(),
      userimg:'/img/card_1.jpg',
      Address:' aksdhsa Imadol,Lalitpur'
    },
  ];

  // Static disaster alert
  const alertMessage = 'Severe weather conditions expected tomorrow. Stay safe!';

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const notificationsPerPage = 5; // Number of notifications per page
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Delete notification handler (for now, just a console log)
  const handleDeleteNotification = (id) => {
    console.log(`Notification with ID ${id} deleted.`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-pandit"> All Notifications</h1>

      <div className="space-y-10">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-600">No notifications available.</div>
        ) : (
          currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg flex justify-between   ${
                notification.type ==='info'
                  ? 'bg-blue-100 text-blue-800'
                  : notification.type === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : notification.type === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <div className="flex gap-5 justify-between">
                <img src={notification.userimg}
                 alt=""
                 style={{ height: "50px", width: "50px" }}
                 className='rounded-full'
                 />
              <div className="flex flex-col">
                <span className="font-semibold">{notification.username} requested for {notification.puja}</span>
              <div className="flex gap-2">
              <p>{notification.Address}</p>

              <p className=''><span className='font-bold'>Rs</span>{notification.offeredPrice}</p>

              </div>
              <span className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>

      <Link href="#" className='font-medium'>
      
      View Profile
    
      </Link> 
   

    
              
              </div>
          
              </div>
              <div className="flex justify-between items-center ">
      <div className="flex gap-3">
      
        <button className="px-4 py-2 rounded-md bg-green-400 text-white text-sm font-medium hover:bg-pandit-dark transition">
          Accept
        </button>
        <button 
         onClick={() => handleDeleteNotification(notification.id)}
        className="px-4 py-2 rounded-md bg-red-400 text-white text-sm font-medium hover:bg-danger-dark transition">
          Dismiss
        </button>
      </div>
    
    </div>
            
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {notifications.length > notificationsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'
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
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Display the disaster alert message at the bottom */}
      {alertMessage && (
        <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-800">
          <h2 className="font-semibold">Disaster Alert</h2>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
}

export default NotificationFull;
