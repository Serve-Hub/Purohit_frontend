import React from "react";
import Bctab from "../Bctab";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Bcpandit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Animation easing
    });
  });

  return (
    <>
      <div className="container mx-auto my-12 sm:my-16 md:my-20 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl text-center mb-8 sm:mb-12 md:mb-16"
          data-aos="zoom-out"
        >
          <p className="mt-2 text-pretty text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-pandit leading-tight">
            Want to Become a Pandit?
          </p>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-8 text-gray-600 max-w-3xl mx-auto">
            Follow through the detailed stepwise guidelines to become a verified
            pandit. What are you waiting for?
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center lg:items-start">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
            <img
              src="/img/cutepandit.png"
              alt="Cute pandit illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-lg"
              data-aos="fade-right"
            />
          </div>

          {/* Tab Section */}
          <div
            className="w-full lg:w-1/2 order-1 lg:order-2"
            data-aos="fade-left"
          >
            <Bctab />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bcpandit;
