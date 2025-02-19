'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
// import $axios from "@src/lib/axios.instance.ts";
import $axios from '@/src/lib/axios.instance';



const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [restoken,setRestoken]=useState('');
  const router = useRouter(); // Using the Next.js router for navigation
  const [otpSent, setOtpSent] = useState(false); // State to track OTP status

  // Handle OTP submission
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
console.log(token,email);

  const sendOtp=async ()=>{
    setOtpSent(true);

    const response = await $axios.post("/api/v1/users/register/sendEmailOTP", { email, token }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
        alert('OTP sent successfully!');
        setRestoken(response.data.data.token)
    }     
};  
// console.log("success token",restoken)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any existing error message

    try {
      // Send OTP to backend for verification

      console.log("emailtoken in verify",otp,restoken)
      const token=restoken
      console.log("verify vanda maathi ")
      const response = await $axios.post("/api/v1/users/register/verifyOtp", { token, otp });
      console.log("verify vayesi",response)
      console.log(response.status)
      if (response.status==200) {
        setSuccess(true);
        alert('OTP verified successfully, Please Login!');
        // Navigate to dashboard or login page after successful verification
        router.push('/Login');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-20 flex flex-col lg:flex-col items-center justify-center min-h-[90vh]  md:flex-row  pt-6 rounded bg-[url('/img/card_2.jpg')] bg-cover bg-center">
        {/* Main Box*/}
        {/* <div className="flex flex-col gap-10 lg:w-3/4 md:w-1/2 ps-4 pt-5 relative z-10  justify-center items-center  rounded  "> */}
          <div className="flex items-center justify-center w-1/4 h-1/4  backdrop-blur-lg bg-black/10   rounded-xl rounded-shadow-lg lg:p-6">
            <div className="  ">
              <h2 className="text-xl font-semibold mb-4 text-white">
                OTP Verification
              </h2>

              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-pandit text-white px-4 py-2 rounded-md"
                onClick={sendOtp}
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
              {!success ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4  flex justify-start flex-col items-start">
                    <label htmlFor="otp" className="block text-white mb-2">
                      Enter your OTP
                    </label>
                    <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
                  </div>
                  <div className="flex gap-4">
                   
                  <button
                    type="submit"
                    className="bg-pandit text-white px-4 py-2 rounded-md"
                  >
                    Verify OTP
                  </button>


                  </div>
                </form>
              ) : (
                <p className="text-green-500">OTP Verified Successfully!</p>
              )}
              {/* {sucess?<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendOtp}>
              send OTP
            </button>:  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendOtp}>
              resend OTP
            </button>} */}
              <br />

           
            </div>
          </div>
          {/* <SignupForm /> */}
        {/* </div> */}
      </div>

      <Footer />
    </>
  );
};

export default OTPVerification;
