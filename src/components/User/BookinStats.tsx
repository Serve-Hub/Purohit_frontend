"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/src/components/pandit/Breadcrumbs/Breadcrumb";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/src/components/ui/animated-modal";
import { BookA } from "lucide-react";
import $axios from "@/src/lib/axios.instance";
import AddReview from "./AddReview";
import { toast } from "@/hooks/use-toast";
import { BookingData } from "@/src/types/userType";

function BookingPage() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchloader, setFetchloader] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [stloading, setStloading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const token = localStorage.getItem("token_id");

  useEffect(() => {
    const fetchData = async () => {
      const page = currentPage;
      const limit = 4;

      try {
        const res = await $axios.get("/api/v1/booking/bookings/viewBooking");

        console.log("response is", res.data.data.bookingsWithPanditDetails);
        setBookingData(res.data.data.bookingsWithPanditDetails);
        setFetchloader(false);
        setTotalPages(res.data.data.totalPages);
      } catch (error) {
        console.log("Error occurred: ", error);
        setError(true);
        setErrorMessage("Failed to fetch booking data");
      }
    };
    fetchData();
  }, [currentPage, token]);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusUpdate = async (bookingId: string) => {
    setStloading(true);
    try {
      const response = await $axios.put(
        `/api/v1/booking/bookings/pujaStatusUpdate/${bookingId}`
      );

      console.log("response for statusupdate is", response);
      if (response.status === 200) {
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Completed" }
              : booking
          )
        );
      }
    } catch (error) {
      console.log("Error updating status:", error);
      alert("An error occurred while updating the status. Please try again.");
    } finally {
      setStloading(false);
    }
  };

  const handleStatusCancel = async (bookingId: string) => {
    setCancelLoading(true);
    try {
      const response = await $axios.put(
        `/api/v1/booking/bookigs/cancelBooking/${bookingId}`
      );

      console.log("response for statusupdate is", response);
      if (response.status === 200) {
        toast({
          title: "Update Info",
          description: "Your Booked pooja has been cancelled successfully!",
          className: "bg-green-500 border-green-500 text-white font-semibold ",
        });
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Cancelled" }
              : booking
          )
        );
      }
    } catch (error) {
      console.log("Error updating status:", error);
      toast({
        title: "Update Info",
        description:
          "An error occurred while updating the status. Please try again!",
        className: "bg-red-500 border-red-500 text-white font-semibold ",
      });
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb pageName="All Bookings" />

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500 text-white p-3 sm:p-4 fixed top-4 right-4 animate-fade-in-right w-60 sm:w-72 mb-10 rounded-md shadow-lg z-50">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-3 sm:p-4 fixed top-4 right-4 animate-fade-in-right w-60 sm:w-72 mb-10 rounded-md shadow-lg z-50">
            {errorMessage}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4 sm:mt-6">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
                  Your Bookings
                </h1>
                <p className="text-sm sm:text-base text-blue-600 mt-1">
                  Manage and track your pooja bookings
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
                <span className="text-sm sm:text-base text-blue-600 font-medium">
                  {bookingData?.length || 0} Total Bookings
                </span>
              </div>
            </div>
          </div>

          {bookingData?.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mb-4"
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                No Bookings Found
              </h3>
              <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
                You don't have any current bookings. Start by booking a pooja
                service.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden">
                {fetchloader ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                      <p className="text-gray-600 text-sm">
                        Loading bookings...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {bookingData?.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3"
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {booking?.pujaID?.pujaName}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs font-medium ${
                                  booking.status === "Completed"
                                    ? "bg-green-500 text-green-700"
                                    : booking.status === "pending"
                                    ? "bg-yellow-500 text-yellow-700"
                                    : booking.status === "Cancelled"
                                    ? "bg-red-500 text-red-700"
                                    : "bg-blue-500 text-blue-700"
                                }`}
                              >
                                {booking?.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              Rs. {booking.pujaID?.baseFare}
                            </p>
                          </div>
                        </div>

                        {/* Pandit Info */}
                        <div className="border-t border-gray-200 pt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Assigned Pandits:
                          </h4>
                          {booking.selectedPanditWithKYP.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              No Pandits finalized
                            </p>
                          ) : (
                            <div className="space-y-1">
                              {booking?.selectedPanditWithKYP?.map((a) => (
                                <p
                                  key={a?._id}
                                  className="text-sm text-gray-700"
                                >
                                  {a?.panditKYP?.panditID?.firstName}{" "}
                                  {a?.panditKYP?.panditID?.lastName}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Location */}
                        <div className="border-t border-gray-200 pt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Location:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {booking?.location?.tollAddress},{" "}
                            {booking?.location.municipality},{" "}
                            {booking?.location.district},{" "}
                            {booking?.location.province}
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="border-t border-gray-200 pt-3">
                          <Modal>
                            <ModalTrigger className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Details
                            </ModalTrigger>
                            {/* Modal Content */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                              <ModalBody>
                                <ModalContent>
                                  <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Booking Details
                                      </h2>
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                            booking.status === "Completed"
                                              ? "bg-green-500 text-green-700"
                                              : booking.status === "pending"
                                              ? "bg-yellow-500 text-yellow-700"
                                              : booking.status === "Cancelled"
                                              ? "bg-red-500 text-red-700"
                                              : "bg-blue-500 text-blue-700"
                                          }`}
                                        >
                                          {booking?.status}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {booking.selectedPanditWithKYP.length >
                                      0 && (
                                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-3">
                                          Booking Actions
                                        </h3>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                          {booking?.status === "Cancelled" ? (
                                            <button
                                              className="px-4 py-2 bg-red-500 text-white rounded-md flex justify-center items-center gap-2"
                                              disabled
                                            >
                                              <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                              </svg>
                                              Already Cancelled
                                            </button>
                                          ) : booking?.status ===
                                            "Completed" ? (
                                            <button
                                              className="px-4 py-2 bg-green-500 text-white rounded-md flex justify-center items-center gap-2"
                                              disabled
                                            >
                                              <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                              </svg>
                                              Completed
                                            </button>
                                          ) : (
                                            <>
                                              <button
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex justify-center items-center gap-2 transition-colors duration-200"
                                                onClick={() =>
                                                  handleStatusUpdate(
                                                    booking?._id
                                                  )
                                                }
                                                disabled={stloading}
                                              >
                                                {stloading ? (
                                                  <>
                                                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                    <span>Updating...</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <svg
                                                      className="w-5 h-5"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                      />
                                                    </svg>
                                                    Mark Complete
                                                  </>
                                                )}
                                              </button>
                                              <button
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex justify-center items-center gap-2 transition-colors duration-200"
                                                onClick={() =>
                                                  handleStatusCancel(
                                                    booking?._id
                                                  )
                                                }
                                                disabled={cancelLoading}
                                              >
                                                {cancelLoading ? (
                                                  <>
                                                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                    <span>Canceling...</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <svg
                                                      className="w-5 h-5"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                      />
                                                    </svg>
                                                    Cancel Booking
                                                  </>
                                                )}
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Pandit Information */}
                                    <div className="space-y-6">
                                      <div>
                                        <h3 className="text-lg font-bold border-b pb-2 mb-4">
                                          Pandit Information
                                        </h3>
                                        {booking?.selectedPanditWithKYP
                                          .length === 0 ? (
                                          <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                                            No Pandits finalized
                                          </p>
                                        ) : (
                                          <div className="space-y-4">
                                            {booking?.selectedPanditWithKYP.map(
                                              (a) => (
                                                <div
                                                  key={a?._id}
                                                  className="border border-gray-200 p-4 sm:p-6 rounded-lg bg-gray-50"
                                                >
                                                  {/* Pandit Header */}
                                                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                                                    <img
                                                      src={
                                                        a.panditKYP?.panditID
                                                          ?.avatar ||
                                                        "/img/default-avatar.png"
                                                      }
                                                      alt="Pandit Photo"
                                                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-300"
                                                    />
                                                    <div className="flex-1">
                                                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                                        {
                                                          a?.panditKYP?.panditID
                                                            ?.firstName
                                                        }{" "}
                                                        {
                                                          a?.panditKYP?.panditID
                                                            ?.lastName
                                                        }
                                                      </h4>
                                                      <p className="text-sm text-gray-600">
                                                        Phone:{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.phoneNumber
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>

                                                  {/* Pandit Details Grid */}
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                      <h5 className="font-medium text-gray-700 mb-1">
                                                        Permanent Address:
                                                      </h5>
                                                      <p className="text-gray-600">
                                                        {
                                                          a?.panditKYP
                                                            ?.permanentAddress
                                                            ?.tolAddress
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.permanentAddress
                                                            ?.municipality
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.permanentAddress
                                                            ?.district
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.permanentAddress
                                                            ?.province
                                                        }
                                                      </p>
                                                    </div>
                                                    <div>
                                                      <h5 className="font-medium text-gray-700 mb-1">
                                                        Temporary Address:
                                                      </h5>
                                                      <p className="text-gray-600">
                                                        {
                                                          a?.panditKYP
                                                            ?.temporaryAddress
                                                            ?.tolAddress
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.temporaryAddress
                                                            ?.municipality
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.temporaryAddress
                                                            ?.district
                                                        }
                                                        ,{" "}
                                                        {
                                                          a?.panditKYP
                                                            ?.temporaryAddress
                                                            ?.province
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                      <h5 className="font-medium text-gray-700 mb-1">
                                                        Date of Birth:
                                                      </h5>
                                                      <p className="text-gray-600">
                                                        {
                                                          a?.panditKYP
                                                            ?.dateOfBirth?.day
                                                        }
                                                        -
                                                        {
                                                          a?.panditKYP
                                                            ?.dateOfBirth?.month
                                                        }
                                                        -
                                                        {
                                                          a?.panditKYP
                                                            ?.dateOfBirth?.year
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>

                                                  {/* Review Section */}
                                                  {booking?.status ===
                                                    "Completed" && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                      <AddReview
                                                        panditId={a?.panditID}
                                                        pujaId={
                                                          booking?.pujaID?._id
                                                        }
                                                        bookingId={booking?._id}
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      {/* Booking Information */}
                                      <div>
                                        <h3 className="text-lg font-bold border-b pb-2 mb-4">
                                          Booking Information
                                        </h3>
                                        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg space-y-3">
                                          <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-medium text-gray-700">
                                              Puja Name:
                                            </span>
                                            <span className="text-gray-900">
                                              {booking?.pujaID?.pujaName}
                                            </span>
                                          </div>
                                          <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-medium text-gray-700">
                                              Amount:
                                            </span>
                                            <span className="text-gray-900 font-semibold">
                                              Rs {booking?.pujaID?.baseFare}
                                            </span>
                                          </div>
                                          <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-medium text-gray-700">
                                              Puja Date:
                                            </span>
                                            <span className="text-gray-900">
                                              {booking?.date
                                                ? new Date(
                                                    booking.date
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </ModalContent>
                              </ModalBody>
                            </div>
                          </Modal>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Puja Name
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Pandit Name
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Location
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchloader ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                            <p className="text-gray-600">Loading bookings...</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      bookingData?.map((booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6">
                            <h5 className="font-medium text-gray-900">
                              {booking?.pujaID?.pujaName}
                            </h5>
                          </td>
                          <td className="py-4 px-6">
                            {booking.selectedPanditWithKYP.length === 0 ? (
                              <p className="text-gray-500">
                                No Pandits finalized
                              </p>
                            ) : (
                              <div className="space-y-1">
                                {booking?.selectedPanditWithKYP?.map((a) => (
                                  <p key={a?._id} className="text-gray-700">
                                    {a?.panditKYP?.panditID?.firstName}{" "}
                                    {a?.panditKYP?.panditID?.lastName}
                                  </p>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-gray-700 text-sm">
                              {booking?.location?.tollAddress},{" "}
                              {booking?.location.municipality},{" "}
                              {booking?.location.district},{" "}
                              {booking?.location.province}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                booking.status === "Completed"
                                  ? "bg-green-500 text-green-700"
                                  : booking.status === "pending"
                                  ? "bg-yellow-500 text-yellow-700"
                                  : booking.status === "Cancelled"
                                  ? "bg-red-500 text-red-700"
                                  : "bg-blue-500 text-blue-700"
                              }`}
                            >
                              {booking?.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-gray-900">
                              Rs. {booking.pujaID?.baseFare}
                            </p>
                          </td>
                          <td className="py-4 px-6">
                            <Modal>
                              <ModalTrigger className="flex items-center justify-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </ModalTrigger>
                              {/* Same modal content as mobile view */}
                            </Modal>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-2 text-sm font-medium text-gray-700">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
