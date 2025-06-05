'use client';
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import BookingForm from "@/src/components/User/BookingForm";
import axios from "axios";
import { useParams } from "next/navigation";
import $axios from "@/src/lib/axios.instance";

function page() {

interface pujaData{
  pujaName:string;
  pujaImage:string
}
const [pujaData,setPujaData]=useState<pujaData>({
  pujaName: "",
  pujaImage: "",
})
  const {id}=useParams();

  useEffect(() => {
    const fetchDetailPuja = async () => {
      console.log("id is", id);
      const token = localStorage.getItem("token_id");
      try {
        const res = await $axios.get(`/api/v1/admin/getSpecificPuja/${id}`);

        console.log("res", res.data.data);
        setPujaData(res.data.data);
      } catch (error) {
        console.log("Error fetching puja details:", error);
      }
    };
    if (id) fetchDetailPuja(); // Run only if id is available
  }, [id]); // Dependency on id
  
  const puja = {
    pujaName: "Maha Shivaratri Puja",
    baseFare: 5000,
    category: "Shiva",
    duration: "2 hours",
    description:
      "A sacred ceremony dedicated to Lord Shiva, performed with devotion and reverence. The puja includes chanting, offerings, and rituals to invoke the blessings of Lord Shiva for health, prosperity, and spiritual growth.",
    pujaImage: "https://example.com/images/maha-shivaratri.jpg", // Replace with a valid image URL or base64 encoded string for binary data
  };


  
  const [date, setDate] = React.useState<Date>()

  
  // Data for cascading dropdowns
  const provinces = {
    Province1: ["Sunsari", "Morang", "Jhapa"],
    Province2: ["Dhanusha", "Siraha", "Saptari"],
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

  };


  //tabs
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { name: 'About', id: 'about' },
    { name: 'Process', id: 'process' },
    { name: 'Pandits', id: 'pandits' }
  ];
  return (
    <>
      <div className="container mt-10">
        <Breadcrumb className="my-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/viewPuja">
                Pujas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-pandit">{pujaData.pujaName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="content">
         
          <div className="heading w-1/2 mb-8">

            <div className="flex gap-3 items-center ">
              <h1 className="text-4xl font-bold text-pandit">{pujaData.pujaName} </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>
            <p className="text-gray-600">This is the subtitle</p>
          </div>
          <div className="mainbody flex gap-10">
            <div className="w-4/6">
            {pujaData?.pujaImage ? (
  <img
    src={pujaData.pujaImage}
    alt="Puja Image"
    className="w-full rounded-xl h-94 object-cover object-center"
  />
) : (
  <p>No image available</p> // You can show a placeholder or any fallback content here
)}
             <div className="fortab my-10">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-pandit text-pandit'
                : 'text-gray-600 hover:text-pandit'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="mt-2 text-gray-700">
              This section explains the background and details of the service.
            </p>
          </div>
        )}
        {activeTab === 'process' && (
          <div>
            <h2 className="text-2xl font-semibold">Process</h2>
            <p className="mt-2 text-gray-700">
              This section outlines the steps involved in the service.
            </p>
          </div>
        )}
        {activeTab === 'pandits' && (
          <div>
            <h2 className="text-2xl font-semibold">Pandits</h2>
            <p className="mt-2 text-gray-700">
              This section provides information about the pandits.
            </p>
          </div>
        )}
      </div>
    </div>
            </div>
            <div className="booking form ">
              <BookingForm id={String(id)} />
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
