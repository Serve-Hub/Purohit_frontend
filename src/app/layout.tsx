import type { Metadata } from "next";
// import localFont from "next/font/local";
import "@/src/app/globals.css";
import { Toaster } from "../components/ui/toaster";


export const metadata: Metadata = {
  title: "Purohit",
  description: "Pandit booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        {children}


      </body>
    </html>
  


  );
}
