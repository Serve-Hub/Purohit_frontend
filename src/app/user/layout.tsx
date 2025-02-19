import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "@/src/app/globals.css";
import Navbar from '@/src/components/Navbar';
import Footer from "@/src/components/Footer";
import Hnavbar from "@/src/components/User/Hnavbar";
import AuthProvider from "@/src/context/authcontext";
import { Toaster } from "@/src/components/ui/toaster"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    // <body>
      <AuthProvider>
        <Hnavbar />
        {children}
        {/* <Footer /> */}
        <Toaster />

      </AuthProvider>
  //   </body>
  // </html>
  


  );
}
