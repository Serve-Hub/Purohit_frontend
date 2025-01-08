"use client";
import Breadcrumb from "@/src/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/src/components/Dashboard/DefaultLayout";
import Link from "next/link";
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import PoojaProvider, { PoojaContext } from "@/src/context/poojacontext";

const Pujatable = () => {
  const poojaContext = useContext(PoojaContext);

  const [currentPage, setCurrentPage] = useState(1); // Initialize with page 1
  const [totalPages, setTotalPages] = useState(0); // Total pages from the response
  const [pujas, setPujas] = useState([]);
  const [fetchloader,setFetchloader]=useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minDuration: "",
    maxDuration: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { getPooja } = poojaContext;

      // Fetch poojas with currentPage, itemsPerPage, and filters
      const response = await getPooja({
        page: currentPage,
        itemsPerPage: 4,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minDuration: filters.minDuration,
        maxDuration: filters.maxDuration
      });

      console.log("response is ", response);

      if (response) {
        setFetchloader(false);
        // Set the fetched data
        setPujas(response.pujas);
        // Convert currentPage to an integer and set the totalPages
        // setCurrentPage(parseInt(response.currentPage, 10)); // Ensure it's an integer
        setTotalPages(response.totalPages); // Set the total pages
      }
    };

    fetchData();
  }, [ currentPage,filters, poojaContext]);

  // Filter toggle and change handlers
  const toggle = () => {
    setVisible(!visible);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    console.log("after filter",filters)
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update the current page
    }
  };


  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Puja" />
      {/* {visible && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-10"
          onClick={toggle}
        ></div>
      )} */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Puja Information
          </h4>
          <div className="flex gap-5 items-center font-semibold">
            <h1 className="text-pg flex gap-3  items-center cursor-pointer" onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
              </svg>
              Filter
            </h1>
            <Link
              href="admin/pujatable/addpuja"
              className="px-4 py-2 bg-pg font-semibold text-white rounded-lg "
            >
              Add Puja
            </Link>
          </div>
        </div>

        {/* modal for the filter */}
        {visible && (
        <div className="fixed top-10 inset-0 flex justify-center items-center z-9999 ">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-2">Filters</h2>

              <div className="flex gap-16">
            <div className="mb-4">
              <label htmlFor="minPrice" className="block mb-2">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="w-full border p-2 rounded"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxPrice" className="block mb-2">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="w-full border p-2 rounded"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
              />
            </div>

              </div>
           
            <div className="flex gap-16 w-full ">
            <div className="mb-4">
              <label htmlFor="minDuration" className="block mb-2">
                Min Duration (Minutes)
              </label>
              <input
                type="number"
                id="minDuration"
                name="minDuration"
                className="w-full border p-2 rounded"
                value={filters.minDuration}
                onChange={handleFilterChange}
                placeholder="Min Duration"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxDuration" className="block mb-2">
                Max Duration (Minutes)
              </label>
              <input
                type="number"
                id="maxDuration"
                name="maxDuration"
                className="w-full border p-2 rounded"
                value={filters.maxDuration}
                onChange={handleFilterChange}
                placeholder="Max Duration"
              />
            </div>

            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full border p-2 rounded"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>
            <div className="flex justify-center gap-6 mt-10">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={toggle}
              >
                Apply Filters
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={() => setVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Puja Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Base price
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Expected Duration
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
             {fetchloader &&( 
<div className="flex justify-center items-center w-full  ms-70">

  <div className="w-[15px] aspect-square rounded-full animate-l5  my-10 ms-1/2 "></div>
</div>

)}        
     <tbody className="w-full border">
              {pujas.map((puja, key) => (
                <tr key={key}>
                  <td className="border-b flex  gap-2 items-center border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <div className="w-19 h-10 border">
                      <img
                        src={`${puja.pujaImage}`}
                        alt=""
                        className="rounded w-full h-full object-cover object-center"
                      />
                    </div>

                    <h5 className="font-medium text-black dark:text-white">
                      {puja.pujaName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Rs {puja.baseFare}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {puja.duration} hr
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium "
                      // ${
                      //   puja.category === "Paid"
                      //     ? "bg-success text-success"
                      //     : puja.category === "Unpaid"
                      //       ? "bg-danger text-danger"
                      //       : "bg-warning text-warning"

                      // }
                      // `
                      // }
                    >
                      {puja.category}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href="pujatable/editpuja" className="text-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                      </Link>
                      <button className="text-danger">
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
                      </button>
                      {/* download button */}
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
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-center items-center space-x-4 m-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        Previous
      </button>

      {/* Page Info */}
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
    
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Pujatable;
