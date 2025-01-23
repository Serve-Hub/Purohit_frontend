// 'use client';
// import * as React from "react";
// import { Card, CardContent, CardHeader, CardDescription, CardTitle,CardFooter } from "@/src/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/src/components/ui/carousel";
// import { Button } from "./ui/button";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalTrigger,
// } from "./ui/animated-modal";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export function Popularpuja() {
//   interface Card {
//     title: string;
//     description: string;
//     category: string;
//     img: string;
//     time:string;
//     date:string;
//   }

//   const cards: Card[] = [
//     {
//       title: "ग्रहशान्तिःपूजा",
//       description:`हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको छ । शान्तिक कर्म भनेको ग्रहशान्ति वा दुःस्वप्नादि निवारणार्थ गरिने कार्य हो भने पौष्टिक धनधान्य, सन्तति वृद्धिविषयक कार्य हो । विशिष्ट धनधान्यसम्पन्न व्यक्तिले जुन भावनाले रुद्राभिषेक गर्दछ, एक सामान्य व्यक्तिले पनि उस्तै भावनाले गर्दछ। आर्थिक दृष्टिमा धनी र गरिबमा भिन्नता भए पनि भावनात्मक दृष्टिमा दुवै बराबरीमा आउन सक्छन् ।

// भगवान् रुद्रको आराधना गर्ने क्रममा रुद्रीपाठका तीन रूप बताइएका छन् । अभिषेकात्मक, हवनात्मक र जपात्मक । जलधारापूर्वक रुद्रीपाठ गरिनेलाई अभिषेकात्मक, रुद्रीका मन्त्रपाठपूर्वक होम गर्दै गर्नेलाई हवनात्मक (यसलाई रुद्रहोम पनि भनिन्छ) र जलधारा पनि होम पनि नगरी केवल रुद्रीपाठ मात्र गरिनेलाई जपात्मक भनिन्छ । श्रद्धानुसार तीनै थरी कर्म एकै दिन गर्न सकिन्छ तर रुद्रीसँगै होम पनि जुराउनुपर्दछ ।

// रुद्रीका पाँच भेद छन्- रुद्र, रुद्री, लघुरुद्री, महारुद्री र अतिरुद्री । एकावृत्ति रुद्रीपाठ गरिनेलाई रुद्र, त्यसको ११ गुणा अर्थात् ११ आवृत्तिलाई रुद्री अथवा रुद्रैकादशिनी, त्यसको ११ गुणा अर्थात् १२१ आवृत्तिलाई लघुरुद्री, त्यसको ११ गुणा अर्थात् १३३१ आवृत्तिलाई महारुद्री र त्यसको पनि ११ गुणा अर्थात् १४६४१ आवृत्तिलाई अतिरुद्री भनिन्छ ।

// धर्म, अर्थ (धन), काम (सुख र सन्तान) र मोक्ष यी चारै पुरुषार्थको इच्छा गर्नेहरूले रुद्रीपाठद्वारा आशुतोष भगवान् रुद्रलाई प्रसन्न गराएर आफ्नो इच्छा पूर्ण गर्दछन् । अभिषेकात्मक रुद्रीपाठमा कामना विशेषले अभिषेक द्रव्य पनि भिनभिन्न बताइएको छ । वृष्टि कामना गर्ने र ज्वरोको प्रकोप शान्त गराउन इच्छा गर्नेहरूले जलधाराद्वारा, पशुधनको इच्छा
// गर्नेले दहीकाे धाराद्वारा  पुत्रकाे इच्छा र प्रमेह रोग शान्ति गर्ने तथा दीर्घायु बनाैँ भन्ने इच्छा हुनेहरूले दूधको धाराद्वारा, पापनाश गर्ने र निरोगी बनौं भन्ने इच्छा गर्नेहरूले क्रमैले मह र घिउकाे धाराद्वारा, मोक्षको इच्छा हुनेले तीर्थजलको धाराद्वारा, शत्रुनाश गर्न इच्छुकले सर्स्यूँकाे तेलकाे  धारा गरेर रुद्रीपाठपूर्वक रुद्राभिषेक गर्नु वा गराउनु भनिएको छ । जलधारा क्रममा तामा वा चाँदी वा पित्तलको जलहरीद्वारा गरिन्छ र अर्को गौरीगाईको सिङ्ले जलधारा गर्नु भन्ने पनि छ र सोही अनुसार सिङले पनि जलधारा गरिन्छ ।

