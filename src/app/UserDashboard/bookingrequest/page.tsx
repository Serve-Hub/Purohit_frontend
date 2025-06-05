'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '@/src/components/User/Layouts/DefaultLaout';
import Breadcrumb from '@/src/components/User/Breadcrumbs/Breadcrumb';
import AvailablePandit from '@/src/components/User/AvailablePandit';
import $axios from '@/src/lib/axios.instance';

function Page() {
  interface Booking {
    pujaID: {
      pujaName: string;
    };
    _id:string;
    status:string;
  }
  
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState<string | null>(null);
  const token = localStorage.getItem('token_id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await $axios.get("/api/v1/booking/bookings/viewBooking");

        console.log("data is",res.data.data)
        setBookingData(res.data.data.bookingsWithPanditDetails);
        setTotalPages(res.data.data.totalPages);
        if (res.data.data.bookingsWithPanditDetails.length > 0) {
          setSelectedPuja(res.data.data.bookingsWithPanditDetails[0].pujaID.pujaName);
        }
      } catch (error) {
        console.log("error is ",error)
        setError(true);
        setErrorMessage('Failed to fetch booking data');
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage, token]);

  const onPageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName='AllBookings' />
      <div className='  p-4 h-[100vh]'>
        {loading ? (
          <div className='text-center text-gray-600'>Loading...</div>
        ) : error ? (
          <div className='text-center text-red-600'>{errorMessage}</div>
        ) : bookingData.length === 0 ? (
          <div className='text-center text-gray-600'>No bookings available.</div>
        ) : (
          <div className='flex'>
            {/* Vertical Tabs */}
            <div className='w-1/6 border-r border-gray-300 me-10'>
            <h1 className='font-semibold text-xl'>Booked Pooja</h1>
            <br />
              <ul>
                {bookingData
  .filter((booking) => booking.status === "Pending").map((booking, index) => (
                  <li
                    key={index}
                    className={`p-3 cursor-pointer ${
                      selectedPuja === booking.pujaID.pujaName
                        ? 'bg-orange-100 text-pandit'
                        : 'bg-gray-100'
                    }`}
                    onClick={() => setSelectedPuja(booking.pujaID.pujaName)}
                  >
                    {booking.pujaID.pujaName}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Content Section */}
            <div className='w-full p-4'>
              <h2 className='text-2xl font-bold text-pandit'>Available Pandits for {selectedPuja}</h2>
              <br />
              {/* <p>Details for {selectedPuja} will be displayed here.</p> */}
              <AvailablePandit 
  bookingId={
    bookingData.find(booking => booking.pujaID.pujaName === selectedPuja)?._id || ''
  }
/>            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {/* <div className='flex justify-center items-center space-x-4 mt-6'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400'
          >
            Previous
          </button>

          <span className='text-lg'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400'
          >
            Next
          </button>
        </div> */}
      </div>
    </DefaultLayout>
  );
}

export default Page;
