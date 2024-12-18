import React from "react";
import { TypewriterEffect } from "@/src/components/ui/typewriter-effect";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import AOS from "aos";
import { useEffect } from "react";

export default function Landinghero() {
   AOS.init();
      useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      }, []);

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
      <div className="flex flex-col space-x-3  h-[60vh] lg:h-[75vh] relative lg:flex-row  bg-pg lg:bg-transparent p-8">
        <div className="flex flex-col gap-5 lg:w-1/2 w-full   my-auto  order-1 ">
          <TypewriterEffect words={words} className="text-4xl" />
          <p className="text-[#F2562B] " data-aos="fade-right">
            Easily book qualified pandits for your religious rituals from the
            comfort of your home.
          </p>
        <div className="flex flex-col  order-1 h-full">

          <div className=" rounded-md bg-[#A2D7A4]/[.2] h-56 w-52  hidden absolute top-16 start-5 lg:block">
            {" "}
          </div>
          <div className=" rounded-md bg-[#A2D7A4]/[.2] h-56 w-52  hidden absolute bottom-8 start-1/3 lg:block">
            {" "}
          </div>
<div className="  mt-5 flex justify-center">
      <Link 
  
            href="/Signup">
          <Button
            className=" bg-[#A2D7A4]  text-white"
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
                </Link>

</div>
        </div>
        </div>
        <div className="lg:w-1/2 flex lg:order-3 order-2  justify-center items-center" data-aos="fade-left">
          <img
            src="img/fullthali.png"
            alt=""
            className=" object-cover  lg:w-full w-full "
            width={"550"}
          />
        
        </div>
      </div>
    </>
  );
}
