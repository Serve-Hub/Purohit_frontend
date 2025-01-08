'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';

function Notification() {
  const [activeTab, setActiveTab] = useState('Inbox');
  
  const tabs = [
    { title: 'Inbox', content: 'This is the Inbox content.' },
    { title: 'General', content: 'This is the General content.' },
  ];

  return (
    <>
      <div>
        <h1 className='text-black font-bold'>Notifications</h1>
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

        <div className="mt-4">
          {/* Conditional Rendering based on activeTab */}
          {activeTab === 'Inbox' && (
            <div className="  rounded-md  flex gap-3">
                <img src="/img/card_1.jpg" alt="" className='w-10 h-10 rounded-full ' />
                <div className="flex flex-col gap-2">
                    <p className='font-medium'>User A <span className="text-gray-400"> requested for</span>  Puja A</p>
                    <div className="flex justify-start gap-3 text-sm">
                       <p><span className='font-bold'>Rs</span> 9000</p>
                       <p><span className='font-bold'> Address:</span>Imadol,lalitpur</p>
                      
                    </div>
                    <p className='text-gray-400 text-sm'>1 min ago</p>
<div className="flex justify-center gap-6">

                    <Button className='text-white bg-pandit'>accept</Button>
                    <Button className='text-white bg-danger'>Reject</Button>

</div>

                </div>
                <div className="rounded-full bg-pandit w-2 h-2"></div>
            </div>
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
