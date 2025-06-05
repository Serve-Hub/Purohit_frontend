'use client';

import React, { useEffect, useState } from "react";
import $axios from "@/src/lib/axios.instance";
import { FaStar, FaThumbsUp, FaReply } from 'react-icons/fa';


interface Pandit {
  avatar: string;
  firstName: string;
  lastName: string;
  reviewCount: number;
  averageRating: number | null;
}


const TableOne = () => {

  const [panditUsers, setPanditUsers] = useState([]);
  const [top5Pandits, setTop5Pandits] = useState<Pandit[]>([]);
  const [top5Pujas, setTop5Pujas] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);

  const fetchPanditUsers = async () => {
    try {
      const response = await $axios.get("/api/v1/admin/getAllPanditUsers");
      console.log("pandit users is",response)
      setPanditUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch pandit users:", error);
    }
  };

  // Fetch top 5 pandits
  const fetchTop5Pandits = async () => {
    try {
      const response = await $axios.get("/api/v1/admin/getTop5Pandits");
      setTop5Pandits(response.data.data);
      console.log("response fromt top5pandits",response)
    } catch (error) {
      console.error("Failed to fetch top 5 pandits:", error);
    }
  };

  // Fetch top 5 pujas
  const fetchTop5Pujas = async () => {
    try {
      const response = await $axios.get("/api/v1/admin/getTop5Pujas");
      setTop5Pujas(response.data.data);
    } catch (error) {
      console.error("Failed to fetch top 5 pujas:", error);
    }
  };

 

  useEffect(() => {
    // fetchPanditUsers();
    fetchTop5Pandits();
    // fetchTop5Pujas();
    // fetchTotalBookings();
  }, []);

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Top Pandits
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Pandit Name
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Number of Ratings
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Average Rating
            </h5>
          </div>
 
        </div>

        {top5Pandits.map((pandit, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === top5Pandits.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <img src={pandit.avatar} alt="pandit" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {pandit.firstName}   {pandit.lastName}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {pandit.reviewCount}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4 gap-3">
               {pandit.averageRating ? (
              <p className="">{Math.round(pandit.averageRating)}</p>
            ) : (
              <p className="">No ratings yet</p>
            )}        
              <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-6 h-6 ${star <= Math.round(pandit?.averageRating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {/* {pandit.sales} */}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {/* {pandit.conversion}% */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
