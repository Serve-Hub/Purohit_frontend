"use client";
import React from "react";
import Image from "next/image";
import SignupForm from "@/src/components/Signupform";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/img/bg.png')]  md:flex-row">
        {/* Left Side: Background Image and Text */}
        <div className=" w-3/4 flex ">
          <div className=" bg-[url('/img/card_1.jpg')] bg-cover flex flex-col items-center justify-center md:w-1/2  p-8 relative border">
            <h2 className="text-4xl font-semibold text-center z-10 text-white">
              "Connecting You with Expert{" "}
              <span className="text-orange-600">Pandits</span> <br /> for Every
              Occasion"
            </h2>
          </div>
          {/* Right Side: Signup Form */}
          <div className="flex flex-col gap-10 lg:w-2/3 md:w-1/2 p-6 relative z-10 border justify-center items-center">
            <Image
              src="/img/logo_bg.png"
              alt="Purohit Logo"
              width={100}
              height={50}
            />
            <SignupForm /> {/* Corrected component usage */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignupPage;
