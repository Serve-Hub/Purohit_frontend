'use client';
import { useToast } from '@/hooks/use-toast';
import $axios from '@/src/lib/axios.instance';
import React, { useState,useEffect } from 'react'
import LetterAvatar from '../LetterAvatar';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/src/components/ui/animated-modal"
import UserProfile from "@/src/components/pandit/UserProfile";
import { User } from '@/src/types/userType';


interface SenderDetails {
  firstName: string;
  lastName: string;
  avatar?: string;
}


interface BookingLocation {
  tollAddress?: string;
  municipality?: string;
  district?: string;
  province?: string;
}

interface BookingDetails {
  location?: BookingLocation;
}

interface Notification {
  _id: string;
  message: string;
  status: string;
  senderDetails?: SenderDetails;
  bookingDetails?: BookingDetails;
}

interface BookingRequestRowProps {
  notification: Notification;
  onRefresh: () => void;
}


const BookingrequestRow: React.FC<BookingRequestRowProps> = ({ notification, onRefresh }) => {

    const{toast}=useToast();
    const[acceptLoading,setAcceptLoading]=useState(false);
    const[rejectLoading,setRejectLoading]=useState(false);
    const [notifications, setNotifications] = useState(notification); 
    const[refresh,setRefresh]=useState(false);

    const handleAccept = async (notificationId:string) => {
        setAcceptLoading(true);
          console.log("notification id ",notificationId)
          const token = localStorage.getItem("token_id");
          try {
            const res = await $axios.put(`/api/v1/booking/notifications/accept/${notificationId}`, {});
      
      
            console.log("Booking Accepted:", res.data);
      toast({
        title:"Booking accepted successfully!",
        className:"bg-green-100 text-success"
      })
      onRefresh(); 


          } catch (error:any) {
            console.log("Error accepting booking:", error);
            toast({
              title:`${error.response.data.message}`,
              className:"bg-red-100 text-danger"
            })
          }
          finally{
        setAcceptLoading(false);
      
          }
          
      
        };
      
        // Reject booking
        const handleReject = async (notificationId:string) => {
        setRejectLoading(true);
      
          const token = localStorage.getItem("token_id");
      
          try {
            await $axios.put(`/api/v1/booking/notifications/reject/${notificationId}`, {});
      
      
            console.log("Booking Rejected");
            toast({
              title:"Booking Rejected successfully!",
              className:"bg-red-100 text-danger"
            })
            onRefresh(); 

          } catch (error) {
            console.log("Error rejecting booking:", error);
            alert("Failed to reject booking. Please try again.");
          }finally{
        setRejectLoading(false);
      
          }
      
        };

        useEffect(() => {
          const fetchNotifications = async () => {
            try {
              setNotifications(notification);
            } catch (error) {
              console.log("Error fetching notifications:", error);
            }
          };
        
          fetchNotifications();
        }, [notifications,refresh]);
  return (
    
    <>
       <div
              key={notifications?._id}
              className="p-4 rounded-lg shadow-lg flex justify-between bg-orange-100 text-orange-400"
              
            >
              <div className="flex gap-5 justify-between ">
                <div className="
                    flex flex-col items-center  w-80
                ">
                 
                    {
                    notifications?.senderDetails?.avatar?(

                            <img
                            src={notifications?.senderDetails?.avatar}
                            alt="Puja"
                            style={{ height: "50px", width: "50px" }}
                            className="rounded-full"
                          />
                          
 
                        
                    ):(
                     
                            <LetterAvatar name={notifications?.senderDetails?.firstName} size={40}/>
                  
                    
                        
                    )
                
                }

                  <Modal>
                                          <ModalTrigger className="  dark:bg-white dark:text-black text-black flex  gap-3 items-center group/modal-btn ">
                                           
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
                                                <UserProfile user={notifications?.senderDetails as User}/>
                                              </>
                                                
                                              </ModalContent>
                                            </ModalBody>
                                          </div>
                   </Modal>
          </div>

               
                <div className="flex flex-col">
                  <p>{notification.message}</p>
                  <span className="text-sm text-gray-500">
                    From: {notifications?.senderDetails?.firstName} {notifications?.senderDetails?.lastName}   
                  
                  </span>

                  <div className="flex gap-2 mt-1 text-sm">
                    <p className="font-bold text-sm pe-2">Location:</p>
                    <p className="text-gray-500">
                      {notifications?.bookingDetails?.location?.tollAddress || "N/A"},{" "}
                      {notifications?.bookingDetails?.location?.municipality || "N/A"},{" "}
                      {notifications?.bookingDetails?.location?.district || "N/A"},{" "}
                      {notifications?.bookingDetails?.location?.province || "N/A"}
                    </p>
                  </div>

                  <p className="text-sm">
                    Status: <span className="font-bold">{notifications?.status}</span>
                  </p>
                  

                </div>
              </div>
   
              <div className="flex gap-3 justify-between  p-4 mt-4 rounded-lg">
                {notification.status==="Pending"?(
                     <>
                         <button
  onClick={() => handleAccept(notifications?._id)}
  className=" w-25 h-10 px-4 py-2 rounded-md bg-green-400 text-white text-sm font-medium hover:bg-green-600 transition flex items-center gap-2"
  disabled={acceptLoading}
  >
       
          {acceptLoading?(<>
          Wait
<div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

          </>):(<>
            Accept
          </>)}
         
        </button>
        <button
  onClick={() => handleReject(notifications?._id)}
  className="px-4 py-2 w-25 h-10 rounded-md bg-red-400 text-white text-sm font-medium hover:bg-red-600 transition flex items-center gap-2"
  disabled={rejectLoading}

        >

    {rejectLoading?(<>
          Wait
<div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

          </>):(<>
            Reject
          </>)}
        </button>
                     </>
                ):(
                    <button
                    // onClick={() => handleReject(notification._id)}
                    className="shadow px-4 py-2  w-25 h-10 rounded-md bg-slate-100 text-slate-600 text-sm font-medium hover:bg-red-600 transition"
                          disabled
                          >
                            {notification.status}
                          </button>
                )
                
               

                }
    
      </div>

            </div>
    </>
  )
}

export default BookingrequestRow