"use client";
import React from 'react';
import Link from "next/link";
import { RiSendPlaneLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        toast.success("Registered successfully");
        router.push("/Login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error.method, " " + error.message);
      toast.error("Registration error", error);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
    <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
      {" "}
    Register 
    </h1>
    <div className="md:divide-x flex flex-col md:flex-row ">
      <div className="flex pb-3 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        
       Welcome to <br className="hidden lg:flex pt-2"></br> The Website
      
      </div>
      <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
        <h2 className="text-xl mb-2 font-MyFont font-bold">Register Now!</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-MyFont font-medium">
           Full Name
            <input
              placeholder="Enter Your Full Name"
              className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
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
        
          className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
        >
          <RiSendPlaneLine className="mt-1 text-white mr-3" />
          <span>Register</span>
        </button>
        {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        <div className="text-lg mt-3 flex justify-end text-right" >
        Already have an account? <Link href={"/Login"}> <span className="underline pl-2">Login Now!</span></Link>
        </div>
        </form>
      </div>
    </div>
  </div>
);
}
