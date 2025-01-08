"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Slider } from "@/src/components/ui/slider";
import Link from "next/link";


function AllPujas() {
  const [pujas, setPujas] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [duration, setDuration] = useState([0, 100]); // For duration slider
  const [appliedFilters, setAppliedFilters] = useState({
    selectedFilters: [],
    minPrice: "",
    maxPrice: "",
    duration: [0, 100],
  });
  const router = useRouter();

  useEffect(() => {
    const fetchPujas = async () => {
      const token = localStorage.getItem("token_id");
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://purohit-backend.onrender.com/api/v1/admin/getPujas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: 10,
              category: appliedFilters.selectedFilters.join(","),
              minPrice: appliedFilters.minPrice || 0,
              maxPrice: appliedFilters.maxPrice || Infinity,
              minDuration: appliedFilters.duration[0],
              maxDuration: appliedFilters.duration[1],
            },
          }
        );
        if (response.status === 200) {
          setPujas(response.data?.data?.pujas || []);
          setTotalPages(response.data?.data?.totalPages || 1);
        } else {
          setError(response.data?.message || "Failed to fetch pujas");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPujas();
  }, [currentPage, appliedFilters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCheckboxChange = (option) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setMinPrice("");
    setMaxPrice("");
    setDuration([0, 100]);
  };

  const applyFilters = () => {
    setAppliedFilters({
      selectedFilters,
      minPrice,
      maxPrice,
      duration,
    });
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

 
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex">
      {/* Filters Section */}
      <div className="p-6 min-h-screen w-2/6 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Filters</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="filter-checkbox">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Categories</h3>
            <div className="space-y-3">
              {["Category1", "Category2", "Category3"].map((option, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedFilters.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="range-input bg-gray-100 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="minValue" className="block text-sm text-gray-600 mb-1">
                  From
                </label>
                <input
                  id="minValue"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="maxValue" className="block text-sm text-gray-600 mb-1">
                  To
                </label>
                <input
                  id="maxValue"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="duration" className="block text-sm text-gray-600 mb-1">
                Duration (in hrs)
              </label>
              <Slider
                defaultValue={[duration]}
                max={100}
                step={1}
                onChange={(value) => setDuration(value)}
              />
              {/* <Slider
                defaultValue={[0, 100]}
                value={duration}
                onValueChange={(value) => setDuration(value)}
                max={100}
                step={1}
              /> */}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Pujas Section */}
      <div className="w-full bg-gray-50 p-5">
      <div className=" shadow flex gap-3 mb-10 p-3 h-15 rounded-xl justify-start items-center">
        <p className="">Sort By:</p>
        <select name="" id="" className="rounded-md p-2 border border-pandit text-pandit">
          <option value="date">Recently updated</option>
          <option value="ascending">Ascending order</option>
        </select>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {isLoading &&( 
<div className="flex justify-center items-center w-full  ms-70">

  <div className="w-[15px] aspect-square rounded-full animate-l5  my-10 ms-1/2 "></div>
</div>

)}     
          {pujas.map((puja) => (
            <div
              key={puja._id}
              className="w-80 h-auto mx-auto border rounded-lg overflow-hidden shadow-lg bg-white relative"
            >
               <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 absolute top-2 end-2 text-white font-extrabold rounded-full bg-black z-999 p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>


              <div
                className="w-full h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('${
                    puja.pujaImage || "/img/default-puja.jpg"
                  }')`,
                }}
              >
                <p className="text-sm text-white absolute bg-pandit bottom-2 start-2 p-2 rounded-xl">
                  {puja.category}
                </p>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{puja.pujaName}</h2>
                <p className="mt-2 text-gray-500">{puja.description}</p>
                <div className="mt-4 flex flex-col justify-start items-start gap-2">
                <div className="flex justify-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-pandit"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p className="text-lg text-gray-500"> {puja.duration}  hrs</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-pandit"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <p className="text-gray-500">{puja.panditsRequired} pandits required</p>
                </div>
                <div className="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-pandit">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<p className="text-lg font-semibold"> {puja.baseFare}</p>

                </div>
              </div>
   
              </div>
              <div className="p-4">
                <Link
                href={`/user/viewPuja/${puja._id}`}
              
                  className="w-full px-4 py-2 bg-[#F25B2C] bg-opacity-70 text-white rounded-md hover:bg-pandit"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:bg-gray-200"
          >
            Previous
          </button>
          <span className="flex items-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllPujas;
