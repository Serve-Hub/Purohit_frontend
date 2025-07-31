"use client";
import AnimatedCounter from "../components/Animatedcounter";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Howitworks from "../components/Howitworks";
// import Login from '@/src/Mycomps/Login';
import Landinghero from "../components/Landinghero";
import Team from "../components/Team";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <Landinghero />
      <AnimatedCounter />
      <Features />
      <Howitworks />
      <Team />
      <Footer />

      {/* <Logi4n/> */}
    </>
  );
}
