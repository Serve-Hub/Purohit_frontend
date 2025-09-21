"use client";
import React from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Features() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  type Feature = {
    name: string;
    description: string;
    src: string;
  };
  const features: Feature[] = [
    {
      name: "Free Consultance  with Pandit",
      description:
        "Get free consultation with experienced Pandits to guide you through religious rituals and ceremonies",
      src: "img/feature_1.png",
    },
    {
      name: "Highly  Experienced Pandits",
      description:
        "Connect with highly experienced Pandits who bring deep knowledge and expertise.",
      src: "img/counter_2.png",
    },
    {
      name: "Blogs to Pooja Bidhi",
      description:
        "Discover detailed and insightful blogs on various Pooja Biddhis, guiding you through every steps",
      src: "img/feature_2.png",
    },
    {
      name: "Bibaha/Bratabands Lagna",
      description:
        "Plan your Bibaha or Bratabandha ceremonies with auspicious dates and expert guidance on Lagna timings. ",
      src: "img/feature_3.png",
    },
    {
      name: "Online Kundali Services",
      description:
        "Access personalized Kundali reports from expert astrologers online. Get detailed insights into your horoscope, compatibility, and other predictions.",
      src: "img/feature_4.png",
    },
    {
      name: "Special Offers on Package Pooja",
      description:
        "Get exclusive discounts on carefully curated Pooja packages. Choose from a variety of rituals tailored to your spiritual needs, and enjoy special offers ",
      src: "img/feature_5.png",
    },
  ];

  return (
    <>
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-[url('/img/bg.png')] bg-cover bg-center mt-10 sm:mt-15 md:mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-2xl text-center lg:max-w-4xl"
            data-aos="fade-right"
          >
            <h2 className="text-sm sm:text-base font-semibold leading-6 sm:leading-7 text-pandit">
              Our Services
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 text-balance">
              What We Offer
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-600 max-w-3xl mx-auto">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className="mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 max-w-2xl sm:max-w-4xl lg:max-w-6xl">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12 xl:gap-y-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-white relative p-4 sm:p-6 md:p-8 lg:p-10 pl-12 sm:pl-14 md:pl-16 rounded-lg hover:shadow-md transition-shadow duration-300"
                  data-aos="fade-up"
                >
                  <dt className="text-sm sm:text-base font-semibold leading-6 sm:leading-7 text-gray-900">
                    <div className="absolute left-2 sm:left-2 top-4 sm:top-6 md:top-8 lg:top-11 flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-10 items-center justify-center rounded-lg">
                      <img
                        src={feature.src}
                        alt={feature.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="block">{feature.name}</span>
                  </dt>
                  <dd className="mt-2 sm:mt-3 text-sm sm:text-base leading-5 sm:leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