// जुनसुकै कर्ममा पनि एउटा मुख्य वा प्रधान कर्म हुन्छ । अरू त्यसमा सहयोगीका रूपमा गरिने अ‌ङ्गकर्म हुन्छन् । यहाँ रुद्राभिषेक जलधारापूर्वक रुद्रीपाठ गर्नु मुख्य कर्म हुन्छ । अरू वरण, पुण्याहवाचन, दीप, कलश, गणेश पूजाहरू सबै अ‌ङ्ग कर्मका रूपमा हुन्छन् । सबै अ‌ङ्गकर्मले प्रधान कर्म रुद्राभिषेकलाई सहयोग गर्दछन् ।

// रुद्रीपाठद्वारा तमोमूर्ति महारुद्र प्रसन्न हुनुहुन्छ । रुद्रकोप शान्त हुन्छ । जब रुद्र कुपित हुनुहुन्छ । त्यसबेला उहाँबाट एउटा कुनै त्यस्तो भय‌कर कोपज्वाला निस्कन्छ र त्यो कोपज्वाला परमाणु रूप लिएर यसरी सर्वत्र व्याप्त भएर फैलिन्छ कि जो गगनमण्डल, वायुमण्डल, जल, स्थल, अन्न आदिमा सर्वत्र छरिएर रहन्छ । यसै गरी उहाँले प्रहार गर्नुभएका बाणहरू पनि सर्वत्र छरिएका हुन्छन् । यस्तो रुद्रको कोपज्वाला वा बाणको प्रचण्ड प्रहारमा तब मनुष्य वा पशुपक्षी कुनै पर्दछ भने त्यो कहिल्यै पनि कुशल, मङ्गलमय र स्वस्थ रहन सक्दैन । यस्तो प्रहारबाट बच्न भगवान् रुद्रलाई प्रसन्न गराउनुपर्दछ । रुद्रलाइ प्रसन्न तुल्याउने सबैभन्दा उत्तम साधन रुद्रीपाठ नै हो। रुद्रीपाठद्वारा भगवान् रुद्र ज्यादै चाँडो प्रसच हुनुहुन्छ ।

// अभिषेकात्मक रुद्रीलाई रुद्राभिषेक भनिन्छ । यसमा जलको धारा दिएर रुद्रीपाठ गरिन्छ रुद्राभिषेक गर्दा यसै क्रमले प्रधान कर्म र अ‌ङ्ग कर्महरू गरिन्छन् ।`,
//       category: "Dev Karya",
//       img: "img/card_1.jpg",
//       time:"7min ago",
//       date:"24 dec 2024"
//     },
//     {
//       title: "सन्ताेषी माता पुजा",
//       description:
//         "हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको ..........",
//       category: "Dev Karya",
//       img: "img/card_2.jpg",
//       time:"7min ago",
//       date:"24 dec 2024"


//     },
//     {
//       title: "लक्ष्यवत्ती पूजा",
//       description:
//         "हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको ..........",
//       category: "Dev Karya",
//       img: "img/card_3.jpg",
//       time:"7 min ago",
//       date:"24 dec 2024"


//     },
//     {
//       title: "लक्ष्यवत्ती पूजा",
//       description:
//         "हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको ..........",
//       category: "Dev Karya",
//       img: "img/card_3.jpg",
//       time:"7 min ago",
//       date:"24 dec 2024"


//     },
//     {
//       title: "लक्ष्यवत्ती पूजा",
//       description:
//         "हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको ..........",
//       category: "Dev Karya",
//       img: "img/card_3.jpg",
//       time:"7min ago",
//       date:"24 dec 2024"


//     },
//   ];

//   return (
//     <div className="flex flex-col justify-center items-center mt-20 container">
//       <div className="mx-auto max-w-2xl lg:text-center">
//         <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-pandit sm:text-5xl lg:text-balance">
//           Our Popular Pujas
//         </p>
//         <p className="mt-6 text-lg leading-8 text-gray-600">
//           Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
//           pulvinar et feugiat blandit at. In mi viverra elit nunc.
//         </p>
//       </div>

//       <Carousel className="w-full max-w-6xl mt-8">
//         <CarouselContent className="-ml-1">
//           {cards.map((card, index) => (
//             <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3 ">
//               <div className="p-1">
//               <Card
//   style={{ backgroundImage: `url(${card.img})` }}
//   className="group bg-cover bg-center relative p-6 rounded-lg transition-shadow duration-300 hover:shadow-2xl"
// >
// <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 "></div>

//   {/* Thicker ring effect container */}
//   <div className="absolute inset-0 rounded-lg border-4 border-transparent group-hover:border-indigo-500 group-hover:ring-3 group-hover:ring-indigo-500/50 transition-all duration-300 pointer-events-none"></div>
  
//   <CardHeader>
//     <CardDescription>
//       <h1 className="text-white text-lg">{card.category}</h1>
//       <CardTitle className="text-white font-bold text-2xl mt-2">{card.title}</CardTitle>
//     </CardDescription>
//   </CardHeader>

