'use client';

import React, { useEffect, useState } from "react";
import $axios from "@/src/lib/axios.instance";


interface Puja {
  pujaImage: string;
  pujaName: string;   
  category: string;   
  baseFare: number | string; 
  bookingCount: number; 
}
const TableThree = () => {
  //  const [panditUsers, setPanditUsers] = useState([]);
  //   const [top5Pandits, setTop5Pandits] = useState([]);
    const [top5Pujas, setTop5Pujas] = useState<Puja[]>([]);
    // const [totalBookings, setTotalBookings] = useState(0)

  const fetchTop5Pujas = async () => {
    try {
      const response = await $axios.get("/api/v1/admin/getTop5Pujas");
      console.log("top pujas are",response);
      setTop5Pujas(response.data.data);
    } catch (error) {
      console.error("Failed to fetch top 5 pujas:", error);
    }
  };
  

 useEffect(() => {
    fetchTop5Pujas();
  }, []);


  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
              Puja Name 
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Category
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
              Base Fare
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white xl:pr-7.5">
               Booking Count
              </th>
            </tr>
          </thead>
          <tbody>
            {top5Pujas.map((puja, index) => (
              <tr key={index}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === top5Pujas.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <img src={puja.pujaImage} alt="" 
                  style={{height:"50px",width:"100px"}}
                  className="object-cover"
                  />
                  <h5 className="text-dark dark:text-white">
                    {puja.pujaName}
                  </h5>
             
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === top5Pujas.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                  {puja.category}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === top5Pujas.length - 1 ? "border-b-0" : "border-b"}`}
                >
                {puja.baseFare}
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === top5Pujas.length - 1 ? "border-b-0" : "border-b"}`}
                >
               
               {puja.bookingCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
