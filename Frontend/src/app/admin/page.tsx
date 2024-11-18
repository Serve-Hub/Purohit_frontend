// import ECommerce from "@/src/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/src/components/Dashboard/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <ECommerce /> */}
        THis is the admin page
      </DefaultLayout>
    </>
  );
}
