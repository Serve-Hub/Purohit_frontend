import React, { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import $axios from "@/src/lib/axios.instance";
import AvailablePanditCard from "./AvailablePanditCard";


interface AvailablePanditProps {
  bookingId: string;
}
interface Pandit {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  kypDetails: {
    temporaryAddress: {
      tolAddress: string;
      municipality: string;
    };
  };
}
function AvailablePandit({ bookingId}: { bookingId: string }) {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [recommendedPandits, setRecommendedPandits] = useState<Pandit[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reload, setReload] = useState(false); // ✅ New state to trigger reload
  const [isLoading, setIsLoading] = useState(false);



  const { toast } = useToast();



  useEffect(() => {
    const fetchPandits = async () => {
      const token = localStorage.getItem("token_id");
      try {
        const response = await $axios.get(`/api/v1/booking/bookings/${bookingId}/accepted-pandits`);

        console.log("response is",response)
        setPandits(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch available pandits");
        setLoading(false);
      }
    };

    const fetchRecommendedPandits = async () => {
     
      try {
        const response = await $axios.post(
          'https://purohit-ai.onrender.com/recommend_pandits',
          { booking_id: bookingId }
        );  

        console.log("Ai response is",response)
        setRecommendedPandits(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch available pandits");
        setLoading(false);
      }
    }

    if (bookingId) {
      fetchRecommendedPandits();
      fetchPandits();
    }
  }, [bookingId,pandits]);

 
  return (
    <div className=" p-4 w-full">
      {actionError && 
      <div className="text-center text-red-600">{actionError}</div>}
      {pandits.length === 0 ? (
        <p className="text-center text-gray-600">No pandits available currently.</p>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-2 md:gap-3 ">
        {/* // <div className="flex gap-3"> */}
          {pandits?.map((pandit) => (
           <AvailablePanditCard pandit={pandit} bookingId={bookingId} key={pandit._id}/>
          ))}
        </div>
      )}
<br /><br />
<hr/>
<div className="mt-5">
  <h1 className="font-bold text-slate-500">
    Recommended Pandits
  </h1>
</div>
{pandits.length === 0 ? (
        <p className="text-center text-gray-600">No pandits available currently.</p>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-2 md:gap-3 ">
        {/* // <div className="flex gap-3"> */}
          {pandits?.map((pandit) => (
           <AvailablePanditCard pandit={pandit} bookingId={bookingId} key={pandit._id}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailablePandit;
