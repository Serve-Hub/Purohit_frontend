import React from 'react'
import { useState ,useEffect} from 'react';
import $axios from '@/src/lib/axios.instance';
import Link from 'next/link';
function Search() {
    const [pujas, setPujas] = useState<any[]>([]); // Define a type for pujas based on response
      const [error, setError] = useState<string>("");
      const [isLoading, setIsLoading] = useState<boolean>(true);
      
    
    useEffect(() => {
        const fetchPujas = async () => {
          const token = localStorage.getItem("token_id");
          setIsLoading(true);
          try {
            const response = await $axios.get("/api/v1/admin/getPujas", {
              params: {
                page: 1,
                limit: 10,
                category:"",
                minPrice:  0,
                maxPrice:  Infinity,
                minDuration:  0,
                maxDuration: Infinity ,
              },
            });
            console.log("response for all pujas",response);
            if (response.status === 200) {
              setPujas(response.data?.data?.pujas || []);
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
      }, []);


      const [searchQuery, setSearchQuery] = useState("");

      // Filter pujas based on the search query
      const filteredPujas = pujas.filter((puja) =>
        puja.pujaName.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <form>
  <div className="relative z-99999" data-aos="fade-left">
    {/* Search Icon */}
    <button className="absolute left-2 top-1/2 -translate-y-1/2 z-99">
      <svg
        className="fill-pandit hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
          fill=""
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
          fill=""
        />
      </svg>
    </button>

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search for available pujas"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="shadow bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-90 border border-pandit text-pandit placeholder:text-pandit rounded-full p-3 hidden lg:block"
    />
  {searchQuery && (
    <div className="absolute top-14  left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-9999">
      {filteredPujas.length > 0 ? (
        filteredPujas.map((puja) => (
          <div
            key={puja._id}
            className="p-3 hover:bg-gray-100 cursor-pointer"
          >
            <Link
              href={`/user/viewPuja/${puja._id}`} // Link to the puja details page
              className="block w-full h-full text-gray-700 hover:text-blue-500"
            >
              {puja.pujaName}
            </Link>
          </div>
        ))
      ) : (
        <div className="p-3 text-gray-500">No matching pujas found.</div>
      )}
    </div>
  )}
  </div>

  {/* Display Matching Results (Absolute Positioning) */}
</form>
  )
}

export default Search