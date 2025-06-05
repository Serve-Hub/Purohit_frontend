"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Slider } from "@/src/components/ui/slider";
import Link from "next/link";
import PujaCard from "./PujaCard";
import $axios from "@/src/lib/axios.instance";


function AllPujas() {
  const [pujas, setPujas] = useState<any[]>([]); // Define a type for pujas based on response
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(0);
  
  const [sortOption, setSortOption] = useState("date");
  const sortedPujas = [...pujas].sort((a, b) => {
    if (sortOption === "date") {
      // Sort by recently updated (descending order)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortOption === "name-asc") {
      // Sort by pujaName in ascending order (A-Z)
      return a.pujaName.localeCompare(b.pujaName);
    } else if (sortOption === "name-desc") {
      // Sort by pujaName in descending order (Z-A)
      return b.pujaName.localeCompare(a.pujaName);
    } else if (sortOption === "price-asc") {
      // Sort by baseFare in ascending order (low to high)
      return a.baseFare - b.baseFare;
    } else if (sortOption === "price-desc") {
      // Sort by baseFare in descending order (high to low)
      return b.baseFare - a.baseFare;
    }
    return 0; // Default: no sorting
  });


  interface Filters {
    selectedFilters: string[];
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
  }
  
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    selectedFilters: [],
    minPrice: 0,
    maxPrice: 0,
    minDuration: 0,
    maxDuration: 0,
  });
  
  const router = useRouter();
  
  useEffect(() => {
    const fetchPujas = async () => {
      const token = localStorage.getItem("token_id");
      setIsLoading(true);
      try {
        const response = await $axios.get("/api/v1/admin/getPujas", {
          params: {
            page: currentPage,
            limit: 10,
            category: appliedFilters.selectedFilters.join(","),
            minPrice: appliedFilters.minPrice || 0,
            maxPrice: appliedFilters.maxPrice || Infinity,
            minDuration: appliedFilters.minDuration || 0,
            maxDuration: appliedFilters.maxDuration ||Infinity ,
          },
        });
        console.log("response for all pujas",response);
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
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const handleCheckboxChange = (option: string) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };
  
  const resetFilters = () => {
    setSelectedFilters([]);   // Reset selected filters
    setMinPrice(0);           // Reset minPrice to 0
    setMaxPrice(0);           // Reset maxPrice to 0
    setMinDuration(0);        // Reset minDuration to 0
    setMaxDuration(0);        // Reset maxDuration to 0
  };
  
  const applyFilters = () => {
    setAppliedFilters({
      selectedFilters,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
    });
    setCurrentPage(1); // Reset to the first page when filters are applied
  };
  
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="flex  gap-3">
      {/* Filters Section */}
      <div className="p-6 min-h-screen w-2/6  ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Filters</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="filter-checkbox">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Categories
            </h3>
            <div className="space-y-3">
       
              {[" Astrology", "Puja", "Homam","Vastu", "Others"].map((option, index) => (
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Price Range
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="minValue"
                  className="block text-sm text-gray-600 mb-1"
                >
                  From
                </label>
                <input
                  id="minValue"
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="maxValue"
                  className="block text-sm text-gray-600 mb-1"
                >
                  To
                </label>
                <input
                  id="maxValue"
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Duration(in hrs)
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="minDuration"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    From (min)
                  </label>
                  <input
                    id="minDuration"
                    type="number"
                    min={0}
                    value={minDuration}
                    onChange={(e) => setMinDuration(Number(e.target.value))}
                    placeholder="Min Rs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="max Rs"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    To (min)
                  </label>
                  <input
                    id="maxDuration"
                    type="number"
                    min={0}
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(Number(e.target.value))}
                    placeholder="Max hr"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

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
      <div className="w-full bg-gray-50 p-5 container">
        {/* sortby section */}
        <div className=" shadow flex gap-3 mb-10 p-3 h-15 rounded-xl justify-start items-center">
          <p className="">Sort By:</p>
          <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-md p-2 border border-pandit text-pandit"
        >
           <option value="date">Recently updated</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 space-y-5">
          {isLoading?(
            <div className="flex justify-center items-center w-full  ms-70">
              <div className="w-[15px] aspect-square rounded-full animate-l5  my-30 ms-1/2 "></div>
            </div>
          ):(

         
            sortedPujas.length > 0 ? (
              sortedPujas.map((puja) => (
             

              <PujaCard puja={puja} key={puja._id}/>
           
            ))
          ) : (
            <div className=" text-gray-500 text-xl py-8 text-center">
              Oop!  No puja available :|
            </div>
          )
        )}
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
