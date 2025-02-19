"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/src/css/satoshi.css";
import "@/src/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/src/components/pandit/Loader";
import AuthProvider from "@/src/context/authcontext";
import { Toaster } from "@/src/components/ui/toaster"
import { useRouter,usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  const currentPath = usePathname();
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const router = useRouter();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      {/* <DefaultLayout> */}
        <Toaster />
<AuthProvider>

        {loading ? <Loader /> : children}
</AuthProvider>
      {/* </DefaultLayout> */}
      </body>
    </html>
  );
}
