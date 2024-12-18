'use client'
import AnimatedCounter from '../components/Animatedcounter';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Howitworks from '../components/Howitworks';
// import Login from '@/src/Mycomps/Login';
import Landinghero from '../components/Landinghero';
import Popularblog from '../components/Popularblog';
import { Popularpuja } from '../components/Popularpuja';
import Team from '../components/Team';
import Navbar from '../components/Navbar';
import { useEffect } from "react";
import PoojaProvider from '../context/poojacontext';



 export default function LoginPage() {
  return (
    <>

<Navbar/>
<Landinghero />
<AnimatedCounter/>
<Features/>
<Howitworks/>
<Team/>
<Footer/>


    {/* <Logi4n/> */}
 </>
  );
}
