"use client";
// import "jsvectormap/dist/css/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
// import "@/css/satoshi.css";
// import "@/css/style.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/src/css/satoshi.css";
import "@/src/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/src/components/pandit/Loader";
import DefaultLayout from "@/src/components/pandit/Layouts/DefaultLaout";
import AuthProvider from "@/src/context/authcontext";
import { Toaster } from "@/src/components/ui/toaster"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      {/* <DefaultLayout> */}
<AuthProvider>
        <Toaster />
        {loading ? <Loader /> : children}
</AuthProvider>
      {/* </DefaultLayout> */}
      </body>
    </html>
  );
}
