"use client";
import React, { useState } from "react";
import Bcpandit from "@/src/components/User/Bcpandit";
import { Popularpuja } from "@/src/components/Popularpuja";
import { Button } from "@/src/components/ui/button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/authcontext";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { updateSessionToken } from "@/utils/sessionHandler";
import AOS from "aos";
import "aos/dist/aos.css";
import $axios from "@/src/lib/axios.instance";
import Search from "@/src/components/User/Search";
import Link from "next/link";

function page() {
  const currentPath = usePathname();

  const [kypData, setKypData] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });
    updateSessionToken();

    console.log(
      "admin and pandit is",
      Cookies.get("isPandit"),
      Cookies.get("isAdmin")
    );
    // Check for path changes globally
    console.log("currentpath", currentPath);
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
        console.log("kyc status", response);
        setKypData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch KYP status:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchKYPStatus();
  }, [currentPath]);

  const authcontext = useContext(AuthContext);
  const userInfo = authcontext?.userInfo; // Safe access using optional chaining
  console.log("userinfo in the landing page", userInfo);

  const feature = [
    {
      img: "/img/usericon_1.png",
      name: "Puja Planning",
      text: "Plan your pujas effortlessly. Connect with experienced Pandits for every ritual.",
    },
    {
      img: "/img/usericon_2.png",
      name: "Financial Easiness",
      text: "Track your earnings with complete transparency. Secure payments, hassle-free.",
    },
    {
      img: "/img/usericon_3.png",
      name: "Digital Pandit",
      text: "Bring your services online. Manage rituals, bookings, and clients seamlessly.",
    },
    {
      img: "/img/usericon_3.png",
      name: "Purohit Analysis View",
      text: "Get a clear view of your bookings, earnings, and performance to track your progress easily",
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="bg-ypandit/10 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-2/3 xl:w-2/3 top-0 rounded-lg absolute hidden md:block"></div>

        {/* Decorative Image */}
        <img
          src="/img/diyo.png"
          alt="Decorative diyo"
          className="absolute hidden xl:block xl:right-80 xl:top-12 w-16 h-16 lg:w-20 lg:h-20 object-contain"
        />

        <div className="container mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Hero Section */}
          <div className="mt-5 sm:mt-8 md:mt-10 lg:mt-12">
            <h1
              className="text-pandit text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold p-2 sm:p-4 leading-tight"
              data-aos="fade-right"
            >
              Welcome to Purohit – Your
              <span className="text-ypandit block sm:inline sm:ml-2 md:ml-4">
                Spiritual
              </span>
              <br className="hidden sm:block" />
              Partner for Every Occasion
            </h1>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row w-full gap-5 sm:gap-8 md:gap-10 lg:gap-12 justify-between items-start mt-6 sm:mt-8 md:mt-10">
              {/* Left Content */}
              <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10 w-full lg:w-1/2">
                <p
                  className="text-slate-400 font-medium text-sm sm:text-base md:text-lg leading-relaxed"
                  data-aos="fade-right"
                >
                  Connecting you with trusted Pandits for every ritual and
                  celebration. From pujas to weddings, experience seamless
                  booking and personalized spiritual services.
                </p>

                {/* Search Component */}
                <div className="w-full" data-aos="fade-right">
                  <Search />
                </div>

                {/* Action Buttons */}
                <div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10"
                  data-aos="fade-right"
                >
                  <Link
                    href="/user/viewPuja"
                    className="w-full sm:w-auto min-w-40 h-12 sm:h-10 px-4 sm:px-6 text-white bg-pandit flex gap-2 items-center justify-center rounded-lg z-10 hover:bg-pandit/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="text-sm sm:text-base">Get started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>

                  <Link
                    className="w-full sm:w-auto border border-black text-black flex gap-2 items-center justify-center z-10 px-4 sm:px-6 py-3 sm:py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
                    href="/user/aboutus"
                  >
                    <span className="text-sm sm:text-base">Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1"
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

              {/* Right Image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
                <img
                  src="/img/userhome.png"
                  alt="Purohit spiritual services illustration"
                  className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                  data-aos="zoom-out"
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-6 mt-10 sm:mt-12 md:mt-16 lg:mt-20">
              {feature.map((ft, index) => (
                <div
                  className="border border-pandit text-pandit p-4 sm:p-5 md:p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-pandit/70 bg-white/50 backdrop-blur-sm"
                  key={index}
                  data-aos="flip-left"
                  data-aos-delay={index * 100}
                >
                  <div className="flex flex-col items-start gap-3 sm:gap-4">
                    <img
                      src={ft.img}
                      alt={`${ft.name} icon`}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                    />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      {ft.name}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                      {ft.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Components */}
      {kypData?.length === 0 ? <Bcpandit /> : null}
      <Popularpuja />
    </>
  );
}

export default page;
