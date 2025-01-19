'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

function Notification({ data }) {
  const [activeTab, setActiveTab] = useState('Inbox');
  const tabs = [
    { title: 'Inbox', content: 'This is the Inbox content.' },
    { title: 'General', content: 'This is the General content.' },
  ];

  console.log("data in the notification is",data)
  const handleDeleteNotification = (id) => {
    console.log(`Notification with ID ${id} deleted.`);
  };

  return (
    <div className="z-[9999999] relative">
      <h1 className="text-black font-bold">Notifications</h1>
      <hr />
      <div className="flex border-b border-gray-300">
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

      <div className="mt-4 h-60 overflow-y-scroll ">
        {/* Conditional Rendering based on activeTab */}
        {activeTab === 'Inbox' && (
          <div className="space-y-10">
            {/* {data && data.length > 0 ? (
              data.map((notification) => ( */}
                <div
                  key={data._id}
                  className="rounded-lg shadow-lg flex justify-between bg-yellow-100 text-yellow-600"
                 
                  
                >
                  <div className="flex gap-5">
                    <img
                      // src={data.pujaInfo.pujaImage}
                      alt="Puja Image"
                      style={{ height: '50px', width: '50px' }}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-slate-400">
                      New booking request for Roary Klein  on 2024-12-30T18:15:00.000Z at 11…
                        {/* {data.message} */}
                        {/* {data.userInfo.firstName}{' '}
                        {data.userInfo.lastName} requested for{' '}
                        {data.pujaInfo.pujaName} */}
                      </span>
                      <span className="text-sm text-gray-500">
                        From: Suyog Lamsal
                      </span>
                      <div className="flex gap-2">
                        
                        <p>
                          <span className="font-bold text-sm">Location:</span>{' '}
                          {data.bookingInfo?.location || 'N/A'}
                        </p>
                        <p>
                          <span className="font-bold text-sm">Rs</span>{' '}
                          {data.pujaInfo?.baseFare}
                        </p>
                      </div>
                    
                      <Link href="#" className="font-medium">
                        View All
                      </Link>
                    </div>
                  </div>
                  {/* <Button
                    variant="outline"
                    onClick={() => handleDeleteNotification(data._id)}
                  >
                    Delete
                  </Button> */}
                </div>
              {/* ))
            ) : (
              <div className="text-center text-gray-600">
                No notifications available.
              </div>
            )} */}
          </div>
        )}

        {activeTab === 'General' && (
          <div className="p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-medium">General</h2>
            <p>This is the General content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
