import React from "react";
import Link from "next/link";
import Radio from "./Radio";
import { MdArrowBackIos } from "react-icons/md";
export default function About() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="text-center font-main text-2xl font-semibold lg:text-3xl">
        {" "}
        Checkout
      </h1>
      <p className="mb-8 text-center font-MyFont lg:mb-14">
        Provide your payment and delivery address information to finalize your
        order.
      </p>
      <form className="my-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-5 lg:gap-x-10 font-MyFont divide-x">
        <div className="md:col-span-1 lg:col-span-3">
          <h2 className="text-xl font-bold">Billing Details</h2>
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
              Address
              <textarea
                placeholder="No (27), 11 M, 370205, gujarat, India"
                rows="4"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                name="address"
              ></textarea>
            </label>
          </div>
          <label className="ml-1">
            <input
              className="mr-2 scale-125 accent-skin-accent outline-skin-accent"
              type="checkbox"
              name="saveInfo"
            />
            Save this information for next time
          </label>
          <div className="my-4">
            <label className="font-MyFont font-medium">
              Order Notes (optional)
              <textarea
                rows="4"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                name="orderNotes"
              ></textarea>
            </label>
          </div>
          <div>
            <Link
              className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid md:inline-flex font-MyFont opacity-60"
              href="/"
            >
              {" "}
              <MdArrowBackIos />
              Return To Cart
            </Link>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-3 rounded justify-between divide-y bg-bggray p-4 md:col-span-1 md:p-6 lg:col-span-2 lg:my-0 lg:p-8">
          <div className="flex flex-col justify-between ">
            <h2 className="text-center text-lg font-semibold">Order Summary</h2>
            <span className="font-medium mt-10 mb-2">Have a Coupon code?</span>
            <div className="mt-1 flex justify-between">
              <input
                placeholder="Enter Your Coupon code"
                className=" block  md:pr-10 rounded border-2 border-gray-300 bg-primary py-1font-normal outline-skin-accent mr-3 flex-1 px-2 "
                type="text"
              />
              <button
                type="button"
                className="rounded z-100 bg-gray-800 px-4 py-1 text-lg font-medium tracking-widest text-primary outline-offset-2 hover:bg-opacity-80 active:bg-opacity-100"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between ">
            <div className="flex items-center py-6 justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-semibold">2000 Ks</span>
            </div>
            <Radio />
          </div>
        </div>
      </form>
    </div>
  );
}