//   <CardContent className="flex aspect-square items-center justify-center p-6">
//     {/* Additional card content here if needed */}
//   </CardContent>

//   {/* Modal component */}
//   <Modal>
//     <ModalBody className="h-[100vh] w-full">
//       <ModalContent>
//         <h1 className="text-4xl text-black font-bold">{card.title}</h1>
//         <p>yeuta summary</p>
//         <div className="flex text-slate-400 py-4 gap-8 text-sm justify-between">
//           <p>published: {card.time}</p>
//           <p>{card.date}</p>
//         </div>
//         <hr className="h-4" />
//         <img src={card.img} alt="" />
//         <p className="pt-14 text-xl leading-loose font-light text-slate-600 ">
//           {card.description}
//         </p>
//       </ModalContent>
//     </ModalBody>

//     <CardFooter className="relative">
//       <div className="absolute bottom-0 end-0 h-12 w-12 text-white text-5xl">...</div>
//       <div className="w-full h-12">
//         <h1 className="text-white text-base">
//           {card.description}
//           <ModalTrigger className="bg-slate-600 dark:bg-white dark:text-white text-white flex justify-center group/modal-btn absolute bottom-20 start-7">
//             <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
//               Read All
//             </span>
//             <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
//               ✈️
//             </div>
//           </ModalTrigger>
//         </h1>
//       </div>
//     </CardFooter>
//   </Modal>
// </Card>

  
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
      
//     </div>



//   );
// }

// export default Popularpuja;

"use client";
import Image from "next/image";
import React from "react";

import { Carousel, Card } from "@/src/components/ui/apple-cards-carousel";

