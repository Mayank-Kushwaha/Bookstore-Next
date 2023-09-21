"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function Radio() {
  const [selectedTopping, setSelectedTopping] = useState("Cash");
  return (
    <div className="flex flex-col font-MyFont gap-3 justify-center ">
      <label htmlFor="Cash" className="flex">
        <input
          type="radio"
          name="payment"
          value="Cash"
          id="Cash"
          className="h-5 w-5 mt-2  border-2 border-black cursor-default rounded-full bg-primary shadow-[0_0_0_2px] shadow-bggray  focus-within:border-2 focus-within:border-skin-accent"
          checked={selectedTopping === "Cash"}
          onChange={(e) => setSelectedTopping(e.target.value)}
        />
        <h1 className=" ml-auto w-11/12 mt-2 text-left font-bold leading-none text-skin-dark">
          Cash on Delivery{" "}
        </h1>
      </label>

      <label htmlFor="Cash" className="flex">
        <input
          type="radio"
          name="payment"
          value="Bank"
          id="Bank"
          className="h-5 w-5 mt-2  border-2 border-black cursor-default rounded-full bg-primary shadow-[0_0_0_2px] shadow-bggray  focus-within:border-2 focus-within:border-skin-accent"
          checked={selectedTopping === "Bank"}
          onChange={(e) => setSelectedTopping(e.target.value)}
        />
        <h1 className=" ml-auto w-11/12 mt-2 text-left font-bold leading-none text-skin-dark">
          Bank Transfer{" "}
          <p className="flex text-sm font-normal py-1 font-MyFont">
            Make your payment directly from googlepay, paytm, UPI
          </p>
        </h1>
      </label>
      <Link href="/">
        {" "}
        <button
          type="button"
          className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
        >
          <span>Place order</span>
        </button>
      </Link>
    </div>
  );
}
