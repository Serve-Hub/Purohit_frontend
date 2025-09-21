"use client";
import React from "react";
import { TypewriterEffect } from "@/src/components/ui/typewriter-effect";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import AOS from "aos";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Landinghero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const words = [
    {
      text: "Bringing",
    },
    {
      text: "Spiritual",
      className: "text-[#F2562B] dark:text-blue-500",
    },
    {
      text: "Services",
    },
    {
      text: "to",
    },
    {
      text: "Your",
    },
    {
      text: "Doorstep",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh] relative bg-pg lg:bg-transparent px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Content Section */}
        <div className="flex flex-col justify-center lg:w-1/2 w-full space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 order-2 lg:order-1 relative z-10">
          {/* Typewriter Effect - Responsive Text */}
          <div className="text-center lg:text-left">
            <TypewriterEffect
              words={words}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            />
          </div>

          {/* Description Text */}
          <p
            className="text-[#F2562B] text-sm sm:text-base md:text-lg lg:text-xl text-center lg:text-left max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 leading-relaxed"
            data-aos="fade-right"
          >
            Easily book qualified pandits for your religious rituals from the
            comfort of your home.
          </p>

          {/* Call to Action Button */}
          <div className="flex justify-center lg:justify-start mt-4 sm:mt-6 md:mt-8">
            <Button
              className="bg-[#A2D7A4] hover:bg-[#8BC68E] text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              variant="default"
              size="default"
              onClick={() => {
                setIsLoading(true);
                router.push("/Login");
              }}
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2 sm:space-x-3">
                  <span className="text-white font-medium text-sm sm:text-base">
                    Processing
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 sm:border-3 md:border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span>Get started</span>
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
                </div>
              )}
            </Button>
          </div>

          {/* Background Decorative Elements - Hidden on mobile for cleaner look */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <div className="rounded-md bg-[#A2D7A4]/[.15] h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-52 absolute top-8 md:top-12 lg:top-16 left-2 md:left-4 lg:left-5 animate-pulse"></div>
            <div className="rounded-md bg-[#A2D7A4]/[.15] h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-52 absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/4 md:left-1/3 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="lg:w-1/2 w-full flex justify-center items-center order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0"
          data-aos="fade-left"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="img/fullthali.png"
              alt="Traditional Puja Thali - Spiritual Services"
              className="object-contain w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              width={550}
              height={400}
            />
            {/* Mobile decorative elements */}
            <div className="lg:hidden absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-[#A2D7A4]/[.2] rounded-full animate-bounce"></div>
            <div className="lg:hidden absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#F2562B]/[.2] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}
