import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
function PujaCard({puja}) {
    const [isBookLoading, setIsBookLoading] = useState(false);

  return (
    <div
    key={puja._id}
    className="w-[330px] h-auto mx-auto border rounded-lg overflow-hidden shadow-lg bg-white relative"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 absolute top-2 end-2 text-white font-extrabold rounded-full bg-black z-999 p-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>

    <div
      className="w-full h-48 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${
          puja.pujaImage || "/img/default-puja.jpg"
        }')`,
      }}
    >
      <p className="text-sm text-white absolute bg-pandit bottom-2 start-2 p-2 rounded-xl">
        {puja.category}
      </p>
    </div>
    <div className="p-4">
      <h2 className="text-xl font-bold">{puja.pujaName}</h2>
      <p className="mt-2 text-gray-500">{puja.description}</p>
      <div className="mt-4 flex flex-col justify-start items-start gap-2">
        <div className="flex justify-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-pandit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-lg text-gray-500">
            {puja.duration} hrs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-pandit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <p className="text-gray-500">
            {puja.panditsRequired} pandits required
          </p>
        </div>
        <div className="flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-pandit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-lg font-semibold"> {puja.baseFare}</p>
        </div>
      </div>
    </div>
    <div className="p-4">
      <Link
        onClick={() => setIsBookLoading(true)}
        href={`/user/viewPuja/${puja._id}`}
        className="w-full px-4 py-2 bg-[#F25B2C] bg-opacity-70 text-white rounded-md hover:bg-pandit flex justify-center items-center"
      >
        {isBookLoading ? (
          <div className="flex justify-center items-center space-x-3">
            {/* Loading Animation */}
            <span className="text-white font-medium">
              Processing
            </span>
            <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "Book Now"
        )}
      </Link>
    </div>
  </div>
  )
}

export default PujaCard