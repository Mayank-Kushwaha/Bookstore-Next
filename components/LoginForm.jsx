"use client";
import React from 'react';
import { RiSendPlaneLine } from "react-icons/ri";
import { useState } from "react";
import { signIn } from "next-auth/react";
import cookie from 'js-cookie'
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res3 = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      const res =  await fetch(`/api/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password,
        }),
      })
      const res2 = await res.json()
      if (res2.error || res3.error) {
        setError("Invalid Credentials");
        console.log(error);
        toast.error("Login error",res2.error.message,res3.error.message );
        return;
      }else{
        console.log(res2)
        console.log(res2.user)
        cookie.set('token',res2.token, { expires: 30 * 24 * 60 * 60,})
        cookie.set('user',res2.user)
        toast.success("Login successfully");
        router.push('/Dashboard')
     }

    
      // router.replace("Dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
      Login 
      </h1>
      <div className="md:divide-x flex flex-col md:flex-row ">
        <div className="flex pb-3 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
          
         Welcome to <br className="hidden lg:flex pt-2"></br> The Website, <br className="hidden lg:flex pt-2"></br>
         For accessing Cart<br className="hidden lg:flex pt-2"></br> and Wishlist <br className="hidden lg:flex pt-2"></br>login now!
        
        </div>
        <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
          <h2 className="text-xl mb-2 font-MyFont font-bold">Login Now!</h2>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Email Address
              <input
                   onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Valid Email"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Password
              <input
                   onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="password"
                name="password"
              />
            </label>
          </div>
      
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
          >
            <RiSendPlaneLine className="mt-1 text-white mr-3" />
            <span>Login</span>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="text-lg mt-3 flex justify-end text-right" >
            Don't have an account? <Link href={"/Register"}> <span className="underline pl-2">  Register Here</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
