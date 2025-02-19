'use client';
import DefaultLayout from "@/src/components/pandit/Layouts/DefaultLaout";
import React, { useEffect } from "react";
import Stats from "@/src/components/pandit/Dashboard/Stats";
import { updateSessionToken } from "@/utils/sessionHandler";



export default function Home() {
  useEffect(()=>{
    updateSessionToken();
  })
  return (
    <>
      <DefaultLayout>
        
        <Stats/>
      </DefaultLayout>  
    </>
  );
}