export function Popularpuja() {

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full py-20 flex flex-col justify-center items-center mt-20 container">
        <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-pandit sm:text-5xl lg:text-balance">
          Our Popular Pujas
       </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
         Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
          pulvinar et feugiat blandit at. In mi viverra elit nunc.
        </p>
      </div>
     
      <Carousel items={cards} />
      
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      
          <div
            key={"dummy-content" }
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
             <Image
              src="/img/card_3.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
            <br />
            <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              {/* <span className="font-bold text-neutral-700">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "} */}
              हाम्रो वैदिक हिन्दु समाजमा चलेका कर्मकाण्ड अन्तर्गतको अतिप्रचलित र उत्कृष्ट कर्म हो रुद्राभिषेक । रुद्राभिषेक शान्तिक तथा पौष्टिक कर्म दुवैमा गर्ने गरिएको छ । शान्तिक कर्म भनेको ग्रहशान्ति वा दुःस्वप्नादि निवारणार्थ गरिने कार्य हो भने पौष्टिक धनधान्य, सन्तति वृद्धिविषयक कार्य हो । विशिष्ट धनधान्यसम्पन्न व्यक्तिले जुन भावनाले रुद्राभिषेक गर्दछ, एक सामान्य व्यक्तिले पनि उस्तै भावनाले गर्दछ। आर्थिक दृष्टिमा धनी र गरिबमा भिन्नता भए पनि भावनात्मक दृष्टिमा दुवै बराबरीमा आउन सक्छन् ।

भगवान् रुद्रको आराधना गर्ने क्रममा रुद्रीपाठका तीन रूप बताइएका छन् । अभिषेकात्मक, हवनात्मक र जपात्मक । जलधारापूर्वक रुद्रीपाठ गरिनेलाई अभिषेकात्मक, रुद्रीका मन्त्रपाठपूर्वक होम गर्दै गर्नेलाई हवनात्मक (यसलाई रुद्रहोम पनि भनिन्छ) र जलधारा पनि होम पनि नगरी केवल रुद्रीपाठ मात्र गरिनेलाई जपात्मक भनिन्छ । श्रद्धानुसार तीनै थरी कर्म एकै दिन गर्न सकिन्छ तर रुद्रीसँगै होम पनि जुराउनुपर्दछ ।

रुद्रीका पाँच भेद छन्- रुद्र, रुद्री, लघुरुद्री, महारुद्री र अतिरुद्री । एकावृत्ति रुद्रीपाठ गरिनेलाई रुद्र, त्यसको ११ गुणा अर्थात् ११ आवृत्तिलाई रुद्री अथवा रुद्रैकादशिनी, त्यसको ११ गुणा अर्थात् १२१ आवृत्तिलाई लघुरुद्री, त्यसको ११ गुणा अर्थात् १३३१ आवृत्तिलाई महारुद्री र त्यसको पनि ११ गुणा अर्थात् १४६४१ आवृत्तिलाई अतिरुद्री भनिन्छ ।

धर्म, अर्थ (धन), काम (सुख र सन्तान) र मोक्ष यी चारै पुरुषार्थको इच्छा गर्नेहरूले रुद्रीपाठद्वारा आशुतोष भगवान् रुद्रलाई प्रसन्न गराएर आफ्नो इच्छा पूर्ण गर्दछन् । अभिषेकात्मक रुद्रीपाठमा कामना विशेषले अभिषेक द्रव्य पनि भिनभिन्न बताइएको छ । वृष्टि कामना गर्ने र ज्वरोको प्रकोप शान्त गराउन इच्छा गर्नेहरूले जलधाराद्वारा, पशुधनको इच्छा
गर्नेले दहीकाे धाराद्वारा  पुत्रकाे इच्छा र प्रमेह रोग शान्ति गर्ने तथा दीर्घायु बनाैँ भन्ने इच्छा हुनेहरूले दूधको धाराद्वारा, पापनाश गर्ने र निरोगी बनौं भन्ने इच्छा गर्नेहरूले क्रमैले मह र घिउकाे धाराद्वारा, मोक्षको इच्छा हुनेले तीर्थजलको धाराद्वारा, शत्रुनाश गर्न इच्छुकले सर्स्यूँकाे तेलकाे  धारा गरेर रुद्रीपाठपूर्वक रुद्राभिषेक गर्नु वा गराउनु भनिएको छ । जलधारा क्रममा तामा वा चाँदी वा पित्तलको जलहरीद्वारा गरिन्छ र अर्को गौरीगाईको सिङ्ले जलधारा गर्नु भन्ने पनि छ र सोही अनुसार सिङले पनि जलधारा गरिन्छ ।

जुनसुकै कर्ममा पनि एउटा मुख्य वा प्रधान कर्म हुन्छ । अरू त्यसमा सहयोगीका रूपमा गरिने अ‌ङ्गकर्म हुन्छन् । यहाँ रुद्राभिषेक जलधारापूर्वक रुद्रीपाठ गर्नु मुख्य कर्म हुन्छ । अरू वरण, पुण्याहवाचन, दीप, कलश, गणेश पूजाहरू सबै अ‌ङ्ग कर्मका रूपमा हुन्छन् । सबै अ‌ङ्गकर्मले प्रधान कर्म रुद्राभिषेकलाई सहयोग गर्दछन् ।

रुद्रीपाठद्वारा तमोमूर्ति महारुद्र प्रसन्न हुनुहुन्छ । रुद्रकोप शान्त हुन्छ । जब रुद्र कुपित हुनुहुन्छ । त्यसबेला उहाँबाट एउटा कुनै त्यस्तो भय‌कर कोपज्वाला निस्कन्छ र त्यो कोपज्वाला परमाणु रूप लिएर यसरी सर्वत्र व्याप्त भएर फैलिन्छ कि जो गगनमण्डल, वायुमण्डल, जल, स्थल, अन्न आदिमा सर्वत्र छरिएर रहन्छ । यसै गरी उहाँले प्रहार गर्नुभएका बाणहरू पनि सर्वत्र छरिएका हुन्छन् । यस्तो रुद्रको कोपज्वाला वा बाणको प्रचण्ड प्रहारमा तब मनुष्य वा पशुपक्षी कुनै पर्दछ भने त्यो कहिल्यै पनि कुशल, मङ्गलमय र स्वस्थ रहन सक्दैन । यस्तो प्रहारबाट बच्न भगवान् रुद्रलाई प्रसन्न गराउनुपर्दछ । रुद्रलाइ प्रसन्न तुल्याउने सबैभन्दा उत्तम साधन रुद्रीपाठ नै हो। रुद्रीपाठद्वारा भगवान् रुद्र ज्यादै चाँडो प्रसच हुनुहुन्छ ।

अभिषेकात्मक रुद्रीलाई रुद्राभिषेक भनिन्छ । यसमा जलको धारा दिएर रुद्रीपाठ गरिन्छ रुद्राभिषेक गर्दा यसै क्रमले प्रधान कर्म र अ‌ङ्ग कर्महरू गरिन्छन् ।
            </p>
           
          </div>
   
      
    </>
  );
};

const data = [
  {
    category: "DEV KARYA",
    title: "सन्ताेषी माता पुजा",
    src: "/img/card_3.jpg",
    content: <DummyContent />,
  },
  {
    category: "DEV KARYA",
    title: "लक्ष्यवत्ती पूजा",
    src: "/img/card_1.jpg",
    content: <DummyContent />,
  },
  {
    category: "DEV KARYA",
    title: "लक्ष्यवत्ती पूजा",
    src: "/img/card_2.jpg",
    content: <DummyContent />,
  },

  {
    category: "DEV KARYA",
    title: "लक्ष्यवत्ती पूजा",
    src: "/img/card_4.jpg",
    content: <DummyContent />,
  },

];
