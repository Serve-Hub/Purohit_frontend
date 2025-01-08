'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
const Bctab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [animateTab, setAnimateTab] = useState(false);

  const handleNext = () => {
    setAnimateTab(true);
    setTimeout(() => {
      setActiveTab(2);
      setAnimateTab(false);
    }, 300); // Match animation duration
  };

  const router=useRouter()
const ckyp=async()=>{
  router.push('/user/kyp')
}
  return (
    <div className="w-full border border-gray-300 p-5 relative ">
      {/* Tab Buttons */}
      <img src="/img/diyo.png" className='absolute start-59 top-40' alt="" />
      <div className="flex gap-4 mb-5 border justify-center">
        <button
          className={`px-8 py-1 border rounded-lg focus:outline-none ${
            activeTab === 1
              ? 'bg-pg text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab(1)}
        >
        </button>
        <button
          className={`px-8 py-2 border rounded-lg focus:outline-none ${
            activeTab === 2
              ? 'bg-pg text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab(2)}
        >
        </button>
      </div>

      {/* Tab Content */}
      <div
        className={`transition-transform duration-300 ease-in-out ${
          animateTab ? 'transform scale-95 opacity-0' : ''
        }`}
      >
        {activeTab === 1 && (
          <div>
 <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-pretty lg:text-3xl font-semibold tracking-tight text-pg sm:text-5xl ">
          What You'll Do on Purohit         
           </p>
    
        </div>      
        <ul className="space-y-4 mt-5 text-slate-400" >
        <li className="flex items-start gap-3">
          <span className="text-pg text-xl">🔹</span>
          <p className="text-lg">Perform Rituals: Offer pujas, weddings, and spiritual services seamlessly.</p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-pg text-xl">🔹</span>
          <p className="text-lg">Manage Bookings: Accept and schedule ceremonies using our simple booking system.</p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-pg text-xl">🔹</span>
          <p className="text-lg">Showcase Your Skills: Create a profile to highlight your experience and services.</p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-pg text-xl">🔹</span>
          <p className="text-lg">Connect with Clients: Chat directly with customers to meet their needs.</p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-pg text-xl">🔹</span>
          <p className="text-lg">Track Your Earnings: Securely monitor payments and earnings through our system.</p>
        </li>
      </ul>


      <Button
      onClick={handleNext}
                className=" bg-pandit  text-white mt-10 ms-30 w-30"
                variant="default"
                size="default"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
                
          </div>
        )}

        {activeTab === 2 && (
            <>
        <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 text-pretty lg:text-3xl font-semibold tracking-tight text-pg sm:text-5xl ">
        How to Get Started         </p>
  
      </div>  
      <ol className="list-decimal pl-6 space-y-4 text-slate-500 mt-8">
        <li className="text-lg">
          <strong className='text-pandit'>Click the "Become a Pandit" button:</strong> Begin your journey by clicking the button to register.
        </li>
        <li className="text-lg">
          <strong className='text-pandit'>Fill Up the KYC Form:</strong> Complete the KYC (Know Your Customer) form for validation. Submit your details to ensure a smooth onboarding process.
        </li>
        <li className="text-lg">
          <strong className='text-pandit'>Access Your Dashboard:</strong> Once approved, log in to your personal dashboard to manage your services.
        </li>
        <li className="text-lg">
          <strong className='text-pandit'>Accept Puja Requests:</strong> Start receiving and accepting puja requests from customers. Manage bookings, connect with clients, and provide your services seamlessly.
        </li>
      </ol>

      <Button
                className=" bg-pandit  text-white mt-10 ms-30 w-30"
                variant="default"
                size="default"
                onClick={ckyp}
              >
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              
              </Button>
      </>
      
        )}
      </div>
    </div>
  );
};

export default Bctab;
