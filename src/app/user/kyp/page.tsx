'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
function page() {
   const [activeTab, setActiveTab] = useState(1);
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
        setActiveTab((prevTab) => (prevTab === 1 ? 4 : prevTab - 1)); // Cycles to the last tab if on the first
        setAnimateTab(false);
      }, 300);
    };
    const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [tolAddress, setTolAddress] = useState('');

  const [permanentProvince, setPermanentProvince] = useState('');
  const [permanentDistrict, setPermanentDistrict] = useState('');
  const [permanentMunicipality, setPermanentMunicipality] = useState('');
  const [permanentTolAddress, setPermanentTolAddress] = useState('');
  const [isSameAsTemporary, setIsSameAsTemporary] = useState(false);


  // Data for cascading dropdowns
  const provinces = {
    "Province 1": ["Sunsari", "Morang", "Jhapa"],
    "Province 2": ["Dhanusha", "Siraha", "Saptari"],
    Bagmati: ["Kathmandu", "Bhaktapur", "Lalitpur"],
    Gandaki: ["Pokhara", "Kaski", "Tanahun"],
    Lumbini: ["Rupandehi", "Kapilvastu", "Nawalparasi"],
    Karnali: ["Surkhet", "Dailekh", "Jumla"],
    Sudurpashchim: ["Kailali", "Doti", "Achham"]
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

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict(''); // Reset district and municipality when province changes
    setMunicipality('');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMunicipality(''); // Reset municipality when district changes
  };

  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
  };
  const handlePermanentProvinceChange = (e) => {
    setPermanentProvince(e.target.value);
    setPermanentDistrict('');
    setPermanentMunicipality('');
  };

  const handlePermanentDistrictChange = (e) => {
    setPermanentDistrict(e.target.value);
    setPermanentMunicipality('');
  };

  const handlePermanentMunicipalityChange = (e) => {
    setPermanentMunicipality(e.target.value);
  };

  const handleCopyAddress = () => {
    if (!isSameAsTemporary) {
      setPermanentProvince(province);
      setPermanentDistrict(district);
      setPermanentMunicipality(municipality);
      setPermanentTolAddress(tolAddress);
    } else {
      setPermanentProvince('');
      setPermanentDistrict('');
      setPermanentMunicipality('');
      setPermanentTolAddress('');
    }
    setIsSameAsTemporary(!isSameAsTemporary);
  };

  return (
    <>
    <div className='bg-[url("/img/kypbg.jpg")] pb-20 bg-cover bg-center container pt-20 flex justify-center items-center'>

    <div className="flex  p-15  shadow-lg shadow-black/50">
    {/* //onSubmit={handleSubmit} */}
<form  className=''>

      
<div className="flex gap-4 mb-10 justify-center">
        <button
          className={`px-8 py-1 h-full border-2 rounded-lg focus:outline-none ${
            activeTab === 1
              ? 'bg-pandit text-white'
              : 'border-pandit'
          }`}
          onClick={() => setActiveTab(1)}
        >
        </button>
        <button
          className={`px-8 py-1 h-full border-2 rounded-lg focus:outline-none ${
            activeTab === 2
              ? 'bg-pandit text-white'
              : 'border-pandit'
          }`}
          onClick={() => setActiveTab(1)}
        >
        </button>
     
      
        <button
          className={`px-8 py-1  border-2 rounded-lg focus:outline-none ${
            activeTab === 3
              ? 'bg-pandit text-white'
              : 'border-pandit text-gray-700'
          }`}
          onClick={() => setActiveTab(3)}
        >
        </button>
         <button
          className={`px-8 py-1   border-2 rounded-lg focus:outline-none ${
            activeTab === 4
              ? 'bg-pandit text-white'
              : 'border-pandit text-gray-700'
          }`}
          onClick={() => setActiveTab(4)}
        >
        </button>
      </div>
      
      {activeTab === 1 && (

      
      <div
        className={`transition-transform duration-300 ease-in-out ${
          animateTab ? 'transform scale-95 opacity-0' : ''
        }`}
      >
      
        
         
         <div className="flex justify-center items-center font-bold">
{/* <Image
src="/img/logo_bg.png"
alt="Purohit Logo"
width={100}
height={50}

/> */}
<h1 className="text-pandit text-3xl">Personal Info</h1>
</div>

  {/* Name Fields */}
  <div className="flex  items-center gap-5 pt-5">

  <div className="mb-4">
    <label htmlFor="first-name" className="block text-sm font-medium text-black">
      First Name
    </label>
    <div className="relative">
    <input
      type="text"
      id="first-name"
      name="firstName"
      // value={formData.firstName}
      // onChange={handleInput}
      className=" bg-white mt-1 block rounded-md p-3 ps-10 relative w-45 text-gray    sm:text-sm/6 border "
      placeholder=" first name"
      style={{color: 'black'}}
      width={60}
      required
    />

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-3 start-1 text-black">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>


    </div>
  </div>

  <div className="mb-4">
    <label htmlFor="last-name" className="block text-sm font-medium text-black">
      Last Name
    </label>
    <div className="relative">
    <input
      type="text"
      id="last-name"
      name="lastName"
      // value={formData.lastName}
      // onChange={handleInput}
      className="mt-1 block   text-black rounded-md p-3 ps-10 w-45  sm:text-sm/6  border "
      placeholder="Last name"
      style={{color: 'black'}}
      required
    />

    </div>
    
  </div>
  </div>

  {/* phoneNumber Field */}
  <div className="mb-4">
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
    {/* text-gray-700 */}
  Phone Number 
    </label>
    <div className="relative">
    <input
      type="phoneNumber"
      id="phoneNumber"
      name="phoneNumber"
      // value={formData.phoneNumber}
      // onChange={handleInput}
  //     onInvalid={(e) => e.currentTarget.setCustomValidity("Invalid :Please include an '@' and a valid domain (e.g., example@domain.com)")}
  // onInput={(e) => e.currentTarget.setCustomValidity('')} 
      className="mt-1 block border border-white bg-white rounded-md p-3 ps-10  w-96 text-black  sm:text-sm/6 "
      placeholder="Enter your phone number"
      style={{color: 'black'}}
      required
    />
 
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 start-1 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>



    </div>
  </div>

{/* date of birth */}
<div className="mb-4">
  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-black">
    Date of Birth
  </label>
  <div className="relative flex gap-2 mt-1">
    {/* Day Dropdown */}
    <select
      id="day"
      name="day"
      className="border border-white bg-white rounded-md p-3 text-black sm:text-sm w-1/3"
      required
    >
      <option value="" disabled selected>
        Day
      </option>
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>

    {/* Month Dropdown */}
    <select
      id="month"
      name="month"
      className="border border-white bg-white rounded-md p-3 text-black sm:text-sm w-1/3"
      required
    >
      <option value="" disabled selected>
        Month
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

    {/* Year Dropdown */}
    <select
      id="year"
      name="year"
      className="border border-white bg-white rounded-md p-3 text-black sm:text-sm w-1/3"
      required
    >
      <option value="" disabled selected>
        Year
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
  </div>
</div>
<Button
      onClick={handleNext}
                className=" bg-pandit  text-white mt-10 ms-30 w-30"
                variant="default"
                size="default"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
</div>

 )}
{activeTab === 2 && (

  <>
   <div className="flex justify-center items-center font-bold">
        <h1 className="text-pandit text-3xl">Address Info</h1>
      </div>
      <div className="flex gap-20 mb-20">
<div className="tp">
<div className="flex items-start gap-5 pt-5">
        <h1 className="text-xl font-semibold">Temporary Address</h1>
      </div>
      <p>fill your temporary residental address</p>
      <div className="flex  gap-20 pt-5">
        {/* Province Dropdown */}
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium text-white">
            Province
          </label>
          <select
            id="province"
            value={province}
            onChange={handleProvinceChange}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            required
          >
            <option value="" disabled>
              Select Province
            </option>
            {Object.keys(provinces).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="mb-4">
          <label htmlFor="district" className="block text-sm font-medium text-white">
            District
          </label>
          <select
            id="district"
            value={district}
            onChange={handleDistrictChange}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            required
            disabled={!province}
          >
            <option value="" disabled>
              Select District
            </option>
            {province &&
              provinces[province].map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
          </select>
        </div>
        </div>

        {/* Municipality Dropdown */}
        <div className="mb-4">
          <label htmlFor="municipality" className="block text-sm font-medium text-white">
            Municipality
          </label>
          <select
            id="municipality"
            value={municipality}
            onChange={handleMunicipalityChange}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            required
            disabled={!district}
          >
            <option value="" disabled>
              Select Municipality
            </option>
            {district &&
              municipalities[district]?.map((mun) => (
                <option key={mun} value={mun}>
                  {mun}
                </option>
              ))}
          </select>
        </div>

        {/* Tol Address Input */}
        <div className="mb-4">
          <label htmlFor="tol-address" className="block text-sm font-medium text-white">
            Tol Address
          </label>
          <input
            type="text"
            id="tol-address"
            name="tolAddress"
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            placeholder="Enter Tol Address"
            required
          />
        </div>
</div>
<div className="pp">

<div className="flex items-start gap-5 pt-5">
        <h1 className="text-xl font-semibold">Permanent Address</h1>
       
      </div>
      <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSameAsTemporary}
            onChange={handleCopyAddress}
          />
          Same as Temporary Address
        </label>
      <div className=" gap-5 pt-5">
        <div className="flex  justify-between gap-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Province</label>
          <select
            value={permanentProvince}
            onChange={(e) => setPermanentProvince(e.target.value)}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            disabled={isSameAsTemporary}
          >
            <option value="" disabled>
              Select Province
            </option>
            {Object.keys(provinces).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">District</label>
          <select
            value={permanentDistrict}
            onChange={(e) => setPermanentDistrict(e.target.value)}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            disabled={!permanentProvince || isSameAsTemporary}
          >
            <option value="" disabled>
              Select District
            </option>
            {permanentProvince &&
              provinces[permanentProvince]?.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
          </select>
        </div>

        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Municipality</label>
          <select
            value={permanentMunicipality}
            onChange={(e) => setPermanentMunicipality(e.target.value)}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            disabled={!permanentDistrict || isSameAsTemporary}
          >
            <option value="" disabled>
              Select Municipality
            </option>
            {permanentDistrict &&
              municipalities[permanentDistrict]?.map((mun) => (
                <option key={mun} value={mun}>
                  {mun}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Tol Address</label>
          <input
            type="text"
            value={permanentTolAddress}
            onChange={(e) => setPermanentTolAddress(e.target.value)}
            className="mt-1 block bg-white text-black rounded-md p-3 w-full sm:text-sm border"
            placeholder="Enter Tol Address"
            disabled={isSameAsTemporary}
          />
        </div>
      </div>
</div>
      </div>
      <Button
      onClick={handleNext}
                className=" bg-pandit  text-white mt-5 ms-30 w-30"
                variant="default"
                size="default"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
  </>
)}
{activeTab === 3 && (
<>
<div className="flex justify-center items-center font-bold">
        <h1 className="text-pandit text-3xl">Education and Professional Details</h1>
      </div>
      <div className=" flex flex-col items-center border">
      <div className="flex  items-center gap-5 pt-5">

<div className="mb-4">
  <label htmlFor="qualification" className="block text-sm font-medium text-black">
   Qualification
  </label>
  <div className="relative">
  <input
    type="text"
    id="qualification"
    name="qualification"
    // value={formData.firstName}
    // onChange={handleInput}
    className=" bg-white mt-1 block rounded-md p-3 ps-10 relative w-45 text-black   sm:text-sm/6 border "
    placeholder=" passed till"
    style={{color: 'black'}}
    width={60}
    required
  />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-3 start-1 text-black
 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>



  </div>
</div>

<div className="mb-4">
  <label htmlFor="Institution" className="block text-sm font-medium text-black">
 Name of the Institution
  </label>
  <div className="relative">
  <input
    type="text"
    id="institution"
    name="institution"
    // value={formData.lastName}
    // onChange={handleInput}
    className="mt-1 block   text-black rounded-md p-3 ps-5 w-50  sm:text-sm/6  border "
    placeholder="Name of your institutiion"
    style={{color: 'black'}}
    required
  />

  </div>
  
</div>

</div>
<div className="mb-4">
  <label htmlFor="Institution" className="block text-sm font-medium text-black">
 Years of experience
  </label>
  <div className="relative">
  <input
    type="number"
    id="experience"
    name="experience"
    // value={formData.lastName}
    // onChange={handleInput}
    className="mt-1 block   text-black rounded-md p-3 ps-5 w-100  sm:text-sm/6  border "
    placeholder="Experience Years"
    style={{color: 'black'}}
    required
  />

  </div>
</div>

      </div>


  <div className="flex gap-10 mt-10">
    <div className="">
    <h1 className="text-pandit text-xl">
    Document Tips - Proof of Address
    </h1>
    <p className='text-gray-700'>Here are a few tips to help you submit the right kind of documents - you only need to do this once!</p>
    <ul className="list-disc pl-6 text-gray-700">
        <li className="mb-3">
          The document must be issued within the last <strong>3 months</strong> 
          (<strong>12 months</strong> for income tax letters).
        </li>
        <li className="mb-3">
          All edges of the document must be visible in the photo. Make sure that the document is fully visible and in focus.
        </li>
        <li className="mb-3">
          There must be no manipulation, edits, watermarks, impediments, etc. on the document (electronic or paper).
        </li>
      </ul>
      <h1 className="text-pandit text-xl">
    Must Contain the following 
    </h1>
    <p>Full name & address</p>
    <p>Date of issue</p>
    <p>Company logo/name or stamp/signatur</p>


    </div>
    <div className="">
      
    <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-pg bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <h1 className='border text-center mb-2 text-pandit'>Qualification Certificate</h1>
                          <input
                            type="file"
                            name="pujaImage"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            // onChange={handleFileChange}
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
                              <span className="text-pandit">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                          </div>
                        </div>
    </div>
  </div>
    <Button
    onClick={handleNext}
              className=" bg-pandit  text-white mt-5 ms-30 w-30"
              variant="default"
              size="default"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
</>
)}
{activeTab== 4 && (
    <div className="">
      <p className="text-gray-700 MB-10">PLEASE UPLODAD CLEAR PICTURE OF YOUR CITIZENSHIP</p>
    <h1 className="text-pandit text-xl">
    Document Tips - Proof of Address
    </h1>
    <p className='text-gray-700'>Here are a few tips to help you submit the right kind of documents - you only need to do this once!</p>
    <ul className="list-disc pl-6 text-gray-700">
        <li className="mb-3">
          The document must be issued within the last <strong>3 months</strong> 
          (<strong>12 months</strong> for income tax letters).
        </li>
        <li className="mb-3">
          All edges of the document must be visible in the photo. Make sure that the document is fully visible and in focus.
        </li>
        <li className="mb-3">
          There must be no manipulation, edits, watermarks, impediments, etc. on the document (electronic or paper).
        </li>
      </ul>
      <h1 className="text-pandit text-xl">
    Must Contain the following 
    </h1>
    <p>Full name & address</p>
    <p>Date of issue</p>
    <p>Company logo/name or stamp/signatur</p>
<div className="flex gap-10 mt-10">
    <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-pg bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <h1 className='border text-center mb-2 text-pandit'>Citizenship Front</h1>
                          <input
                            type="file"
                            name="pujaImage"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            // onChange={handleFileChange}
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
                              <span className="text-pandit">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                          </div>
                        </div>
                        <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-pg bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <h1 className='border text-center mb-2 text-pandit'>Citizenship Back</h1>
                          <input
                            type="file"
                            name="pujaImage"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            // onChange={handleFileChange}
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
                              <span className="text-pandit">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                          </div>
                        </div>
    </div>
    </div>
    
)}
  </form>
  <br />


{/* //paxiiii */}
{/* <div className="relative">
  <button className="border border-success text-white py-2 mx-auto rounded-md w-80 mt-4">Continue with Whatsapp</button>
<img src="img/whatsapp.png" alt="" className='w-7 absolute top-6 start-4'/>

</div> */}
  {/* </div> */}

 
  </div>
    </div>
    
    </>
  )
}

export default page