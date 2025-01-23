"use client";
import React, { useState } from "react";
import SignupForm from "@/src/components/Signupform";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import AOS from "aos";
import { useEffect } from "react";

function SignupPage() {
  const[show,setShow]=useState(false);
   AOS.init();
      useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      }, []);
  return (
    <div >
      <Navbar />
      <div className="p-20 flex flex-col lg:flex-col items-center justify-center min-h-[90vh]  md:flex-row  pt-6 rounded bg-[url('/img/card_2.jpg')] bg-cover bg-center">
     
        {/* Left Side: Background Image and Text */}
        <div className=" w-2/4 flex items-center justify-center">
        
          {/* <div className=" bg-[url('/img/card_1.jpg')] bg-cover flex flex-col items-center justify-center md:w-1/2  p-8 relative  pt-20 rounded">
            <h2 className="text-4xl font-semibold text-center z-10 text-white">
              "Connecting You with Expert{" "}
              <span className="text-orange-600">Pandits</span> <br /> for Every
              Occasion"
            </h2>
          </div> */}
          {/* Right Side: Signup Form */}
          <div className="flex flex-col gap-10 lg:w-2/3 md:w-1/2 ps-4 pt-5 relative z-10  justify-center items-center  rounded " data-aos="fade-right">
       
            <SignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignupPage;
