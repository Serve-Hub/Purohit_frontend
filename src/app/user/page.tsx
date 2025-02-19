'use client';
import React from 'react'
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



function page() {
  const currentPath=usePathname();
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
            <form action="https://formbold.com/s/unique_form_id" method="POST">
              <div className="relative"  data-aos="fade-left">
                <button className="absolute left-2 top-1/2 -translate-y-1/2">
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

                <input
                  type="text"
                  placeholder="Search for available pujas"
                  className="shadow bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-90 border border-pandit text-pandit placeholder:text-pandit rounded-full p-3 hidden lg:block "
               
                />
              </div>
            </form>
            <div className="flex gap-10">
              <Button
                className=" bg-pandit  text-white"
                variant="default"
                size="default"
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
              </Button>
              <Button
                className=" bg-transparent  text-black"
                variant="default"
                size="default"
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
              </Button>
            </div>
          </div>
{/* <div className="relative w-2/3  "> */}

          <img src="/img/userhome.png"
          // style={width:"12px",height:"110px"}
           alt="" className="object-contain w-2/3 "
            data-aos="zoom-out"
           />
{/* </div> */}
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
{userInfo && userInfo.isPandit ? null : <Bcpandit />}

<Popularpuja/>


</>
  );
}

export default page