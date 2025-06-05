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

  const[cancelLoading,setCancelLoading]=useState(false);
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

  const onPageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusUpdate = async (bookingId: string) => {
    setStloading(true); // Show loading state
    try {
      // Send the API request to update the status
      const response = await $axios.put(
        `/api/v1/booking/bookings/pujaStatusUpdate/${bookingId}`
      );

      console.log("response for statusupdate is", response);
      // If the request is successful, update the completed state
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
      setStloading(false); // Hide loading state after the request completes
    }
  };
  const handleStatusCancel = async (bookingId: string) => {
    setCancelLoading(true); // Show loading state
    try {
      // Send the API request to update the status
      const response = await $axios.put(
        `/api/v1/booking/bookigs/cancelBooking/${bookingId}`
      );

      console.log("response for statusupdate is", response);
      // If the request is successful, update the completed state
      if (response.status === 200) {
        toast({
          title: "Update Info",
          description: "Your Booked pooja has been cancelled successfully!",
          className:"bg-green-500 border-green-500 text-white font-semibold "
        }) 
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
              description: "An error occurred while updating the status. Please try again!",
              className:"bg-red-500 border-red-500 text-white font-semibold "
            }) 
    } finally {
      setCancelLoading(false); // Hide loading state after the request completes
    }
  };

  return (
    <>
      {bookingData?.length === 0 ? (
        <p className="text-center py-4">You have no current bookings</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          {success && (
            <div className="bg-success text-white p-3 fixed top-11 right-3 animate-fade-in-right w-60 mb-10 rounded-md">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-danger text-white p-3 fixed top-11 right-3 animate-fade-in-right w-60 mb-10 rounded-md">
              {errorMessage}
            </div>
          )}

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Puja Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Pandit Name
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Location
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchloader ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <div className="w-[15px] aspect-square rounded-full animate-l5 my-10 mx-auto"></div>
                  </td>
                </tr>
              ) : (
                bookingData?.map((booking) => (
                  <tr key={booking._id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {booking?.pujaID?.pujaName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex  flex-col gap-2">
                      {booking.selectedPanditWithKYP.length === 0 ? (
                        <p>No Pandits finalized</p>
                      ) : (
                        booking?.selectedPanditWithKYP?.map((a) => {
                          return (
                            <div
                              className="text-black dark:text-white gap-1"
                              key={a?._id}
                            >
                              <p>
                                {a?.panditKYP?.panditID?.firstName}
                                {a?.panditKYP?.panditID?.lastName}
                              </p>
                            </div>
                          );
                        })
                      )}

                      {/* {booking.panditDetails[0].firstName} */}
                      {/* {new Date(booking.bookingDate).toLocaleDateString()} */}
                      <p className="text-black dark:text-white flex gap-2">
                        {/* {booking.panditDetails[0].lastName}                   */}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {booking?.location?.tollAddress}{" "}
                        {booking?.location.municipality}{" "}
                        {booking?.location.district}{" "}
                        {booking?.location.province}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                          booking.status === "Completed"
                            ? "bg-success text-success"
                            : booking.status === "pending"
                            ? "bg-warning text-warning"
                            : booking.status === "Cancelled"
                            ? "bg-danger text-danger"
                            : "bg-primary text-primary"
                        }`}
                      >
                        {booking?.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        Rs. {booking.pujaID?.baseFare}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Modal>
                          <ModalTrigger className="dark:bg-white dark:text-black text-black flex justify-center group/modal-btn">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </ModalTrigger>
                          <div className="fixed top-10 start-10 border border-black ">
                            <ModalBody>
                              <ModalContent>
                                <div
                                  className="bg-white p-6 rounded-lg w-full "
                                  onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                                >
                                  <h2 className="text-xl font-bold mb-4">
                                    Booking Information
                                  </h2>
                                  <div className="flex gap-4 items-center">
                                  {booking.selectedPanditWithKYP.length === 0 ? (
                                    <></>
                                  ):(
                                      <>
                                           {booking?.status === "Cancelled"?  ( 
                                     
                                  <>
                                       <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md w-60 flex justify-center gap-3"
                                        disabled
                                      >
                                        Already Cancelled
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="size-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                          />
                                        </svg>
                                      </button>
                                  </>
                                           
                                  ):(
<>

{booking?.status === "Completed" ?  (
  <button
    className="px-4 py-2 bg-green-500 text-white rounded-md w-60 flex justify-center gap-3"
    disabled
  >
    Already Completed
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  </button>
) : (
  <>
    <h2>Is it completed?</h2>
    <button
      className="px-4 py-2 bg-green-500 text-white rounded-md w-40 flex justify-center items-center gap-3"
      onClick={() =>
        handleStatusUpdate(booking?._id)
      } // Correctly passing the booking._id
      disabled={stloading} // Assuming stloading is a loading state
    >
      {stloading?(
        <>
        Wait
<div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        
        </>
      ):(
<>
Done
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
</>
      )}
    
    </button>
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-md w-40 flex justify-center items-center gap-3"
      onClick={() =>
        handleStatusCancel(booking?._id)
      } // Correctly passing the booking._id
      disabled={cancelLoading} // Assuming stloading is a loading state
    >
      {cancelLoading?(
      <>
      Canceling
<div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

      </>
      ):(
<>
Cancel
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
</>
      )}
     
    </button>
  </>
)}
</>
                                  )}
                                    
                      
                                    </>
                                 )}

                                  </div>

                                  <div
                                    // key={pandit.panditID}
                                    className="space-y-8  p-4 rounded-md"
                                  >
                                    {/* Personal Information Section */}
                                    <div className="flex flex-col space-y-4">
                                      <h2 className="text-lg font-bold border-b pb-2">
                                        Pandit Information
                                      </h2>

                                      {booking?.selectedPanditWithKYP.length ===
                                      0 ? (
                                        <p>No Pandits finalized</p>
                                      ) : (
                                        booking?.selectedPanditWithKYP.map(
                                          (a) => {
                                            return (
                                              <div className="border p-4 flex flex-col gap-4 ">
                                                <div className="flex justify-end">
                                                  <img
                                                    src={
                                                      a.panditKYP?.panditID
                                                        ?.avatar
                                                    }
                                                    alt="Pandit Photo"
                                                    className="w-24 h-24  object-cover mr-4 border border-black"
                                                  />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                  {/* Pandit Photo */}
                                                  <strong>Name:</strong>{" "}
                                                  <div>
                                                    <span className="ms-2">
                                                      {
                                                        a?.panditKYP?.panditID
                                                          ?.firstName
                                                      }
                                                    </span>
                                                    <span className="ms-3">
                                                      {
                                                        a?.panditKYP?.panditID
                                                          ?.lastName
                                                      }{" "}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="flex justify-between">
                                                  <strong>Phone Number:</strong>{" "}
                                                  <span>
                                                    {a?.panditKYP?.phoneNumber}
                                                  </span>
                                                </div>
                                                {/* <div className="flex justify-between">
                                                            <strong>Status:</strong>{" "}
                                                            <span>{pandit.status}</span>
                                                          </div> */}
                                                <div className="flex justify-between">
                                                  <strong>
                                                    Permanent Address:
                                                  </strong>
                                                  <span>
                                                    {
                                                      a?.panditKYP
                                                        ?.permanentAddress
                                                        ?.tolAddress
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.permanentAddress
                                                        ?.municipality
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.permanentAddress
                                                        ?.district
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.permanentAddress
                                                        ?.province
                                                    }
                                                    ,
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <strong>
                                                    Temporary Address:
                                                  </strong>
                                                  <span>
                                                    {
                                                      a?.panditKYP
                                                        ?.temporaryAddress
                                                        ?.tolAddress
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.temporaryAddress
                                                        ?.municipality
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.temporaryAddress
                                                        ?.district
                                                    }
                                                    ,
                                                    {
                                                      a?.panditKYP
                                                        ?.temporaryAddress
                                                        ?.province
                                                    }
                                                    ,
                                                    {/* {pandit.temporaryAddress &&
                                                                `${pandit.temporaryAddress.province}, ${pandit.temporaryAddress.district}, ${pandit.temporaryAddress.municipality}, ${pandit.temporaryAddress.tolAddress}`} */}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <strong>
                                                    Date of Birth:
                                                  </strong>
                                                  <span>
                                                    {
                                                      a?.panditKYP?.dateOfBirth
                                                        ?.day
                                                    }
                                                    -{" "}
                                                    {
                                                      a?.panditKYP?.dateOfBirth
                                                        ?.month
                                                    }
                                                    -{" "}
                                                    {
                                                      a?.panditKYP?.dateOfBirth
                                                        ?.year
                                                    }
                                                    {/* {pandit.dateOfBirth &&
                                                                `${pandit.dateOfBirth.day}-${pandit.dateOfBirth.month}-${pandit.dateOfBirth.year}`} */}
                                                  </span>
                                                </div>

                                                {booking?.status ===
                                                  "Completed" && (
                                                  <AddReview
                                                    panditId={a?.panditID}
                                                    pujaId={
                                                      booking?.pujaID?._id
                                                    }
                                                    bookingId={booking?._id}
                                                  />
                                                )}
                                              </div>
                                            );
                                          }
                                        )
                                      )}
                                    </div>

                                    {/* Professional and Education Section */}
                                    <div className="flex flex-col space-y-4 mt-8">
                                      <h2 className="text-lg font-bold border-b pb-2">
                                        Full Booking Information
                                      </h2>
                                      <div className="flex justify-between">
                                        <strong>Puja Name :</strong>{" "}
                                        <span>{booking?.pujaID?.pujaName}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <strong>Fixed Amount:</strong>{" "}
                                        <span>
                                          Rs {booking?.pujaID?.baseFare}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <strong>Puja Date:</strong>{" "}
                                        {booking?.date 
      ? new Date(booking.date).toLocaleDateString() 
      : "N/A"}
                                        {/* <span>{booking?.date}</span> */}
                                      </div>
                                    </div>

                                    {/* Accept and Reject Buttons */}
                                  </div>
                                </div>
                              </ModalContent>
                            </ModalBody>
                          </div>
                        </Modal>

                        {/* <button className="hover:text-primary">
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Previous
            </button>

            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingPage;
