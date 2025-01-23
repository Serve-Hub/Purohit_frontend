import ECommerce from "@/src/components/pandit/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/src/components/pandit/Layouts/DefaultLaout";
import React from "react";
import Stats from "@/src/components/pandit/Dashboard/Stats";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        
        <Stats/>
      </DefaultLayout>  
    </>
  );
}
