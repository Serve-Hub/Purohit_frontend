"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/src/components/User/Layouts/DefaultLaout";
import Breadcrumb from "@/src/components/User/Breadcrumbs/Breadcrumb";
import AvailablePandit from "@/src/components/User/AvailablePandit";
import $axios from "@/src/lib/axios.instance";

function Page() {
  interface Booking {
    pujaID: {
      pujaName: string;
    };
    _id: string;
    status: string;
  }

  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token_id");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await $axios.get("/api/v1/booking/bookings/viewBooking");

        console.log("data is", res.data.data);
        setBookingData(res.data.data.bookingsWithPanditDetails);
        setTotalPages(res.data.data.totalPages);
        if (res.data.data.bookingsWithPanditDetails.length > 0) {
          setSelectedPuja(
            res.data.data.bookingsWithPanditDetails[0].pujaID.pujaName
          );
        }
      } catch (error) {
        console.log("error is ", error);
        setError(true);
        setErrorMessage("Failed to fetch booking data");
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage, token]);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredBookings = bookingData.filter(
    (booking) => booking.status === "Pending"
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="AllBookings" />

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Booked Pooja
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle booking list"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      <div className="relative p-3 sm:p-4 md:p-6 min-h-screen bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Loading bookings...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 font-medium">{errorMessage}</p>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Pending Bookings
              </h3>
              <p className="text-gray-500">
                You don't have any pending bookings at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar - Booking List */}
            <div
              className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto w-80 sm:w-96 lg:w-80 xl:w-96
              bg-white lg:bg-transparent border-r lg:border-r-0 border-gray-200 lg:border-gray-300
              shadow-xl lg:shadow-none z-50 lg:z-auto
              transform transition-transform duration-300 ease-in-out lg:transform-none
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              lg:flex-shrink-0
            `}
            >
              {/* Mobile Close Button */}
              <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Select Pooja
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block p-4 lg:p-6 border-b border-gray-200">
                <h1 className="font-semibold text-xl xl:text-2xl text-gray-800">
                  Booked Pooja
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Select a pooja to view available pandits
                </p>
              </div>

              {/* Booking List */}
              <div className="p-4 lg:p-6 h-full lg:h-auto overflow-y-auto">
                <ul className="space-y-2 lg:space-y-3">
                  {filteredBookings.map((booking, index) => (
                    <li
                      key={index}
                      className={`
                        p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-200 border
                        ${
                          selectedPuja === booking.pujaID.pujaName
                            ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }
                      `}
                      onClick={() => {
                        setSelectedPuja(booking.pujaID.pujaName);
                        setSidebarOpen(false); // Close sidebar on mobile after selection
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm lg:text-base">
                          {booking.pujaID.pujaName}
                        </span>
                        <span
                          className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${
                            selectedPuja === booking.pujaID.pujaName
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="flex-1 min-w-0 lg:pl-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Content Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-700">
                        Available Pandits
                      </h2>
                      {selectedPuja && (
                        <p className="text-sm sm:text-base text-orange-600 mt-1">
                          for {selectedPuja}
                        </p>
                      )}
                    </div>

                    {/* Mobile Refresh Button */}
                    <button
                      onClick={() => window.location.reload()}
                      className="lg:hidden flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-6">
                  {selectedPuja ? (
                    <AvailablePandit
                      bookingId={
                        bookingData.find(
                          (booking) => booking.pujaID.pujaName === selectedPuja
                        )?._id || ""
                      }
                    />
                  ) : (
                    <div className="text-center py-12">
                      <svg
                        className="w-16 h-16 text-gray-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Select a Pooja
                      </h3>
                      <p className="text-gray-500">
                        Choose a pooja from the list to view available pandits.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default Page;
