"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const toggleShadow = () => {
      if (navbar) {
        navbar.classList.toggle("shadow", window.scrollY > 10);
      }
    };
    toggleShadow();
    window.addEventListener("scroll", toggleShadow);
    return () => {
      window.removeEventListener("scroll", toggleShadow);
    };
  }, []);
  useEffect(() => {
    const navbarr = document.querySelector(".small-navbar");
    const toggleShadow = () => {
      if (navbarr) {
        navbarr.classList.toggle("shadow", window.scrollY > 10);
      }
    };
    toggleShadow();
    window.addEventListener("scroll", toggleShadow);
    return () => {
      window.removeEventListener("scroll", toggleShadow);
    };
  }, []);
  return (
    <div className="sticky top-0 z-20 ">
      <div className="sticky top-0 z-20 md:justify-between lg:justify-around navbar px-8 py-6 bg-primary nav-main hidden md:flex ">
        <Link className="font-main text-3xl font-semibold md:flex" href="/">
          {" "}
          BookStore{" "}
        </Link>
        <div className=" hidden md:flex text-lg font-MyFont gap-x-8 ">
          <nav className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black cursor-pointer">
            Category <GoChevronDown className="mt-1 icon-top stroke-1 ml-2" />
          </nav>
          <Link
            href="/"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <BiSearch className="mt-1 icon-top mr-3" />
            Search
          </Link>
          <Link
            href="/"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <AiOutlineUser className="mt-1 icon-top mr-3" />
            Account
          </Link>
          <Link
            href="/"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <FaRegHeart className="mt-1 icon-top mr-3" />
            Wishlist
          </Link>
          <Link
            href="/"
            className="hover:opacity-95 opacity-70 flex flex-row link link-underline link-underline-black"
          >
            <AiOutlineShoppingCart className="mt-1 icon-top mr-3" />
            Cart
          </Link>
        </div>
      </div>
      {/*============================================================================= */}
      <div className="sticky top-0 z-20 flex justify-between small-navbar px-4 py-6 bg-primary md:hidden ">
        {/*hidden nav section ---------------- */}
        <div className="flex md:hidden">
              <HiMenuAlt2 className="mt-1 icon-top mr-3" onClick={openModal}/>
               </div>
        <div className="flex  md:hidden">
          <Link
            className="font-main text-2xl font-semibold md:text-3xl"
            href="/"
          >
            {" "}
            BookStore{" "}
          </Link>
        </div>
        <div className="flex mt-2 md:hidden">
          <BiSearch className="icon-top mr-6" />
          <AiOutlineShoppingCart className="icon-top" />
        </div>
      </div>
      {/*============================================================================= */}
      <div id="modal">
        <div className="fixed top-0 left-0 z-30 h-screen w-full bg-skin-dark transition-all delay-300 duration-500 md:hidden opacity-50"></div>
        <div
          className={`fixed main-navbar top-0 z-30 flex h-screen max-h-screen w-10/12 flex-col items-center 
          overflow-y-scroll bg-primary p-4 transition-transform duration-300 md:hidden translate-x-0 ${
            isOpen ? "open" : "close"
          } `}
        >
          <button
            type="button"
            title="Close Menu"
            onClick={closeModal}
            className="self-end p-1 mt-4"
          >
            <AiOutlineClose className="icon-bottom" />
          </button>
          <div className="flex flex-col items-center justify-center gap-2 gap-x-4">
            <div className="font-main text-2xl font-medium">BookStore</div>
            <p className="text-center font-MyFont">One of the best book stores in the World</p>
          </div>
        </div>
      </div>
    </div>
  );
}
