"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import $axios from "@/src/lib/axios.instance";
import AOS from "aos";

function Login() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const router = useRouter();
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(false);
  const [errordata, setErrordata] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file"
          ? event.target.files
            ? event.target.files[0]
            : null
          : value,
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(formData);
    setWait(true);
    try {
      console.log("eta maathi");
      const res = await $axios.post("/api/v1/users/login", formData);

      console.log(res.data);
      if (res.data.success) {
        console.log("done login");
        console.log("accesstokenis ", res.data.data.accessToken);
        if (typeof window !== "undefined") {
          localStorage.setItem("token_id", res.data.data.accessToken);
        }
        Cookies.set("loggedin", "true");
        Cookies.set("isAdmin", res.data.data.user.isAdmin);
        Cookies.set("isPandit", res.data.data.user.isPandit);

        if (typeof window !== "undefined") {
          console.log(localStorage.getItem("token_id"));
        }
        console.log("admin is", res.data.data.user.isAdmin);
        if (res.data.data.user.isAdmin) {
          return router.push(`/admin`);
        }
        if (res.data.data.user.isPandit) {
          return router.push("/pandit/Profile");
        }
        router.push(`/user`);
      }
    } catch (error: any) {
      console.log("Error during login:", error);
      setError(true);
      setWait(false);
      setErrordata(error.response?.data?.error);
      return;
    }
  }

  const handlegoogle = async () => {
    setIsLoading(true);

    try {
      if (typeof window !== "undefined") {
        window.location.href = "https://purohit-backend-uhqv.onrender.com/api/v1/users/auth/google";
      }
    } catch (error: any) {
      alert("There was some error while redirecting");
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 bg-[url('/img/card_1.jpg')] bg-cover bg-center">
        {/* Main Container */}
        <div
          className="flex flex-col lg:flex-row justify-center w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl rounded-lg backdrop-blur-lg bg-black/20 shadow-2xl shadow-black/60 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          data-aos="fade-left"
        >
          {/* Left Side - Hero Text (Hidden on mobile, visible on larger screens) */}
          <div className="hidden lg:flex flex-col justify-center lg:w-2/5 xl:w-1/2 p-4 lg:p-6 xl:p-8 items-start">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-white leading-tight">
              Your Personalized <span className="text-orange-600">Pandit</span>{" "}
              Service,
              <br />
              <span className="text-orange-600">Anytime, Anywhere</span>
            </h2>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col w-full lg:w-3/5 xl:w-1/2 h-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-14">
            {/* Mobile Hero Text */}
            <div className="lg:hidden text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight">
                Your Personalized{" "}
                <span className="text-orange-600">Pandit</span> Service
              </h2>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white text-center lg:text-left">
              Log in to your account
            </h1>
            <p className="mb-4 sm:mb-6 text-gray-300 text-sm sm:text-base text-center lg:text-left">
              Welcome back! Please enter your details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-slate-200 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    onInvalid={(e) =>
                      e.currentTarget.setCustomValidity(
                        "Invalid :Please include an '@' and a valid domain (e.g., example@domain.com)"
                      )
                    }
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                    className="block w-full rounded-md p-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm sm:text-base font-medium text-white mb-2"
                >
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInput}
                    className="block w-full rounded-md p-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter Password"
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 absolute top-3 left-2 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm sm:text-base p-3 bg-red-900/20 rounded-md border border-red-500/30">
                  {errordata}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 sm:py-4 rounded-md text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {wait ? (
                  <>
                    <span>Please Wait</span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 py-2 sm:py-3">
                <hr className="flex-1 border-gray-400" />
                <span className="text-white text-sm sm:text-base font-medium">
                  OR
                </span>
                <hr className="flex-1 border-gray-400" />
              </div>

              {/* Google Sign In */}
              <div className="relative">
                <button
                  type="button"
                  className="w-full border-2 border-gray-300 bg-white hover:bg-gray-50 text-black font-medium py-3 sm:py-4 rounded-md text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  onClick={handlegoogle}
                >
                  <img
                    src="img/google.png"
                    alt="Google"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <span>
                    {isLoading ? "Processing..." : "Continue with Google"}
                  </span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-4 sm:pt-6">
                <p className="text-white text-sm sm:text-base">
                  Don't have an account?{" "}
                  <Link
                    href="/Signup"
                    className="text-orange-400 hover:text-orange-300 font-semibold underline transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
