'use client'
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/src/components/pandit/Layouts/DefaultLaout";
import LetterAvatar from "@/src/components/LetterAvatar";
import Breadcrumb from "@/src/components/pandit/Breadcrumbs/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/src/components/ui/animated-modal";
import $axios from "@/src/lib/axios.instance";
import UserProfile from "@/src/components/pandit/UserProfile";

function page() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<any>(""); // Error state
  const{toast}=useToast();



  type PujaDetails = {
    _id: string;
    adminID: string;
    pujaName: string;
    pujaImage: string;
    baseFare: number;
    category: string;
    description: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  type SenderDetails = {
    _id: string;
    avatar:string;
    coverPhoto:string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string | null;
    googleId: string | null;
    isAdmin: boolean;
    isPandit: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    bio:string;
    __v: number;
  };
  
  type Notification = {
    _id: string;
    userID: string;
    pujaID: string;
    bookingDetails:BookingDetails;
    selectedPandit: Array<any>;
    acceptedPandit: Array<any>;
    createdAt: string;
    isRead: boolean;
    message: string;
    pujaDetails: PujaDetails;
    receiverID: string;
    relatedId: string;
    relatedModel: string;
    senderDetails: SenderDetails;
    senderID: string;
    status: string;
    type: string; 
    updatedAt: string;
    __v: number;
  };
  type Location = {
    district: string;
    municipality: string;
    province: string;
    tollAddress: string;
  };
  
  type BookingDetails = {
    _id: string;
    userID: string;
    pujaID: string;
    selectedPandit: Array<any>;
    acceptedPandit: Array<string>;
    createdAt: string;
    date: string;
    location: Location;
    panditAcceptedCount: number;
    paymentStatus: string;
    status: string;
    time: string;
    updatedAt: string;
    __v: number;
  };

  const [notifications, setNotifications] = useState<Notification[]>([]); // State to store notifications

  const notificationsPerPage = 5; // Number of notifications per page
  const apiUrl = "https://purohit-backend.onrender.com/api/v1/booking/notifications";

  // Fetch notifications from the backend
  const fetchNotifications = async (page:number) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token_id");

    try {
      const response = await $axios.get("/api/v1/booking/notifications", {
        params: { page, limit: notificationsPerPage },
      });

      console.log("Response from API:", response);

      const { notifications, pagination } = response.data.data;
      setNotifications(notifications);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again later.");
      console.log("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchNotifications(page);
    }
  };

  // Accept booking
  const handleAccept = async (notificationId) => {
    console.log("notification id ",notificationId)
    const token = localStorage.getItem("token_id");
    try {
      const res = await $axios.put(`/api/v1/booking/notifications/accept/${notificationId}`, {});


      console.log("Booking Accepted:", res.data);
toast({
  title:"Booking accepted successfully!",
  className:"bg-green-100 text-success"
})
     
    } catch (error) {
      console.log("Error accepting booking:", error);
      toast({
        title:"Booking accepted successfully!",
        className:"bg-red-100 text-danger"
      })
      alert("Failed to accept booking. Please try again.");
    }
    fetchNotifications(currentPage);

  };

  // Reject booking
  const handleReject = async (notificationId:number) => {
    const token = localStorage.getItem("token_id");

    try {
      await $axios.put(`/api/v1/booking/notifications/reject/${notificationId}`, {});


      console.log("Booking Rejected");
      toast({
        title:"Booking Rejected successfully!",
        className:"bg-red-100 text-danger"
      })
    } catch (error) {
      console.log("Error rejecting booking:", error);
      alert("Failed to reject booking. Please try again.");
    }
    fetchNotifications(currentPage);

  };


 

  // Fetch notifications when the component mounts or the page changes
  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Request" />
      <div>
      <div className="max-w-5xl mx-auto p-4 h-[100vh] mb-50">
      {/* <h1 className="text-3xl font-semibold text-center mb-6 text-pandit">
        Booking Request
      </h1> */}

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-600">No notifications available.</div>
      ) : (
        <div className="space-y-10">
          {notifications.filter((notification)=>notification.type==="Booking Request").map((notification) => (
            <div
              key={notification._id}
              className="p-4 rounded-lg shadow-lg flex justify-between bg-orange-100 text-orange-400"
              
            >
              <div className="flex gap-5 justify-between">
                <div className="
                    flex flex-col items-center
                ">
                 
                    {
                    notification.senderDetails.avatar?(

                            <img
                            src={notification.senderDetails.avatar}
                            alt="Puja"
                            style={{ height: "50px", width: "50px" }}
                            className="rounded-full"
                          />
                          
 
                        
                    ):(
                     
                            <LetterAvatar name={notification.senderDetails.firstName} size={40}/>
                  
                    
                        
                    )
                
                }
                  <Modal>
                                          <ModalTrigger className=" dark:bg-white dark:text-black text-black flex  gap-3 items-center group/modal-btn">
                                           
                                              <p>
                                              View Profile 
                                                </p>
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
                                          <div className="fixed top-10 start-10 border border-black z-9999">
                                            <ModalBody>
                                              <ModalContent>
                                                <>
                                                <UserProfile user={notification.senderDetails}/>
                                              </>
                                               
                                              </ModalContent>
                                            </ModalBody>
                                          </div>
                   </Modal>
          </div>

               
                <div className="flex flex-col">
                  <p>{notification.message}</p>
                  <span className="text-sm text-gray-500">
                    From: {notification.senderDetails.firstName} {notification.senderDetails.lastName}   
                  
                  </span>

                  <div className="flex gap-2 mt-1 text-sm">
                    <p className="font-bold text-sm pe-2">Location:</p>
                    <p className="text-gray-500">
                      {notification?.bookingDetails?.location?.tollAddress || "N/A"},{" "}
                      {notification.bookingDetails?.location?.municipality || "N/A"},{" "}
                      {notification.bookingDetails?.location?.district || "N/A"},{" "}
                      {notification.bookingDetails?.location?.province || "N/A"}
                    </p>
                  </div>

                  <p className="text-sm">
                    Status: <span className="font-bold">{notification.status}</span>
                  </p>
                  

                </div>
              </div>
   
              <div className="flex gap-3 justify-between  p-4 mt-4 rounded-lg">
                {notification.status==="Pending"?(
                     <>
                         <button
  onClick={() => handleAccept(notification._id)}
  className="px-4 py-2 rounded-md bg-green-400 text-white text-sm font-medium hover:bg-green-600 transition"
        >
          Accept
        </button>
        <button
  onClick={() => handleReject(notification._id)}
  className="px-4 py-2 rounded-md bg-red-400 text-white text-sm font-medium hover:bg-red-600 transition"
        >
          Reject
        </button>
                     </>
                ):(
                    <button
                    // onClick={() => handleReject(notification._id)}
                    className="shadow px-4 py-2 rounded-md bg-slate-100 text-slate-600 text-sm font-medium hover:bg-red-600 transition"
                          disabled
                          >
                            {notification.status}
                          </button>
                )
                
               

                }
    
      </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {notifications.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
    </div>
    </DefaultLayout>

  )
}

export default page