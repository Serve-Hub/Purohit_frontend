import React from 'react'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

function Features() {
    
type Feature = {
    name: string;
    description: string;
    src: string;
  };
    const features:Feature[] = [
        {
          name: 'Free Consultance  with Pandit',
          description:
            'Get free consultation with experienced Pandits to guide you through religious rituals and ceremonies',
          src:'img/feature_1.png',
        },
        {
          name: 'Highly  Experienced Pandits',
          description:
            'Connect with highly experienced Pandits who bring deep knowledge and expertise.',
            src:'img/counter_2.png',
        },
        {
          name: 'Blogs to Pooja Bidhi',
          description:
            'Discover detailed and insightful blogs on various Pooja Biddhis, guiding you through every steps',
            src:'img/feature_2.png',
        },
        {
          name: 'Bibaha/Bratabands Lagna',
          description:
            'Plan your Bibaha or Bratabandha ceremonies with auspicious dates and expert guidance on Lagna timings. ',
            src:'img/feature_3.png',
        },
        {
            name: 'Online Kundali Services',
            description:
              'Access personalized Kundali reports from expert astrologers online. Get detailed insights into your horoscope, compatibility, and other predictions.',
              src:'img/feature_4.png',
            },
          {
            name: 'Special Offers on Package Pooja',
            description:
              'Get exclusive discounts on carefully curated Pooja packages. Choose from a variety of rituals tailored to your spiritual needs, and enjoy special offers ',
              src:'img/feature_5.png',
            },
      ]
      
  return (
    <>
    <div className=" py-24 sm:py-32 bg-[url('/img/bg.png')] bg-cover bg-center container mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-pandit">Our Services</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          What We Offer
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl ">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white relative pl-16 p-10 rounded-lg hover:shadow">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-2 top-11 flex h-12 w-10 items-center justify-center rounded-lg">
                  <img src={feature.src} alt="" />
                  {/* <feature.icon aria-hidden="true" className="h-6 w-6 text-white" /> */}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </>
  )
}

export default Features