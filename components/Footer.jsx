import React from 'react';
import Link from "next/link";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="mt-auto shadow-inner  ">
      <div className="footer-container mx-auto grid gap-6 max-w-6xl grid-cols-2  px-4 py-10 md:grid-cols-4 md:grid-rows-4 md:gap-x-6 md:gap-y-0 md:px-8 lg:gap-x-8 lg:gap-y-2">
        <div className="bookstore-desc col-span-2 md:row-span-3">
          <h2 className="my-2 font-main text-xl font-semibold">Book Odyssey</h2>
          <div className="text-sm">
            <p className="my-1 opacity-80 font-MyFont">
              We are an online bookstore that offers a wide selection of books
              in various genres, including fiction, non-fiction, biographies,
              and more.
            </p>
            <p className="my-1 opacity-80 font-MyFont">
              We provide a convenient and enjoyable shopping experience while
              offering competitive prices and excellent customer service.
            </p>
          </div>
        </div>

        <div className="about-us  opacity-80 md:row-span-4">
          <h2 className="my-1 font-main text-xl font-semibold">Quick Links</h2>
          <Link
            className="text-link block py-1 font-MyFont underline  decoration-dashed underline-offset-2 hover:decoration-solid   "
            href="/About"
          >
            About Us
          </Link>

          <Link
            className="text-link block py-1 font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            href="/Contact"
          >
            Contact Us
          </Link>

          <Link
            className="text-link block py-1 font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            href="/Faq"
          >
            FAQ
          </Link>

          <Link
            className="text-link block py-1 font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            href="/Policy"
          >
            Privacy Policy
          </Link>

          <Link
            className="text-link block py-1 font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            href="/Terms"
          >
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="services md:row-span-4">
          <h2 className="my-1 font-main text-xl font-semibold">Contact</h2>
          <p className="mb-3 mr-4 text-sm font-MyFont opacity-80">
            Email:
            <Link
              href="mailto:mayankkush0842@gmail.com"
              className="text-link mt-1 block font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            >
              mayankkush0842@gmail <br className='flex md:hidden'></br>.com
            </Link>
          </p>
          <p className="mb-3 text-sm font-MyFont">
            Phone:
            <Link
              href="tel:+919023373685"
              className="text-link mt-1 block font-MyFont underline decoration-dashed underline-offset-2 hover:decoration-solid "
            >
              +919023373685
            </Link>
          </p>
          <p className="mb-3 text-sm font-MyFont">
            Address:
            <span className="mt-1 block font-MyFont">
              Ahmedabad, Gujarat, INDIA
            </span>
          </p>
        </div>

        <div className="social-group col-span-2  md:row-span-1 md:self-center">
          <div className="flex flex-row gap-x-8 mt-3 justify-center md:justify-start opacity-80 !stroke-current stroke-2 ">
            {" "}
            <Link href="https://www.facebook.com/">
              {" "}
              <FiFacebook className="icon-bottom " />{" "}
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
      </div>
      <div className="copyright-notice-container w-full  p-1 bg-textgray">
        <div
          className="copyright-notice font-MyFont mx-auto flex max-w-6xl flex-col items-center py-1 px-4 text-primary md:flex-row 
           md:justify-between md:px-8"
        >
          <span>© Copyright Next Bookstore</span>
          <span>
            Crafted by
            <Link
              className="underline decoration-dashed underline-offset-2 hover:decoration-solid"
              href="https://lordmashh.github.io/Portfolio_mayank/"
            >
              {" "}
              Mayank kushwaha
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
