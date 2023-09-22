import React from "react";
import Link from "next/link";
export default function Cart() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8  ">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        My Account
      </h1>
      <div className="md:divide-x md:flex  ">
        <div className="flex-1 pb-8 md:pb-0 md:pr-10 xl:pr-20 font-MyFont">
          <h2 className="text-xl font-bold">Login</h2>
          <form className="mt-4">
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                {" "}
                Email address
                <input
                  placeholder="Enter Your Valid Email "
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="text"
                  name="email"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                {" "}
                Password
                <input
                  placeholder="Enter Your Password "
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className="mb-4">
              <Link
                className="font-MyFont text-sm opacity-75 hover:opacity-100"
                href=""
              >
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-textgray text-white rounded py-2 px-8 font-MyFont font-medium md:py-1 md:px-5"
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
          <h2 className="text-xl font-MyFont font-bold">Register</h2>
          <form action="" className="mt-4">
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Full Name
                <input
                  placeholder="Enter Your Full Name"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="text"
                  name="fullName"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Email Address
                <input
                  placeholder="Enter Your Valid Email"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="email"
                  name="email"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Username
                <input
                  placeholder="Enter Your Username"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="text"
                  name="username"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Phone
                <input
                  placeholder="+919021457863 (or) 09932146687"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="text"
                  name="phone"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Password
                <input
                  placeholder="Enter Your Password"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Confirm Password
                <input
                  placeholder="Confirm Your Password"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  type="password"
                  name="confirmPassword"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="font-MyFont font-medium">
                Address
                <textarea
                  placeholder="No (27), 11 M, 370205, gujarat, India"
                  rows="4"
                  className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                  name="address"
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="bg-textgray text-white rounded py-2 px-8 font-MyFont font-medium md:py-1 md:px-5"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
