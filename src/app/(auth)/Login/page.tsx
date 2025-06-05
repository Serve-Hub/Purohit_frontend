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
  // AOS.init();
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
  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? (event.target.files ? event.target.files[0] : null) : value,
    }));
  };
  async function handleSubmit(event:React.FormEvent) {
    event.preventDefault();
    console.log(formData);
    setWait(true);
    try {
      console.log("eta maathi");
      const res = await $axios.post("/api/v1/users/login", formData);
      // const res = await axios.post("https://purohit-backend.onrender.com/api/v1/users/login", formData);
      // console.log(
      //   "laadmin and pandit",
      //   res.data.data.user.isAdmin,
      //   res.data.data.user.isAdmin
      // );
      // console.log(res.data.data)
console.log(res.data);
      if (res.data.success) {
        console.log("done login");
        console.log("accesstokenis ", res.data.data.accessToken);
        localStorage.setItem("token_id", res.data.data.accessToken);
        Cookies.set("loggedin", "true");
        Cookies.set("isAdmin", res.data.data.user.isAdmin);
        Cookies.set("isPandit", res.data.data.user.isPandit);

        console.log(localStorage.getItem("token_id"));
        // alert("Successful registration");
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
      // alert("There was an error during the login process. Please try again.");
    }
  }
  const handlegoogle = async () => {
    setIsLoading(true);

    try {
      // const backendUrl = process.env.REACT_APP_API_URL;
      // window.location.href = "https://purohit-backend.onrender.com/api/v1/users/auth/google"
      window.location.href = "http://localhost:3000/api/v1/users/auth/google";
    } catch (error: any) {
      alert("There was some error while redirecting");
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white md:flex-row bg-[url('/img/card_1.jpg')] bg-cover bg-center ">
        <div
          className="flex flex-col  justify-center   md:flex-row  rounded w-2/4  backdrop-blur-lg bg-black/10 shadow-lg shadow-black/50 p-8"
          data-aos="fade-left"
        >
          <div className="flex flex-col  lg:w-2/3 md:w-1/2 p-6 items-center leading-4 justify-center ">
            <h2 className="mt-4 text-4xl font-semibold  text-white ">
              Your Personalized <span className="text-orange-600">Pandit</span>{" "}
              Service,
              <br />
              <span className="text-orange-600">Anytime, Anywhere</span>
            </h2>
          </div>

          {/* <div className="flex flex-col items-center justify-center md:w-1/2 lg:w-1/2  rounded-3xl -danger  ">
          <img src="img/logo.png" alt="Purohit Logo" width={150} height={150} />
         
        </div> */}
          <div className="flex flex-col w-full  lg:w-3/4 md:w-1/2 h-full px-10 pt-14  ">
            <h1 className="text-3xl font-bold mb-4 text-white ">
              Log in to your account
            </h1>
            <p className="mb-4 text-pg ">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleSubmit}>
              {}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-200"
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
                    className="mt-1 block  rounded-md p-3 ps-10 w-80 text-gray-900   placeholder:text-gray-400  sm:text-sm/6 "
                    placeholder="Enter your email"
                    style={{ color: "black" }}
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute top-2 start-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mb-4 ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
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
                    className="mt-1 block   -gray-300 rounded-md p-3 ps-10  w-80 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    placeholder="Enter Password"
                    style={{ color: "black" }}
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute top-2 start-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>
                </div>
              </div>
              {/* <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-white">
                  Remember for 30 days
                </label>
              </div> */}
              {error && <div className="text-red-500 mb-4">{errordata}</div>}
              <button
                type="submit"
                className="w-80 bg-pandit flex gap-2 justify-center text-white font-bold py-2 rounded-md"
              >
                {wait ? (
                  <>
                    Please Wait
                    <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* <div className="my-2  ">
                <Link href="/" className="text-blue-600">
                  Forgot password?
                </Link>
              </div> */}
              <div className="flex items-center justify-center gap-4  w-80  ">
                <hr className="w-15 text-white" />
                <h1 className="text-white">OR</h1> <hr className="w-15" />
              </div>
              <div className="relative">
                <button
                  className="border bg-white text-black py-2 mx-auto rounded-md w-80 mt-4 hover:bg-red hover:border-white"
                  onClick={handlegoogle}
                >
                  {isLoading ? "Processing..." : "Continue with Google"}
                </button>
                <img
                  src="img/google.png"
                  alt=""
                  className="w-10 absolute top-4 start-2"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <p>
                  Don't have an account?{" "}
                  <Link href="/Signup" className="text-pg font-semibold">
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
