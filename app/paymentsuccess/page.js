"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Policy() {
  const searchParams = useSearchParams();
  const paymentid = searchParams.get("paymentid");
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        <strong className="font-bold">Payment successful!</strong>
        <span className="block sm:inline">
          Your paymentID= {paymentid} has been processed.
        </span>
      </div>
    </div>
  );
}
