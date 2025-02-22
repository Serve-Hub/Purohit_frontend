import React from 'react'
import Bctab from '../Bctab'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



function Bcpandit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Animation easing
    });
  })
  return (
    <>
    <div className="container my-20 ">
    <div className="mx-auto max-w-2xl lg:text-center" data-aos="zoom-out">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-pandit sm:text-5xl lg:text-balance">
            Want to Become a Pandit?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow through the detailed stepwise guidelines to become a verified pandit .What are you waiting for ?
          </p>
        </div>
<div className="flex gap-8  ps-20">

      <img src="/img/cutepandit.png" alt="" className='w-1/2  object-contain ' />

<Bctab/>
</div>
    </div>
    </>
  )
}

export default Bcpandit