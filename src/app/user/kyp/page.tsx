"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { FormEvent } from "react";
import { AuthContext } from "@/src/context/authcontext";
import axios, { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
import $axios from "@/src/lib/axios.instance";
import { toast } from "@/hooks/use-toast";

import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function page() {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const [fn, setFn] = useState<string>("");
  const [ln, setLn] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //schema part
  const kypSchema = z.object({
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),

    day: z
      .string()
      .min(1, "Day is required")
      .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day format"),

    month: z
      .string()
      .min(1, "Month is required")
      .regex(/^(0?[1-9]|1[0-2])$/, "Invalid month format"),

    year: z
      .string()
      .min(4, "Year is required")
      .regex(/^\d{4}$/, "Year must be a 4-digit number"),

    province: z.string().min(1, "Province is required"),
    district: z.string().min(1, "District is required"),
    municipality: z.string().min(1, "Municipality is required"),
    tolAddress: z.string().min(1, "Tol address is required"),

    pmProvince: z.string().min(1, "Permanent province is required"),
    pmDistrict: z.string().min(1, "Permanent district is required"),
    pmMun: z.string().min(1, "Permanent municipality is required"),
    pmToladdress: z.string().min(1, "Permanent tol address is required"),

    qualification: z.string().min(1, "Qualification is required"),
    institution: z.string().min(1, "Institution is required"),
    experience: z.string().min(1, "Experience is required"),

    qcertificate: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Qualification certificate is required",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        {
          message: "Only JPEG, PNG, and GIF files are allowed",
        }
      ),

    citizenshipFrontPhoto: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Citizenship front photo is required",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        {
          message: "Only JPEG, PNG, and GIF files are allowed",
        }
      ),

    citizenshipBackPhoto: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Citizenship back photo is required",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        {
          message: "Only JPEG, PNG, and GIF files are allowed",
        }
      ),
  });

  interface FormData {
    phoneNumber: string;
    day: string;
    month: string;
    year: string;
    province: string;
    district: string;
    municipality: string;
    tolAddress: string;
    pmProvince: string;
    pmDistrict: string;
    pmMun: string;
    pmToladdress: string;
    qualification: string;
    institution: string;
    experience: string;
    qcertificate: File | null;
    citizenshipFrontPhoto: File | null;
    citizenshipBackPhoto: File | null;
  }

  const form = useForm<FormData>({
    resolver: zodResolver(kypSchema),
    defaultValues: {
      phoneNumber: "",
      day: "",
      month: "",
      year: "",
      province: "",
      district: "",
      municipality: "",
      tolAddress: "",
      pmProvince: "",
      pmDistrict: "",
      pmMun: "",
      pmToladdress: "",
      qualification: "",
      institution: "",
      experience: "",
      qcertificate: undefined,
      citizenshipFrontPhoto: undefined,
      citizenshipBackPhoto: undefined,
    },
    // shouldFocusError: false, // Disable automatic focus on the first error
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("authcontext is", authContext);
        const loginfo = authContext?.loginfo;

        if (!loginfo) {
          console.warn("loginfo is not defined in authContext");
          return;
        }

        const response = await loginfo();
        console.log("response is", response);
        if (response) {
          setFn(response.firstName);
          setLn(response.lastName);
        }
        console.log("eta", fn, ln);
        // Fetch poojas with currentPage, itemsPerPage, and filters
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("Error fetching data:", error.message);
        }
      }
    };

    fetchData();
  }, [authContext, fn, ln]);

  const [uploading, setUploading] = useState(false); // State for uploading status
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload success/failure message
  const [fileName, setFileName] = useState(""); // State to hold the name of the uploaded file
  const [show, setShow] = useState(true);

  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(
    null
  ); // State for front image preview
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null); // State for back image preview
  const [frontFileName, setFrontFileName] = useState<string | null>(null); // State for front file name
  const [backFileName, setBackFileName] = useState<string | null>(null); // State for back file name
  const [frontUploading, setFrontUploading] = useState(false); // State for front upload status
  const [backUploading, setBackUploading] = useState(false); // State for back upload status
  const [frontUploadStatus, setFrontUploadStatus] = useState<string | null>(
    null
  ); // State for front upload message
  const [backUploadStatus, setBackUploadStatus] = useState<string | null>(null); // State for back upload message
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  const onError = (errors: any) => {
    // Display the first validation error in a toast
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast({
        title: "kyp verification info",
        description: "Please check all the errors and try again !",
        className: "bg-red-500 border-red-500 text-white font-semibold ",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    // e.preventDefault();
    setLoading(true);
    console.log("formData is", data);
    try {
      const response = await $axios.post("/api/v1/kyp/fillKYP", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("form response is", response);
      router.push(`/user`);

      setLoading(false);
      if (response.data.success) {
        setSuccess(true);
        toast({
          title: "kyp verification info",
          description: "kyp has been sent succssfully",
          className: "bg-green-500 border-green-500 text-white font-semibold ",
        });
      }

      // alert("puja ");
    } catch (error: any) {
      setLoading(false);
      console.log("error is ", error);
      setError(true);
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
      // alert(`${error.response?.data?.message} please try again!`);
    }
  };

  const [activeTab, setActiveTab] = useState<number>(1);
  const [animateTab, setAnimateTab] = useState(false);
  const handleNext = () => {
    setAnimateTab(true);
    setTimeout(() => {
      setActiveTab((prevTab) => (prevTab < 4 ? prevTab + 1 : prevTab)); // Only increments until tab 4
      setAnimateTab(false);
    }, 300); // Match animation duration
  };
  const handlePrevious = () => {
    setAnimateTab(true);
    setTimeout(() => {
      setActiveTab((prevTab) => (prevTab === 1 ? prevTab : prevTab - 1)); // Prevent cycling to the last tab
      setAnimateTab(false);
    }, 300);
  };

  const [isSameAsTemporary, setIsSameAsTemporary] = useState(false);

  // Data for cascading dropdowns
  const provinces = {
    "Province 1": ["Sunsari", "Morang", "Jhapa"],
    "Province 2": ["Dhanusha", "Siraha", "Saptari"],
    Bagmati: ["Kathmandu", "Bhaktapur", "Lalitpur"],
    Gandaki: ["Pokhara", "Kaski", "Tanahun"],
    Lumbini: ["Rupandehi", "Kapilvastu", "Nawalparasi"],
    Karnali: ["Surkhet", "Dailekh", "Jumla"],
    Sudurpashchim: ["Kailali", "Doti", "Achham"],
  };

  const municipalities = {
    Sunsari: ["Itahari", "Dharan"],
    Morang: ["Biratnagar", "Belbari"],
    Jhapa: ["Birtamod", "Damak"],
    Kathmandu: ["Kathmandu Metropolitan", "Budhanilkantha Municipality"],
    Bhaktapur: ["Bhaktapur Municipality", "Madhyapur Thimi Municipality"],
    Lalitpur: ["Lalitpur Sub-Metropolitan", "Godawari Municipality"],
    // Add other districts and their municipalities as needed
  };

  const handleCopyAddress = () => {
    const { province, district, municipality, tolAddress } = form.getValues(); // Get temporary address values

    if (!isSameAsTemporary) {
      // Copy temporary address to permanent address
      form.setValue("pmProvince", province);
      form.setValue("pmDistrict", district);
      form.setValue("pmMun", municipality);
      form.setValue("pmToladdress", tolAddress);
    } else {
      // Clear permanent address fields
      form.setValue("pmProvince", "");
      form.setValue("pmDistrict", "");
      form.setValue("pmMun", "");
      form.setValue("pmToladdress", "");
    }

    // Toggle the checkbox state
    setIsSameAsTemporary(!isSameAsTemporary);
  };

  return (
    <>
      <div className=' relative bg-[url("/img/kypbg.jpg")] pb-20 bg-cover bg-center lg:container pt-20 flex justify-center items-center px-10 lg:px-0 '>
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
        {error && (
          <div
            style={{
              color: "white",
              padding: "10px",
              marginTop: "20px",
              borderRadius: "5px",
            }}
            className=" bg-danger z-9999 fixed top-11 right-3 animate-fade-in-right w-60 mb-10 p-2"
          >
            {errorMessage}
          </div>
        )}
        <div className="flex  lg:p-15  lg:shadow-lg lg:shadow-black/50">
          {/* // */}

          <Form {...form}>
            <form className="" onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="flex gap-4 mb-10 justify-center ">
                <button
                  className={`px-8 py-1 h-full border-2 rounded-lg focus:outline-none ${
                    activeTab === 1 ? "bg-pandit text-white" : "border-pandit"
                  }`}
                  onClick={() => setActiveTab(1)}
                ></button>
                <button
                  className={`px-8 py-1 h-full border-2 rounded-lg focus:outline-none ${
                    activeTab === 2 ? "bg-pandit text-white" : "border-pandit"
                  }`}
                  // onClick={() => setActiveTab(1)}
                ></button>

                <button
                  className={`px-8 py-1  border-2 rounded-lg focus:outline-none ${
                    activeTab === 3
                      ? "bg-pandit text-white"
                      : "border-pandit text-gray-700"
                  }`}
                ></button>
                <button
                  className={`px-8 py-1   border-2 rounded-lg focus:outline-none ${
                    activeTab === 4
                      ? "bg-pandit text-white"
                      : "border-pandit text-gray-700"
                  }`}
                ></button>
              </div>

              {activeTab === 1 && (
                <div
                  className={`transition-transform duration-300 ease-in-out px-4 sm:px-6 md:px-8 lg:px-0 ${
                    animateTab ? "transform scale-95 opacity-0" : ""
                  }`}
                >
                  {/* Header Section */}
                  <div className="flex justify-center items-center font-bold mb-6 sm:mb-8">
                    <h1 className="text-pandit text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-tight">
                      Personal Info
                    </h1>
                  </div>
                
                  {/* Name Fields Container */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 md:gap-6 pt-5 mb-6">
                    
                    {/* First Name Field */}
                    <div className="mb-4 w-full sm:w-1/2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm sm:text-base font-medium text-black mb-2"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          disabled
                          type="text"
                          id="first-name"
                          name="firstName"
                          defaultValue={fn}
                          className="bg-white mt-1 block rounded-md p-3 pl-10 pr-3 w-full text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                          placeholder="First name"
                          style={{ color: "black" }}
                          required
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      </div>
                    </div>
                
                    {/* Last Name Field */}
                    <div className="mb-4 w-full sm:w-1/2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm sm:text-base font-medium text-black mb-2"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          disabled
                          type="text"
                          id="last-name"
                          name="lastName"
                          defaultValue={ln}
                          className="bg-white mt-1 block rounded-md p-3 pl-10 pr-3 w-full text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                          placeholder="Last name"
                          style={{ color: "black" }}
                          required
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                
                  {/* Phone Number Field */}
                  <div className="mb-6">
                    <FormField
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="tel"
                                maxLength={10}
                                placeholder="Enter your phone number"
                                {...field}
                                className="mt-1 block border border-gray-300 bg-white rounded-md p-3 pl-10 pr-3 w-full text-black text-sm sm:text-base focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                style={{ color: "black" }}
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                />
                              </svg>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                
                  {/* Date of Birth Section */}
                  <div className="mb-8">
                    <FormLabel className="block text-sm sm:text-base font-medium text-black mb-3">
                      Date of Birth
                    </FormLabel>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
                      
                      {/* Day Dropdown */}
                      <FormField
                        control={control}
                        name="day"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/3">
                            <FormControl>
                              <select
                                {...field}
                                className="border border-gray-300 bg-white rounded-md p-3 text-black text-sm sm:text-base w-full focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                              >
                                <option value="" className="text-gray-500">
                                  Select Day
                                </option>
                                {Array.from({ length: 31 }, (_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs sm:text-sm mt-1">
                              {errors.day?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                
                      {/* Month Dropdown */}
                      <FormField
                        control={control}
                        name="month"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/3">
                            <FormControl>
                              <select
                                {...field}
                                className="border border-gray-300 bg-white rounded-md p-3 text-black text-sm sm:text-base w-full focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                              >
                                <option value="" className="text-gray-500">
                                  Select Month
                                </option>
                                {[
                                  "January",
                                  "February",
                                  "March",
                                  "April",
                                  "May",
                                  "June",
                                  "July",
                                  "August",
                                  "September",
                                  "October",
                                  "November",
                                  "December",
                                ].map((month, index) => (
                                  <option key={index + 1} value={index + 1}>
                                    {month}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs sm:text-sm mt-1">
                              {errors.month?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                
                      {/* Year Dropdown */}
                      <FormField
                        control={control}
                        name="year"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/3">
                            <FormControl>
                              <select
                                {...field}
                                className="border border-gray-300 bg-white rounded-md p-3 text-black text-sm sm:text-base w-full focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                              >
                                <option value="" className="text-gray-500">
                                  Select Year
                                </option>
                                {Array.from(
                                  { length: 100 },
                                  (_, i) => new Date().getFullYear() - i
                                ).map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs sm:text-sm mt-1">
                              {errors.year?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                
                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12 sm:mt-16 md:mt-20">
                    {activeTab !== 1 && (
                      <Button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        variant="default"
                        size="default"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">Previous</span>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      variant="default"
                      size="default"
                    >
                      <span className="text-sm sm:text-base">Next</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <>
                  <div className="px-4 sm:px-6 md:px-8 lg:px-0">
                    {/* Header Section */}
                    <div className="flex justify-center sm:justify-start items-center font-bold mb-6 sm:mb-8">
                      <h1 className="text-pandit text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center sm:text-left leading-tight">
                        Address Info
                      </h1>
                    </div>
                    
                    {/* Address Forms Container */}
                    <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 mb-12 sm:mb-16 md:mb-20 mt-6 sm:mt-8">
                      
                      {/* Temporary Address Section */}
                      <div className="w-full lg:w-1/2">
                        <div className="mb-4 sm:mb-6">
                          <div className="flex items-start gap-2 pt-3 sm:pt-5 mb-2">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-pandit">
                              Temporary Address
                            </h1>
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base">
                            Fill your temporary residential address
                          </p>
                        </div>
                
                        {/* Province and District Row */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-3 sm:pt-5">
                          {/* Province Dropdown */}
                          <FormField
                            control={control}
                            name="province"
                            render={({ field }) => (
                              <FormItem className="mb-4 w-full sm:w-1/2">
                                <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                  Province
                                </FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      form.setValue("district", "");
                                      form.setValue("municipality", "");
                                    }}
                                    className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                    required
                                  >
                                    <option value="" disabled className="text-gray-500">
                                      Select Province
                                    </option>
                                    {Object.keys(provinces).map((prov) => (
                                      <option key={prov} value={prov}>
                                        {prov}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1">
                                  {errors.province?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                
                          {/* District Dropdown */}
                          <FormField
                            control={control}
                            name="district"
                            render={({ field }) => (
                              <FormItem className="mb-4 w-full sm:w-1/2">
                                <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                  District
                                </FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      form.setValue("municipality", "");
                                    }}
                                    className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                    disabled={!form.getValues("province")}
                                  >
                                    <option value="" disabled className="text-gray-500">
                                      Select District
                                    </option>
                                    {form.getValues("province") &&
                                      provinces[
                                        form.getValues("province") as keyof typeof provinces
                                      ]?.map((dist) => (
                                        <option key={dist} value={dist}>
                                          {dist}
                                        </option>
                                      ))}
                                  </select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1">
                                  {errors.district?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                
                        {/* Municipality Dropdown */}
                        <FormField
                          control={control}
                          name="municipality"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Municipality
                              </FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                  required
                                  disabled={!form.getValues("district")}
                                >
                                  <option value="" disabled className="text-gray-500">
                                    Select Municipality
                                  </option>
                                  {form.getValues("district") &&
                                    municipalities[
                                      form.getValues("district") as keyof typeof municipalities
                                    ]?.map((mun) => (
                                      <option key={mun} value={mun}>
                                        {mun}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.municipality?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                
                        {/* Tol Address Input */}
                        <FormField
                          control={control}
                          name="tolAddress"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Tol Address
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="text"
                                  {...field}
                                  placeholder="Enter Tol Address"
                                  className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                  required
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.tolAddress?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                
                      {/* Permanent Address Section */}
                      <div className="w-full lg:w-1/2">
                        <div className="mb-4 sm:mb-6">
                          <div className="flex items-start gap-2 pt-3 sm:pt-5 mb-2">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-pandit">
                              Permanent Address
                            </h1>
                          </div>
                          <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSameAsTemporary}
                              onChange={handleCopyAddress}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-pandit bg-gray-100 border-gray-300 rounded focus:ring-pandit focus:ring-2"
                            />
                            <span className="text-sm sm:text-base text-gray-700 font-medium">
                              Same as Temporary Address
                            </span>
                          </label>
                        </div>
                
                        {/* Province and District Row */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-3 sm:pt-5">
                          {/* Province Dropdown */}
                          <FormField
                            control={control}
                            name="pmProvince"
                            render={({ field }) => (
                              <FormItem className="mb-4 w-full sm:w-1/2">
                                <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                  Province
                                </FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      form.setValue("pmDistrict", "");
                                      form.setValue("pmMun", "");
                                    }}
                                    className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                    disabled={isSameAsTemporary}
                                  >
                                    <option value="" disabled className="text-gray-500">
                                      Select Province
                                    </option>
                                    {Object.keys(provinces).map((prov) => (
                                      <option key={prov} value={prov}>
                                        {prov}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1">
                                  {errors.pmProvince?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                
                          {/* District Dropdown */}
                          <FormField
                            control={control}
                            name="pmDistrict"
                            render={({ field }) => (
                              <FormItem className="mb-4 w-full sm:w-1/2">
                                <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                  District
                                </FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      form.setValue("pmMun", "");
                                    }}
                                    className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                    disabled={!form.getValues("pmProvince") || isSameAsTemporary}
                                  >
                                    <option value="" disabled className="text-gray-500">
                                      Select District
                                    </option>
                                    {form.getValues("pmProvince") &&
                                      provinces[
                                        form.getValues("pmProvince") as keyof typeof provinces
                                      ]?.map((dist) => (
                                        <option key={dist} value={dist}>
                                          {dist}
                                        </option>
                                      ))}
                                  </select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1">
                                  {errors.pmDistrict?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                
                        {/* Municipality Dropdown */}
                        <FormField
                          control={control}
                          name="pmMun"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Municipality
                              </FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                  required
                                  disabled={!form.getValues("pmDistrict") || isSameAsTemporary}
                                >
                                  <option value="" disabled className="text-gray-500">
                                    Select Municipality
                                  </option>
                                  {form.getValues("pmDistrict") &&
                                    municipalities[
                                      form.getValues("pmDistrict") as keyof typeof municipalities
                                    ]?.map((mun) => (
                                      <option key={mun} value={mun}>
                                        {mun}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.pmMun?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                
                        {/* Tol Address Input */}
                        <FormField
                          control={control}
                          name="pmToladdress"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Tol Address
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="text"
                                  {...field}
                                  placeholder="Enter Tol Address"
                                  className="mt-1 block bg-white text-black rounded-md p-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                  required
                                  disabled={isSameAsTemporary}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.pmToladdress?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12 sm:mt-16 md:mt-20">
                      {/* Previous Button */}
                      <Button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        variant="default"
                        size="default"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">Previous</span>
                      </Button>
                
                      {/* Next Button */}
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        variant="default"
                        size="default"
                      >
                        <span className="text-sm sm:text-base">Next</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {activeTab === 3 && (
                <>
                  <div className="flex justify-start items-center font-bold mb-6 sm:mb-8">
                    <h1 className="text-pandit text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                      Education and Professional Details
                    </h1>
                  </div>
                
                  <div className="flex flex-col items-start">
                    {/* Form Fields Container */}
                    <div className="flex flex-col sm:flex-row lg:flex-row items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 pt-5 w-full">
                      
                      {/* Qualification Input */}
                      <div className="mb-4 w-full sm:w-1/3">
                        <FormField
                          control={control}
                          name="qualification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Qualification
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input
                                    type="text"
                                    {...field}
                                    className="bg-white mt-1 block rounded-md p-3 pl-10 pr-3 w-full text-black text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                    placeholder="Passed till"
                                    style={{ color: "black" }}
                                    required
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                  </svg>
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.qualification?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                
                      {/* Institution Input */}
                      <div className="mb-4 w-full sm:w-1/3">
                        <FormField
                          control={control}
                          name="institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Name of the Institution
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input
                                    type="text"
                                    {...field}
                                    className="mt-1 block text-black rounded-md p-3 pl-3 pr-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                    placeholder="Name of your institution"
                                    style={{ color: "black" }}
                                    required
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.institution?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                
                      {/* Years of Experience Input */}
                      <div className="mb-4 w-full sm:w-1/3">
                        <FormField
                          control={control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                                Years of Experience
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input
                                    type="number"
                                    {...field}
                                    className="mt-1 block text-black rounded-md p-3 pl-3 pr-3 w-full text-sm sm:text-base border border-gray-300 focus:ring-2 focus:ring-pandit focus:border-pandit transition-all duration-200"
                                    placeholder="Experience Years"
                                    style={{ color: "black" }}
                                    required
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm mt-1">
                                {errors.experience?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                
                  {/* Document Section */}
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-8 sm:mt-10 md:mt-12">
                    
                    {/* Document Tips Section */}
                    <div className="w-full lg:w-1/2">
                      <h1 className="text-pandit text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
                        Document Tips - Proof of Address
                      </h1>
                      <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        Here are a few tips to help you submit the right kind of
                        documents - you only need to do this once!
                      </p>
                      <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base space-y-2 sm:space-y-3">
                        <li>
                          The document must be issued within the last{" "}
                          <strong>3 months</strong> (<strong>12 months</strong>{" "}
                          for income tax letters).
                        </li>
                        <li>
                          All edges of the document must be visible in the
                          photo. Make sure that the document is fully visible
                          and in focus.
                        </li>
                        <li>
                          There must be no manipulation, edits, watermarks,
                          impediments, etc. on the document (electronic or
                          paper).
                        </li>
                      </ul>
                      <h1 className="text-pandit text-lg sm:text-xl md:text-2xl font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
                        Must Contain the following
                      </h1>
                      <div className="text-gray-700 text-sm sm:text-base space-y-1 sm:space-y-2">
                        <p>• Full name & address</p>
                        <p>• Date of issue</p>
                        <p>• Company logo/name or stamp/signature</p>
                      </div>
                    </div>
                
                    {/* File Upload Section */}
                    <div className="w-full lg:w-1/2">
                      <Controller
                        name="qcertificate"
                        control={control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                              Qualification Certificate
                            </FormLabel>
                            <FormControl>
                              <div
                                id="FileUpload"
                                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-lg border-2 border-dashed border-pandit/60 backdrop-blur-lg bg-black/10 shadow-lg shadow-black/20 px-4 sm:px-6 py-6 sm:py-8 md:py-10 hover:border-pandit/80 transition-all duration-300"
                              >
                                <h1 className="font-bold text-center mb-3 sm:mb-4 text-lg sm:text-xl text-pandit">
                                  Qualification Certificate
                                </h1>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                      setFileName(file.name);
                
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  required
                                />
                                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                                  {!imagePreview && (
                                    <>
                                      <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-5 h-5 sm:w-6 sm:h-6"
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
                                      <p className="text-center text-sm sm:text-base">
                                        <span className="text-pandit font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        SVG, PNG, JPG or GIF
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        (max, 800 X 800px)
                                      </p>
                                    </>
                                  )}
                
                                  {/* Image Preview */}
                                  {imagePreview && (
                                    <div className="w-full max-w-xs sm:max-w-sm">
                                      <img
                                        src={imagePreview}
                                        alt="Qualification Certificate Preview"
                                        className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 rounded-lg object-cover border-2 border-gray-200"
                                      />
                                    </div>
                                  )}
                
                                  {/* Upload Status Indicator */}
                                  {uploading && (
                                    <p className="text-blue-500 text-sm sm:text-base flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                      Uploading...
                                    </p>
                                  )}
                                  {uploadStatus && !uploading && (
                                    <div className="flex gap-2 items-center">
                                      <p className="text-green-500 text-sm sm:text-base">
                                        {uploadStatus}
                                      </p>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-500"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                      </svg>
                                    </div>
                                  )}
                
                                  {/* Display file name and options after upload */}
                                  {fileName && !uploading && (
                                    <div className="flex flex-col items-center mt-4 space-y-2">
                                      <p className="text-xs sm:text-sm text-gray-700 text-center break-all">
                                        Uploaded File: {fileName}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                          fileInput?.click();
                                        }}
                                        className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors duration-200"
                                      >
                                        Replace File
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1">
                              {errors.qcertificate?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                
                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12 sm:mt-16 md:mt-20">
                    {activeTab === 3 && (
                      <Button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        variant="default"
                        size="default"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">Previous</span>
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-w-32 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      variant="default"
                      size="default"
                    >
                      <span className="text-sm sm:text-base">Next</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </>
                // ...existing code...
              )}
              {activeTab == 4 && (
                               // ...existing code...
                <div className="px-4 sm:px-6 md:px-8 lg:px-0">
                  {/* Header Section */}
                  <div className="mb-6 sm:mb-8 md:mb-10">
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-medium">
                      PLEASE UPLOAD CLEAR PICTURE OF YOUR CITIZENSHIP
                    </p>
                    
                    <h1 className="text-pandit text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
                      Document Tips - Proof of Address
                    </h1>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                      Here are a few tips to help you submit the right kind of
                      documents - you only need to do this once!
                    </p>
                    
                    {/* Tips List */}
                    <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      <li>
                        The document must be issued within the last{" "}
                        <strong>3 months</strong> (<strong>12 months</strong> for
                        income tax letters).
                      </li>
                      <li>
                        All edges of the document must be visible in the photo.
                        Make sure that the document is fully visible and in focus.
                      </li>
                      <li>
                        There must be no manipulation, edits, watermarks,
                        impediments, etc. on the document (electronic or paper).
                      </li>
                    </ul>
                    
                    {/* Requirements Section */}
                    <h1 className="text-pandit text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
                      Must Contain the following
                    </h1>
                    <div className="text-gray-700 text-sm sm:text-base space-y-1 sm:space-y-2 mb-8 sm:mb-10">
                      <p>• Full name & address</p>
                      <p>• Date of issue</p>
                      <p>• Company logo/name or stamp/signature</p>
                    </div>
                  </div>
                
                  {/* File Upload Section */}
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
                    
                    {/* Citizenship Front File Upload */}
                    <div className="w-full lg:w-1/2">
                      <Controller
                        name="citizenshipFrontPhoto"
                        control={control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                              Citizenship Front
                            </FormLabel>
                            <FormControl>
                              <div
                                id="FileUpload"
                                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-lg border-2 border-dashed border-pandit/60 backdrop-blur-lg bg-black/10 shadow-lg shadow-black/20 px-4 sm:px-6 py-6 sm:py-8 md:py-10 hover:border-pandit/80 transition-all duration-300"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                      setFrontFileName(file.name);
                
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setFrontImagePreview(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  required
                                />
                                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                                  {!frontImagePreview && (
                                    <>
                                      <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-5 h-5 sm:w-6 sm:h-6"
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
                                      <p className="text-center text-sm sm:text-base">
                                        <span className="text-pandit font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        SVG, PNG, JPG or GIF
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        (max, 800 X 800px)
                                      </p>
                                    </>
                                  )}
                
                                  {/* Image Preview */}
                                  {frontImagePreview && (
                                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                                      <img
                                        src={frontImagePreview}
                                        alt="Citizenship Front Preview"
                                        className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 rounded-lg object-cover border-2 border-gray-200"
                                      />
                                    </div>
                                  )}
                
                                  {/* Upload Status Indicator */}
                                  {frontUploading && (
                                    <p className="text-blue-500 text-sm sm:text-base flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                      Uploading...
                                    </p>
                                  )}
                                  {frontUploadStatus && !frontUploading && (
                                    <div className="flex gap-2 items-center">
                                      <p className="text-green-500 text-sm sm:text-base">
                                        {frontUploadStatus}
                                      </p>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-500"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                      </svg>
                                    </div>
                                  )}
                
                                  {/* Display file name and options after upload */}
                                  {frontFileName && !frontUploading && (
                                    <div className="flex flex-col items-center mt-4 space-y-2">
                                      <p className="text-xs sm:text-sm text-gray-700 text-center break-all">
                                        Uploaded File: {frontFileName}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const fileInputs = document.querySelectorAll('input[type="file"]');
                                          (fileInputs[1] as HTMLInputElement)?.click(); // Target front upload input
                                        }}
                                        className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors duration-200"
                                      >
                                        Replace File
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1">
                              {errors.citizenshipFrontPhoto?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                
                    {/* Citizenship Back File Upload */}
                    <div className="w-full lg:w-1/2">
                      <Controller
                        name="citizenshipBackPhoto"
                        control={control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm sm:text-base font-medium text-black mb-2">
                              Citizenship Back
                            </FormLabel>
                            <FormControl>
                              <div
                                id="FileUpload"
                                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-lg border-2 border-dashed border-pandit/60 backdrop-blur-lg bg-black/10 shadow-lg shadow-black/20 px-4 sm:px-6 py-6 sm:py-8 md:py-10 hover:border-pandit/80 transition-all duration-300"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                      setBackFileName(file.name);
                
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setBackImagePreview(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  required
                                />
                                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                                  {!backImagePreview && (
                                    <>
                                      <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-5 h-5 sm:w-6 sm:h-6"
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
                                      <p className="text-center text-sm sm:text-base">
                                        <span className="text-pandit font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        SVG, PNG, JPG or GIF
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500">
                                        (max, 800 X 800px)
                                      </p>
                                    </>
                                  )}
                
                                  {/* Image Preview */}
                                  {backImagePreview && (
                                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                                      <img
                                        src={backImagePreview}
                                        alt="Citizenship Back Preview"
                                        className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 rounded-lg object-cover border-2 border-gray-200"
                                      />
                                    </div>
                                  )}
                
                                  {/* Upload Status Indicator */}
                                  {backUploading && (
                                    <p className="text-blue-500 text-sm sm:text-base flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                      Uploading...
                                    </p>
                                  )}
                                  {backUploadStatus && !backUploading && (
                                    <div className="flex gap-2 items-center">
                                      <p className="text-green-500 text-sm sm:text-base">
                                        {backUploadStatus}
                                      </p>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-500"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                      </svg>
                                    </div>
                                  )}
                
                                  {/* Display file name and options after upload */}
                                  {backFileName && !backUploading && (
                                    <div className="flex flex-col items-center mt-4 space-y-2">
                                      <p className="text-xs sm:text-sm text-gray-700 text-center break-all">
                                        Uploaded File: {backFileName}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const fileInputs = document.querySelectorAll('input[type="file"]');
                                          (fileInputs[2] as HTMLInputElement)?.click(); // Target back upload input
                                        }}
                                        className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors duration-200"
                                      >
                                        Replace File
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1">
                              {errors.citizenshipBackPhoto?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                
                  {/* Submit Button */}
                  <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                    <Button
                      type="submit"
                      className="bg-pandit hover:bg-pandit/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 w-full sm:w-auto min-w-40 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      variant="default"
                      size="default"
                    >
                      {loading ? (
                        <>
                          <span>Please wait</span>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                // ...existing code...
              )}
            </form>
          </Form>
          <br />
        </div>
      </div>
    </>
  );
}

export default page;
