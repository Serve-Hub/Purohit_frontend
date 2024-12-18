'use client';
import Image from "next/image";
import React, { useState, useEffect ,FormEvent} from 'react';
import axios from 'axios'; // Don't forget to import axios
import PasswordValidation from './PasswordValidation';
import TermsAndConditions from '@/src/components/TermsAndConditions';
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    // cpassword:''
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isUpperCase: false,
    isLowerCase: false,
    isNumber: false,
    isSpecialChar: false,
    isMinLength: false,
  });

  useEffect(() => {
    setPasswordValidation({
      isUpperCase: /[A-Z]/.test(formData.password),
      isLowerCase: /[a-z]/.test(formData.password),
      isNumber: /\d/.test(formData.password),
      isSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      isMinLength: formData.password.length >= 8,
    });
  }, [formData.password]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('https://purohit-backend.onrender.com/api/v1/users/register', formData);
      console.log('User registered:', response.data);
            const token = response.data.data.token;
            const email = formData.email;      
      const userData = { token, email };
      
      router.push(`/verification?token=${token}&email=${email}`);
      // Navigate to the verification page, passing userData if needed
      // alert("Navigating to verification page,Please wait!")

  } 
  catch (error: any) {
      if (error.response?.status === 409) {
          alert("Email already exists. Please use a different email.");
      } else {
          console.error(error);
      }
  }


   
             }
  

const handlegoogle = async ()=>{
  setIsLoading(true); 

  try {
    // const backendUrl = process.env.REACT_APP_API_URL;
  window.location.href = "https://purohit-backend.onrender.com/api/v1/users/auth/google"
    // const response = await axios.get('https://purohit-backend.onrender.com/api/v1/users/auth/google');
    // console.log("response is",response)
    // console.log('User registered:', response.data);
    //       const token = response.data.data.token;
    //       const email = formData.email;      
    // const userData = { token, email };
    
    // router.push(`/verification?token=${token}&email=${email}`);
    // Navigate to the verification page, passing userData if needed
    // alert("Navigating to verification page,Please wait!")

} 
catch (error: any) {
  alert("There was some error while redirecting");
  setIsLoading(false); 
console.log(error.message)
}
}

return (
  <>
  <div className="flex flex-col p-15 backdrop-blur-lg bg-black/10 shadow-lg shadow-black/50">

  <form onSubmit={handleSubmit} className=''>
    <div className="flex justify-center items-center font-bold">
  <Image
  src="/img/logo_bg.png"
  alt="Purohit Logo"
  width={100}
  height={50}

/>
<h1 className="text-white text-3xl">Signup</h1>
</div>

    {/* Name Fields */}
    <div className="flex  items-center gap-5 pt-5">

    <div className="mb-4">
      <label htmlFor="first-name" className="block text-sm font-medium text-white">
        First Name
      </label>
      <div className="relative">
      <input
        type="text"
        id="first-name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInput}
        className=" bg-white mt-1 block rounded-md p-3 ps-10 relative w-45 text-gray    sm:text-sm/6 border "
        placeholder=" first name"
        style={{color: 'black'}}
        width={60}
        required
      />

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-3 start-1 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>


      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="last-name" className="block text-sm font-medium text-white">
        Last Name
      </label>
      <div className="relative">
      <input
        type="text"
        id="last-name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInput}
        className="mt-1 block   text-black rounded-md p-3 ps-10 w-45  sm:text-sm/6  border "
        placeholder="Last name"
        style={{color: 'black'}}
        required
      />

      </div>
      
    </div>
    </div>

    {/* Email Field */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-white">
      {/* text-gray-700 */}
        Email Address
      </label>
      <div className="relative">
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInput}
        onInvalid={(e) => e.currentTarget.setCustomValidity("Invalid :Please include an '@' and a valid domain (e.g., example@domain.com)")}
    onInput={(e) => e.currentTarget.setCustomValidity('')} 
        className="mt-1 block border border-white bg-white rounded-md p-3 ps-10  w-96 text-black  sm:text-sm/6 "
        placeholder="Enter your email"
        style={{color: 'black'}}
        required
      />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 start-1 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
</svg>

      </div>
    </div>

    {/* Password Field */}
    <div className="mb-4 ">
      <label htmlFor="password" className="block text-sm font-medium text-white">
        Create Password
      </label>
      <div className="relative">
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInput}
        className="mt-1 block border border-white bg-white rounded-md p-3 ps-10  w-96 text-black  sm:text-sm/6 "
        placeholder="Create Password"
        style={{color: 'black'}}
        required
      />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 start-1 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
</svg>

      </div>
    </div>
      <PasswordValidation validation={passwordValidation}  />

      {/* confirm password */}
      {/* <div className="mb-4 ">
      <label htmlFor="cpassword" className="block text-sm font-medium text-white">
        Confirm Password
      </label>
      <div className="relative">
      <input
        type="password"
        id="cpassword"
        name="cpassword"
        // value={formData.password}
        onChange={handleInput}
        className="mt-1 block border border-white bg-white rounded-md p-3 ps-10  w-96 text-black  sm:text-sm/6 "
        placeholder="Re-enter Password"
        style={{color: 'black'}}
        required
      />
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 start-1 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
</svg>

      </div>
    </div> */}
    {/* Terms and Conditions */} 
    <TermsAndConditions isAgreed={isAgreed} setIsAgreed={setIsAgreed} />

    {/* Submit Button */}
    <div className="flex flex-col items-center justify-center pt-8">
</div>
    <button
      type="submit"
      className={` text-white font-bold py-2 rounded-md w-80 ${isPasswordValid && isAgreed ? 'bg-orange-600' : 'bg-black cursor-not-allowed'
        }`}
      disabled={!isPasswordValid || !isAgreed}
    >
      Create an account
    </button>
    </form>
    <br />
    <div className="flex items-center justify-center gap-4  w-80  ">

    <hr className='w-15 text-white'/><h1 className="text-white">OR</h1> <hr className='w-15'/>
    </div>
<div className="relative">
    <button
     className="border border-red text-slate-200 py-2 mx-auto rounded-md w-80 mt-4 hover:bg-red hover:border-white" 
    onClick={handlegoogle}>
      {isLoading ? 'Processing...' : 'Continue with Google'}
      </button>
<img src="img/google.png" alt="" className='w-10 absolute top-4 start-2'/>

</div>
{/* //paxiiii */}
{/* <div className="relative">
    <button className="border border-success text-white py-2 mx-auto rounded-md w-80 mt-4">Continue with Whatsapp</button>
<img src="img/whatsapp.png" alt="" className='w-7 absolute top-6 start-4'/>

</div> */}
    {/* </div> */}

    <div className="mt-4 text-center text-white">
      <p>
        Already a member? <Link href="/Login" className="text-blue-600">Login</Link>
      </p>
    </div>
    </div>
  </>

);
}


export default SignupForm;