"use client";
// import ECommerce from "@/src/components/Dashboard/E-commerce";

// import { Metadata } from "next";
import DefaultLayout from "@/src/components/admin/Dashboard/DefaultLayout";
import PoojaProvider from "@/src/context/poojacontext";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };
import Cookies from "js-cookie";
import { useEffect } from "react";
import { updateSessionToken } from "@/utils/sessionHandler";


export default function Home() {
  useEffect(()=>{
    console.log("access token is",Cookies.get());
    updateSessionToken();
  })
  return (
    <>
      {/* <DefaultLayout> */}
      {/* <ECommerce /> */}
      THis is the admin page
      {/* </DefaultLayout> */}
    </>
  );
}
