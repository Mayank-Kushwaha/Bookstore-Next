"use client";
import React from "react";
import { GrCart } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMedal } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";


const Track = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("paymentid");
  const date = searchParams.get("date");

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl ">
        Track Your Order
      </h1>
      <div className="container mx-auto py-6">
        <div className="bg-gray-100 shadow overflow-hidden sm:rounded-lg">
          <div className="p-4 bg-gray-800 text-center text-white text-lg rounded-t-lg">
            <span className="uppercase">Tracking Order No - </span>
            <span className="text-medium">{id}</span>
          </div>
          <div className="flex flex-wrap justify-between py-3 px-2 bg-gray-200">
            <div className="w-full sm:w-1/3 text-center py-1 px-2">
              <span className="text-medium">Shipped Via:</span> UPS Ground
            </div>
            <div className="w-full sm:w-1/3 text-center py-1 px-2">
              <span className="text-medium">Status:</span> Checking Quality
            </div>
            <div className="w-full sm:w-1/3 text-center py-1 px-2">
              <span className="text-medium">Ordered Date:</span> {date}
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap justify-between relative">
              <div className="w-full sm:w-1/5 text-center flex justify-center items-center flex-col">
                <div className="flex justify-center items-center bg-blue-300 rounded-full w-16 h-16">
                  <GrCart className="text-2xl z-10" />
                </div>
                <h4 className="text-gray-700 mt-2 z-10">Confirmed Order </h4>
              </div>
              <div className="w-full sm:w-1/5 text-center flex justify-center items-center flex-col">
                <div className="flex justify-center items-center bg-blue-300 rounded-full w-16 h-16">
                  <IoSettingsOutline className="text-3xl  z-10" />
                </div>
                <h4 className="text-gray-700 mt-2 z-10">Processing Order</h4>
              </div>
              <div className="w-full sm:w-1/5 text-center flex justify-center items-center flex-col">
                <div className="flex justify-center items-center bg-gray-300 rounded-full w-16 h-16 text-center  ">
                  <FaMedal className="text-3xl  z-10" />
                </div>
                <h4 className="text-gray-700 mt-2 z-10">Quality Check</h4>
              </div>
              <div className="w-full sm:w-1/5 text-center flex justify-center items-center flex-col">
                <div className="flex justify-center items-center bg-gray-300 rounded-full w-16 h-16">
                <FaCarAlt className="text-3xl" />
                </div>
                <h4 className="text-gray-700 mt-2 z-10">Product Dispatched</h4>
              </div>
              <div className="w-full sm:w-1/5 text-center flex justify-center items-center flex-col">
                <div className="flex justify-center items-center bg-gray-300 rounded-full w-16 h-16">
                <FaHouseChimney className="text-3xl" />                </div>
                <h4 className="text-gray-700 mt-2 z-10">Product Delivered</h4>
              </div>
              <div className="absolute top-7 left-[50%] md:left-20  z-0 h-30 w-2 md:h-2 md:w-3/12  bg-blue-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
