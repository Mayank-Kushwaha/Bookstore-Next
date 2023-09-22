import React from "react";
import Link from "next/link";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";

export default function Contact() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        Contact Us
      </h1>
      <div className="md:divide-x flex  ">
        <div className="md:flex pb-8 md:pb-0 md:pr-10 xl:pr-20 hidden font-MyFont">
          <div className="flex flex-row gap-x-8 mt-3 justify-center md:justify-start opacity-80 !stroke-current stroke-2 ">
            {" "}
            <Link href="https://www.facebook.com/">
              {" "}
              <FiFacebook href="" className="icon-bottom " />{" "}
            </Link>
            <Link href="https://www.instagram.com/_mayank._k___/">
              {" "}
              <SlSocialInstagram className="icon-bottom" />{" "}
            </Link>
            <Link href="https://t.me/+919023373686">
              {" "}
              <PiTelegramLogo className="icon-bottom" />{" "}
            </Link>
            <Link href="mailto:mayankkush0842@gmail.com">
              {" "}
              <IoMailUnreadOutline className="icon-bottom" />
            </Link>
          </div>
        </div>
        <div className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
          <h2 className="text-xl mb-2 font-MyFont font-bold">Any Query!</h2>
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
              Subject
              <input
                placeholder="Enter Subject of your Query"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="username"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Query
              <textarea
                placeholder="Hey, I just want to contact you"
                rows="4"
                className="y-1 block w-full rounded border-2 border-skin-gray bg-skin-base py-1 px-2
                  font-normal outline-skin-accent"
                name="address"
              ></textarea>
            </label>
          </div>
          <button
            type="button"
            className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
          >
            <RiSendPlaneLine className="mt-1 text-white mr-3" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
