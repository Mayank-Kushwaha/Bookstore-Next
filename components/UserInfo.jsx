"use client";
import React from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from 'js-cookie';
export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to Book odyssey
      </div>
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col  text-md gap-2 my-6">
        <div className="font-main ">
          Name:{" "}
          <span className="font-bold font-MyFont pl-3">
            {session?.user?.name}
          </span>
        </div>
        <div className="font-main">
          Email:{" "}
          <span className="font-bold font-MyFont pl-3">
            {session?.user?.email}
          </span>
        </div>
        <button
          onClick={() => {
            toast.success("Logout successfully");
            signOut();
            cookie2.remove("user")
            cookie2.remove("token")
            router.push("/");
          }}
          className="bg-red-500 text-white w-[150px] font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
