import React from 'react'
import AOS from 'aos';
import { useEffect } from 'react';
function Team() {
  AOS.init();
    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
      });
    }, []);

    interface Team{
        Name:string,
        Description:string,
        img:string
    }
    const Team:Team[]=[
        {Name:"Suyog Lamsal",
         Description:"Web developer",
         img:"img/profile_1.jpg"   
        },
        {Name:"Kuber Pathak",
            Description:"Backend developer",
            img:"img/profile_2.jpg"   
           },
           {
            Name:"Akhil Joshi",
            Description:"App Developer",
            img:"img/profile_3.jpg"
           }
,
        {Name:"Rishi k Marseni",
            Description:"project Supervisor",
            img:" https://neoyaan.io/team/rishikmarseni.png"   
           }
    ]
  return (
    <>
    <div className="mt-20 mb-20 mx-auto lg:text-center container">
  <h2 className="text-base font-semibold leading-7 text-pandit" data-aos="fade-right">Our Experts</h2>
  <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
    Meet Our Team
  </p>
  <p className="mt-6 text-lg leading-8 text-gray-600" data-aos="fade-right">
    Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
    pulvinar et feugiat blandit at. In mi viverra elit nunc.
  </p>

  <div className="flex flex-col lg:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-center mt-10 gap-6  ">
    {Team.map((card, index) => (
      <div
        key={index}
        className="card w-full sm:w-1/2 md:w-1/3 lg:w-72 h-96 border bg-cover bg-center flex justify-center items-end rounded-xl"
        style={{ backgroundImage: `url(${card.img})` } }
      data-aos="flip-right"
      >
        <div className="mb-8 p-4 bg-white rounded-lg text-center relative overflow-hidden w-11/12">
          <h1 className='text-lg font-bold'>{card.Name}</h1>
          <p className='text-slate-400 text-sm'>{card.Description}</p>
          <img src="img/dotted_shape.png" alt="" className='absolute top-0 end-0' />
          <div className="rounded-full w-12 border h-12 bg-pg opacity-80 absolute -bottom-4 -start-6"></div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}

export default Team