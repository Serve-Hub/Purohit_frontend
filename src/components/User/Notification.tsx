'use client';
import React, { useState ,useRef,useEffect, useContext} from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AuthContext } from '@/src/context/authcontext';

function Notification() {
  const [activeTab, setActiveTab] = useState('Inbox');
  // const notifications = [
  //   {
  //     id: 1,
  //     username:"user A",
  //     puja:"pujaA",
  //     type: 'info',
  //     offeredPrice:90,
  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  //   {
  //     id: 2,
  //     username:"user A",
  //     puja:"pujaA",
  //     offeredPrice:90,

  //           type: 'success',
  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'

  //   },
  //   {
  //     id: 3,
  //     username:"user A",
  //     puja:"pujaA",
  //     offeredPrice:90,

  //           type: 'error',
  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  //   {
  //     id: 4,

  //     username:"user A",
  //     puja:"pujaA",
  //           type: 'warning',
  //     offeredPrice:90,

  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  //   {
  //     id: 5,
  //     username:"user A",
  //     puja:"pujaA",
  //     type: 'info',
  //     offeredPrice:90,

  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  //   {
  //     id: 6,
  //     username:"user A",
  //     puja:"pujaA",
  //           type: 'warning',
  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  //   {
  //     id: 7,
  //     username:"user A",
  //     puja:"pujaA",
  //     offeredPrice:90,

  //           type: 'success',
  //     timestamp: new Date().toISOString(),
  //     userimg:'/img/card_1.jpg',
  //     Address:' aksdhsa Imadol,Lalitpur'
  //   },
  // ];
 
  const tabs = [
    { title: 'Inbox', content: 'This is the Inbox content.' },
    { title: 'General', content: 'This is the General content.' },
  ];
    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const notificationsPerPage = 5; // Number of notifications per page
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);
  
    const startIndex = (currentPage - 1) * notificationsPerPage;
    const currentNotifications = notifications.slice(
      startIndex,
      startIndex + notificationsPerPage
    );


  

  const handleDeleteNotification = (id) => {
    console.log(`Notification with ID ${id} deleted.`);
  };



  return (
    <>
      <div className='z-[9999999] relative '>
        <h1 className='text-black font-bold'>Notifications</h1>
        <hr />
        <div className="flex border-b border-gray-300 ">
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
        </div>

        <div className="mt-4 h-60 overflow-y-scroll border ">
          {/* Conditional Rendering based on activeTab */}
          {activeTab === 'Inbox' && (
            <>
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
   
    
    </div>
            
            </div>
          ))
        )}
      </div>
            </>
          )}

          {activeTab === 'General' && (
            
            <div className="p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-medium">General</h2>
              <p>This is the General content.</p>
              {/* Add more dynamic content here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notification;
