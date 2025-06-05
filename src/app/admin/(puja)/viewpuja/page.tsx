"use client";
import Breadcrumb from "@/src/components/admin/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/src/components/admin/Dashboard/DefaultLayout";
import Link from "next/link";
import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import PoojaProvider, { PoojaContext } from "@/src/context/poojacontext";
import SelectGroupTwo from "@/src/components/SelectGroupTwo";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/src/components/ui/animated-modal";
import $axios from "@/src/lib/axios.instance";
import { toast } from "@/hooks/use-toast";

interface pooja {
  pujaImage: string;
  pujaName: string;
  baseFare: number;
  duration: number;
  category: string;
  description:string;
}

const Pujatable = () => {
  const poojaContext = useContext(PoojaContext);
  const [deleted, setDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Initialize with page 1
  const [totalPages, setTotalPages] = useState(0); // Total pages from the response
  const [pujas, setPujas] = useState<pooja[]>([]);
  const [fetchloader, setFetchloader] = useState(true);
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
      const getPooja = poojaContext?.getPooja;

      if (!getPooja) {
        console.log("getPooja is not defined or poojaContext is null!");
        return <div>Error: Unable to fetch data</div>;
      }
      // Fetch poojas with currentPage, itemsPerPage, and filters
      const response = await getPooja({
        page: currentPage,
        itemsPerPage: 4,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minDuration: filters.minDuration,
        maxDuration: filters.maxDuration,
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
    if (deleted) {
      fetchData();
      setDeleted(false);
    }
  }, [currentPage, filters, poojaContext, deleted]);

  // Filter toggle and change handlers
  const toggle = () => {
    setVisible(!visible);
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    console.log("after filter", filters);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update the current page
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await $axios.delete(`/api/v1/admin/deletePuja/${id}`);

      if (res.status === 200) {
        alert("Puja deleted successfully!");
        console.log(res.data); // You can log the response data if needed
        setDeleted(true);
      } else {
        alert("Failed to delete Puja. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting puja:", error);
      alert("An error occurred while deleting Puja. Please try again.");
    }
  };
  // const router=useRouter();

  type FormDataType = {
    pujaName: string;
    baseFare: string;
    category: string;
    duration: string;
    description: string;
    pujaImage: File | null;
  };

  const [formData, setFormData] = useState<FormDataType>({
    pujaName: "",
    baseFare: "",
    category: "",
    duration: "",
    description: "",
    pujaImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageData, setImageData] = useState<{ pujaImage: File | null }>({
    pujaImage: null,
  });
  const [imagepreview, setImagepreview] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that 'files' is not null and has at least one file
    const file = e.target.files ? e.target.files[0] : null;
    // if (file) {
    //   setCoverData({ coverPhoto: file });
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setCoverpreview(reader.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }

    if (file) {
      // If there's a file, update the formData with the selected file
      setFormData((prev) => ({
        ...prev,
        pujaImage: file,
      }));
      setImageData({ pujaImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagepreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("formData is", formData);

    const fd = new FormData();

    // Append form fields to FormData
    fd.append("pujaName", formData.pujaName);
    fd.append("baseFare", formData.baseFare);
    fd.append("category", formData.category);
    fd.append("duration", formData.duration);
    fd.append("description", formData.description);

    // Append file to FormData (make sure it exists)
    if (formData.pujaImage) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.pujaImage.type)) {
        console.error("Unsupported file type:", formData.pujaImage.type);
        return;
      }
      fd.append("pujaImage", formData.pujaImage);
    }
    // for (const [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }
    // const token = localStorage.getItem("token_id");

    // console.log("Headers sent:", {
    //   Authorization: `Bearer ${token}`,
    // });
    try {
      const response = await $axios.post("/api/v1/admin/addPuja", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("resopne", response);
      setLoading(false);
      if (response.data.success) {
        // setSuccess(true);
        // setSuccessMessage("Puja added successfully!");

        toast({
          title: "Update info",
          description: "Puja has been edited successfully !!",
          className: "bg-green-500 border-green-500 text-white font-semibold ",
        });
        // router.push("/admin/viewpuja");
      }
      // alert("puja edited successfully!");
    } catch (error: any) {
      setLoading(false);
      console.log("error is ", error);
      // setError(error.response?.data?.message || "Something went wrong!");
      alert(`${error.response?.data?.message} please try again!`);
    }
  };
  const handle = () => {};
  return (
    <div>
      {/* <button onClick={handle}>tab</button> */}
      {/* // <DefaultLayout> */}
      <Breadcrumb pageName="Puja" />

      {pujas.length > 0 ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Puja Information
            </h4>
            <div className="flex gap-5 items-center font-semibold">
              <h1
                className="text-white bg-pg  flex gap-3  px-4 py-2  font-semibold  rounded-lg items-center cursor-pointer"
                //
                onClick={toggle}
              >
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
              {/* <Link
              href="admin/pujatable/addpuja"
              className=" "
            >
              Edit Puja
            </Link> */}
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
              {fetchloader && (
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
                      <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ">
                        {puja.category}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Modal>
                          <ModalTrigger className=" dark:bg-white dark:text-black text-success flex justify-center group/modal-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                            </svg>
                          </ModalTrigger>
                          <div className="fixed top-10 start-10 border border-black ">
                            <ModalBody>
                              <ModalContent>
                                <div
                                  className="bg-white p-6 rounded-lg w-full "
                                  onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                                >
                                  <div className="grid grid-cols-5 gap-8">
                                    <div className="col-span-5 xl:col-span-5">
                                      <form onSubmit={handleSubmit}>
                                        {success && (
                                          <div
                                            style={{
                                              backgroundColor: "#28a745",
                                              color: "white",
                                              padding: "10px",
                                              marginTop: "20px",
                                              borderRadius: "5px",
                                            }}
                                            className=" z-9999 fixed top-11 right-3 animate-fade-in-right w-60 mb-10 p-2"
                                          >
                                            {successMessage}
                                          </div>
                                        )}
                                        <div className="grid grid-cols-5 border">
                                          <div className="col-span-5 xl:col-span-5">
                                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                                <h3 className="font-semibold text-pg  dark:text-white">
                                                  Edit a puja photo
                                                </h3>
                                              </div>
                                              <div className="p-7">
                                                <form action="#">
                                                  <div className="mb-4 flex items-center gap-3">
                                                    Edit a cover photo for your
                                                    puja
                                                    {/* <div className="h-14 w-14 rounded-full">
                                                                <Image
                                                                  src={"/images/user/user-03.png"}
                                                                  width={55}
                                                                  height={55}
                                                                  alt="User"
                                                                />
                                                              </div> */}
                                                    {/* <div>
                                                                <span className="mb-1.5 text-black dark:text-white">
                                                                  Edit your photo
                                                                </span>
                                                                <span className="flex gap-2.5">
                                                                  <button className="text-sm hover:text-primary">
                                                                    Delete
                                                                  </button>
                                                                  <button className="text-sm hover:text-primary">
                                                                    Update
                                                                  </button>
                                                                </span>
                                                              </div> */}
                                                  </div>
                                                  <div
                                                    id="FileUpload"
                                                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-pg bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                                                  >
                                                    {puja.pujaImage && (
                                                      <img
                                                        src={puja.pujaImage}
                                                        alt="eta image xa"
                                                        style={{
                                                          height: "320px",
                                                          width: "320px",
                                                        }}
                                                        //  height={200}
                                                        //  width={200}
                                                      />
                                                    )}
                                                  </div>

                                                  <div
                                                    id="FileUpload"
                                                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-pg bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                                                  >
                                                    {imagepreview ? (
                                                      <img
                                                        src={imagepreview}
                                                        alt="eta image xa"
                                                        style={{
                                                          height: "320px",
                                                          width: "320px",
                                                        }}
                                                        //  height={200}
                                                        //  width={200}
                                                      />
                                                    ) : (
                                                      <>
                                                        <input
                                                          type="file"
                                                          name="pujaImage"
                                                          accept="image/*"
                                                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                                          onChange={
                                                            handleFileChange
                                                          }
                                                          required
                                                        />
                                                        <div className="flex flex-col items-center justify-center space-y-3">
                                                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                                fill="#3C50E0"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                                fill="#3C50E0"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                                fill="#3C50E0"
                                                              />
                                                            </svg>
                                                          </span>
                                                          <p>
                                                            <span className="text-pg">
                                                              Click to Edit
                                                            </span>{" "}
                                                            or drag and drop
                                                          </p>
                                                          <p className="mt-1.5">
                                                            SVG, PNG, JPG or GIF
                                                          </p>
                                                          <p>
                                                            (max, 800 X 800px)
                                                          </p>
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>

                                                  {/* <div className="flex justify-end gap-4.5">
                                                              <button
                                                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                                type="submit"
                                                              >
                                                                Cancel
                                                              </button>
                                                              <button
                                                                className="flex justify-center rounded bg-pg px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                                                type="submit"
                                                              >
                                                                Save
                                                              </button>
                                                            </div> */}
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                          <div className=" xl:col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                              <h3 className="font-semibold text-pg dark:text-white">
                                                Edit Puja information
                                              </h3>
                                            </div>
                                            <div className="p-7">
                                              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                                <div className="w-full sm:w-1/2">
                                                  <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="pujaName"
                                                  >
                                                    Puja name
                                                  </label>
                                                  <div className="relative">
                                                    {/* <span className="absolute left-4.5 top-4">
                                                                
                                                                </span> */}
                                                    <input
                                                      className="w-full rounded border border-stroke py-3 pl-6 pr-4.5 text-black focus:border-pg focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                      type="text"
                                                      name="pujaName"
                                                      id="pujaName"
                                                      value={puja.pujaName}
                                                      onChange={handleChange}
                                                      placeholder={
                                                        puja.pujaName
                                                      }
                                                      defaultValue="Graha Santi"
                                                    />
                                                  </div>
                                                </div>

                                                <div className="w-full sm:w-1/2">
                                                  <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="baseFare"
                                                  >
                                                    Puja Base Price(in Rs)
                                                  </label>
                                                  <input
                                                    className="w-full rounded border border-stroke  px-4.5 py-3 text-black focus:border-pg focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="number"
                                                    name="baseFare"
                                                    value={puja.baseFare}
                                                    onChange={handleChange}
                                                    // placeholder={puja.baseFare}
                                                  />
                                                </div>
                                              </div>

                                              {/* <SelectGroupTwo
                                                name="category"
                                                value={puja.category}
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                              /> */}

                                              <div className="mb-5.5">
                                                <label
                                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                  htmlFor="Duration"
                                                >
                                                  Durartion(in hr)
                                                </label>
                                                <input
                                                  className="w-full rounded border border-stroke  px-4.5 py-3 text-black focus:border-pg focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                  type="number"
                                                  id="Duration"
                                                  // placeholder={puja.duration}
                                                  name="duration"
                                                  value={puja.duration}
                                                  onChange={handleChange}
                                                />
                                              </div>

                                              <div className="mb-5.5">
                                                <label
                                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                  htmlFor="puja"
                                                >
                                                  Puja Info
                                                </label>
                                                <div className="relative">
                                                  <span className="absolute left-4.5 top-4">
                                                    <svg
                                                      className="fill-current"
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <g
                                                        opacity="0.8"
                                                        clipPath="url(#clip0_88_10224)"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                          fill=""
                                                        />
                                                        <path
                                                          fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                          fill=""
                                                        />
                                                      </g>
                                                      <defs>
                                                        <clipPath id="clip0_88_10224">
                                                          <rect
                                                            width="20"
                                                            height="20"
                                                            fill="white"
                                                          />
                                                        </clipPath>
                                                      </defs>
                                                    </svg>
                                                  </span>

                                                  <textarea
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-pg focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    id="puja"
                                                    rows={6}
                                                    placeholder={
                                                      puja.description
                                                    }
                                                    name="description"
                                                    value={puja.description}
                                                    onChange={handleChange}
                                                  ></textarea>
                                                </div>
                                              </div>

                                              <div className="flex justify-end gap-4.5">
                                                <button
                                                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                  type="submit"
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  className="flex justify-center rounded bg-pg px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                                  type="submit"
                                                >
                                                  {loading
                                                    ? "Processing"
                                                    : "Add"}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </ModalContent>
                            </ModalBody>
                          </div>
                        </Modal>

                        {/* <button className="text-danger" onClick={() => handleDelete(puja._id)}>
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
                      </button> */}
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
      ) : (
        <>
          <p className="text-slate-400 text-center">
            No pujas available right now !{" "}
          </p>
        </>
      )}

      {/* // </DefaultLayout> */}
    </div>
  );
};

export default Pujatable;
