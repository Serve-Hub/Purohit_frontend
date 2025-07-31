'use client';
import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/src/components/ui/animated-modal";
import PanditProfile from "./PanditProfile";
import  { useEffect, useState } from "react";
import $axios from '@/src/lib/axios.instance';
import { toast } from "@/hooks/use-toast";


interface Pandit{
  _id: string; 
  avatar: string; // Avatar URL of the pandit
  firstName: string; // First name of the pandit
  lastName: string; // Last name of the pandit
  email: string; // Email of the pandit
  kypDetails: {
    temporaryAddress: {
      tolAddress: string; // Temporary address
      municipality: string; // Municipality of the address
    };
  };
}
interface AvailablePanditCardProps {
  pandit: Pandit; 
  bookingId: string; 
}


function AvailablePanditCard({pandit,bookingId}: AvailablePanditCardProps) {

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
      const [actionError, setActionError] = useState("");
      const [reload, setReload] = useState(false); // ✅ New state to trigger reload
      const [isLoading, setIsLoading] = useState(false);


    const handleAccept = async (panditId:string,bookingId:string) => {
        setIsLoading(true);
    
        console.log("Pandit ID and Booking ID:", panditId, bookingId);
  
        if (!bookingId || !panditId) {
          setActionError("Missing booking or pandit ID.");
          return;
        }
      const formData={
        bookingId: bookingId,  
        panditId: panditId
      }
        setActionError("");
        const token = localStorage.getItem("token_id");
      
        try {
          const response = await $axios.post(
            "/api/v1/booking/bookings/accepted-pandits/choosePandit",
            formData,  // Ensure formData is a valid object
            {
              headers: {
                "Content-Type": "application/json", // If formData is a JSON object
              },
            }
          );
      console.log("response is",response)
    
      toast({
        title:"You have successfully accepted a pandit",
        className:"bg-green-100 text-success"
      });
      setReload((prev) => !prev); // ✅ Trigger reload after success
    // setIsLoading(false);
        } catch (err) {
          console.log("Error occurred:", err);
    
            const errorMessage =(err as any)?.response?.data?.message || "Something went wrong";
          toast({
            // title:`${err.response.data.message}`,
            title: errorMessage,
            className:"bg-red-100 text-danger"
          })
      setReload((prev) => !prev); 
    
        }
      };

  return (
   
<>
<div key={pandit._id} className="border flex flex-col gap-4 w-100 shadow p-5 bg-white">
              <div className="flex gap-3">
                <img
                  src={pandit?.avatar}
                  style={{ height: "50px", width: "50px" }}
                  alt=""
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                  <h1 className="text-xl font-semibold">{pandit?.firstName}  {pandit?.lastName}</h1>
                  <div className="flex gap-1
                       ">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
   </svg>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
   </svg>
   
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-400" >
     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
   </svg>
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-400" >
     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
   </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-400" >
     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
   </svg>
   
                       </div>
   
                  </div>
                  <p className="text-slate-400">{pandit.email}</p>
                  <p className="text-slate-400 text-sm flex gap-2">
                    <span className="font-bold">Location: </span>
                    <span>
                    {pandit?.kypDetails?.temporaryAddress?.tolAddress}
                      </span>
                    <span>
                      {pandit?.kypDetails?.temporaryAddress?.municipality}
                      </span>

                  </p>
                           <Modal>
                                          <ModalTrigger className=" dark:bg-white dark:text-black text-orange-300 hover:text-pandit flex justify-start gap-1 items-center">
                                           
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
                                          <div className="fixed top-10 start-10 border border-black ">
                                            <ModalBody>
                                              <ModalContent>
                                                <>

                                                <PanditProfile pandit={pandit}/>
                                              </>
                                               
                                              </ModalContent>
                                            </ModalBody>
                                          </div>
                                        </Modal>
                </div>  
              </div>
              <div className="flex justify-around">
                <button
                  onClick={() => handleAccept(pandit._id,bookingId)}
                  className="bg-green-400 text-white px-4 py-2 rounded-lg font-medium flex gap-3 "
                >
                    {isLoading?(
                      <>
                      Accepting
<div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                      </>
                    ):(
                                  <>
                                  Accept
                                  </>
                    )}

                </button>
        
              </div>
            </div>
</>
  )
}

export default AvailablePanditCard