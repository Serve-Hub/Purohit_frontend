'use client';
import React, { useState } from 'react'
import Bcpandit from '@/src/components/User/Bcpandit';
import { Popularpuja } from '@/src/components/Popularpuja';
import { Button } from '@/src/components/ui/button';
import { useContext,useEffect } from 'react';
import { AuthContext } from '@/src/context/authcontext';
import { usePathname,useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { updateSessionToken } from '@/utils/sessionHandler';
import AOS from "aos";
import "aos/dist/aos.css";
import $axios from '@/src/lib/axios.instance';
import Search from '@/src/components/User/Search';
import Link from 'next/link';



function page() {
  const currentPath=usePathname();



  const [kypData, setKypData] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });
updateSessionToken();



    // console.log("accesstoken  is",Cookies.get(""))


    console.log("admin and pandit is",Cookies.get("isPandit"),Cookies.get("isAdmin"))
    // Check for path changes globally
    console.log("currentpath",currentPath);
    if (!currentPath || !currentPath.startsWith("/pandit")) {
      console.log("Clearing localStorage"); // Debugging: Log when clearing localStorage
      localStorage.removeItem("selectedPanditMenu");
    }
    if (!currentPath || !currentPath.startsWith("/UserDashboard")) {
      console.log("Clearing localStorage"); // Debugging: Log when clearing localStorage
      localStorage.removeItem("selectedMenu");
    }

    const fetchKYPStatus = async () => {
      try {
        const response = await $axios.get("/api/v1/kyp/getKYPStatus");

        console.log("kyc status",response)
        setKypData(response.data.data); 
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.statusText}`);
        // }

        // const data = await response.json();
        // setKypStatus(data); // Assuming API returns the status directly
      } catch (error) {
        console.error("Failed to fetch KYP status:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchKYPStatus();
    // Cleanup the event listener when component unmounts
   
  }, [currentPath]); // Only re-run this effect if router.events chang
  const authcontext=useContext(AuthContext);

const userInfo = authcontext?.userInfo; // Safe access using optional chaining

console.log("userinfo in the landing page",userInfo);


  const feature=[
    {
    img:"/img/usericon_1.png",
    name:"Puja Planning",
    text:"Plan your pujas effortlessly. Connect with experienced Pandits for every ritual."
  },
  {
    img:"/img/usericon_2.png",
    name:"Financial Easiness",
    text:"Track your earnings with complete transparency. Secure payments, hassle-free."
  }, 
  {
    img:"/img/usericon_3.png",
    name:"Digital Pandit",
    text:"Bring your services online. Manage rituals, bookings, and clients seamlessly."
  },
   {
    img:"/img/usericon_3.png",
    name:"Purohit Analysis View",
    text:"Get a clear view of your bookings, earnings, and performance to track your progress easily"
  },
]

  return (
    <>
    <div className="relative ">
      <div className="bg-ypandit/10 h-2/3 w-2/3  top-0 rounded-lg absolute"></div>
      {/* <div className="bg-ypandit/10 h-1/2 w-2/3 bottom-0 end-0 rounded-lg absolute  "></div> */}
      {/* <div className="bg-ypandit/10 h-1/2 w-1/3 -top-75 -end-49 rounded-full absolute border overflow-hidden "></div> */}

      <img src="/img/diyo.png" alt="" className="absolute end-80 top-12" />
      <div className=" mt-5 container w-full">
        <h1 className="text-pandit text-5xl w-6/7  font-semibold p-4" data-aos="fade-right">
          Welcome to Purohit – Your
          <span className="text-ypandit p-4">Spiritual</span>
          <br />
          Partner for Every Occasion
        </h1>

        <div className="flex w-full gap-5 justify-between items-start">
          <div className="flex flex-col gap-18 pt-10">
            <p className="text-slate-400 font-medium" data-aos="fade-right">
              Connecting you with trusted Pandits for every ritual and
              celebration. From pujas to weddings, experience seamless booking
              and personalized spiritual services.
            </p>
          <Search/>
           
           
           
            <div className="flex gap-10" data-aos="fade-right">
              
              <Link
              href='/user/viewPuja'
                className=" w-40 h-10 px-4  text-white  bg-pandit flex gap-2 items-center rounded-lg z-99"
              >
              Get started
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
              </Link>
              <Link
                className=" border-black  text-black flex gap-2 items-center z-99"
                href='/user/aboutus'
              >
  
                
                Learn more
     
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
              </Link>
              </div>
              
            
        
            </div>

          <img src="/img/userhome.png"
          // style={width:"12px",height:"110px"}
           alt="" className="object-contain w-2/3 "
            data-aos="zoom-out"
           />

        </div>

        <div className="flex gap-4 mt-10">
          {feature.map((ft,index) => (
            <div className="border border-pandit text-pandit p-5 rounded-lg" key={index} data-aos="flip-left">
              <img src={ft.img} alt="" className='object-cover' />
              <h1 className="text-xl font-bold">{ft.name}</h1>
              <p>{ft.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
{/* end of landing hero */}
{kypData?.length === 0 ?<Bcpandit /> : null}

<Popularpuja/>


</>
  );
}

export default page