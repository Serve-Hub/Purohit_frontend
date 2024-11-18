import * as React from "react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle,CardFooter } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Button } from "./ui/button";

export function Popularpuja() {
  interface Card {
    title: string;
    date: string;
    owner: string;
    owneri:string;
    img: string;
  }

  const cards: Card[] = [
    {
      title: "K bujnu Hunxa puja vanesi?",
      date:"19 dec 2024",
      owner:"panditA",
      owneri:"img/pandit.jpg",
      img:"img/blog_1.jpg"
    },
    {
      title: "देवकार्य अन्तर्गतका पुजाहरु ।",
      date:"19 dec 2024",
      owner:"panditB",
      owneri:"img/pandit.jpg",
      img:"img/blog_2.jpg"
    },
    {
      title: "K bujnu HUnxa puja vanesi?",
      date:"19 dec 2024",
      owner:"panditA",
      owneri:"img/pandit.jpg",
      img:"img/blog_3.jpg"
    },
    {
      title: "K bujnu HUnxa puja vanesi?",
      date:"19 dec 2024",
      owner:"panditA",
      owneri:"img/pandit.jpg",
      img:"img/blog_1.jpg"
    },
    {
      title: "K bujnu HUnxa puja vanesi?",
      date:"19 dec 2024",
      owner:"panditA",
      owneri:"img/pandit.jpg",
      img:"img/blog_1.jpg"
    },
  ];

  return (

    <div className="content bg-[url('/img/bg.png')] bg-cover bg-center p-20 mt-20">
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-pandit sm:text-5xl lg:text-balance">
            Our Popular Blogs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
  
        <Carousel className="w-full max-w-6xl mt-8">
          <CarouselContent className="-ml-1">
            {cards.map((card, index) => (
              <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card style={{ backgroundImage: `url(${card.img})` }} className="bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                    {/* <CardHeader>
                      <CardDescription>
                       
                        <CardTitle className="text-white font-bold text-2xl mt-2">{card.title}</CardTitle>
                      </CardDescription>
                    </CardHeader> */}
                    <CardContent className="flex aspect-square items-center justify-start p-6">
                      {/* <p className="text-white text-base">{card.description}</p> */}
                    </CardContent>
                    <CardFooter className="relative flex flex-col gap-4 justify-start items-start ">
                      <div className="des text-slate-300 text-sm flex gap-8 justify-around">
                        <p>{card.date}</p>
                        <div className="flex gap-2">
                          <img src={card.owneri} alt="" className="rounded-full w-8 h-8 object-cover" />
                          <p >{card.owner}</p>
                        </div>
                      </div>
      <p className="text-white  font-bold text-xl">{card.title}   </p>
    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    );

}

export default Popularpuja;
