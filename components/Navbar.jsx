"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { CgLogIn } from "react-icons/cg";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WIshlistContext";

const NAV_LINKS = [
  { href: "/Search", label: "Search", Icon: BiSearch },
  { href: "/Wishlist", label: "Wishlist", Icon: FaRegHeart, counterKey: "wishlist" },
  { href: "/Cart", label: "Cart", Icon: AiOutlineShoppingCart, counterKey: "cart" },
  { href: "/Dashboard", label: "Dashboard", Icon: AiOutlineUser },
  { href: "/Login", label: "Login", Icon: CgLogIn },
];

function Badge({ count }) {
  if (!count) return null;
  return (
    <span
      className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center bg-textgray text-primary text-[10px] font-bold rounded-full"
      aria-label={`${count} items`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const { WishlistItems } = useWishlist();

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const counters = {
    cart: cartItems?.length || 0,
    wishlist: WishlistItems?.length || 0,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-30 transition-shadow duration-200 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-sm border-b border-bggray"
          : "bg-primary border-b border-transparent"
      }`}
    >
      {/* Desktop bar */}
      <div className="hidden md:flex mx-auto max-w-7xl items-center justify-between gap-6 px-6 lg:px-8 h-16 lg:h-[72px]">
        <Link
          href="/"
          className="font-main text-2xl lg:text-[26px] font-semibold tracking-tight text-textgray hover:text-black transition-colors duration-200"
        >
          Book Odyssey
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 lg:gap-2 font-MyFont">
          {NAV_LINKS.map(({ href, label, Icon, counterKey }) => (
            <Link
              key={href}
              href={href}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm lg:text-[15px] text-textgray hover:bg-bggray transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
            >
              <span className="relative">
                <Icon size={18} />
                {counterKey && <Badge count={counters[counterKey]} />}
              </span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile bar */}
      <div className="md:hidden flex items-center justify-between px-4 h-14">
        <button
          type="button"
          aria-label="Open menu"
          onClick={openMenu}
          className="p-2 -ml-2 rounded-md text-textgray hover:bg-bggray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
        >
          <HiMenuAlt2 size={22} />
        </button>

        <Link
          href="/"
          className="font-main text-xl font-semibold tracking-tight text-textgray"
        >
          Book Odyssey
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/Search"
            aria-label="Search"
            className="p-2 rounded-md text-textgray hover:bg-bggray transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
          >
            <BiSearch size={20} />
          </Link>
          <Link
            href="/Cart"
            aria-label="Cart"
            className="relative p-2 rounded-md text-textgray hover:bg-bggray transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
          >
            <span className="relative">
              <AiOutlineShoppingCart size={20} />
              <Badge count={counters.cart} />
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-textgray/40 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed top-0 left-0 z-50 h-full w-[82%] max-w-sm bg-primary shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-bggray">
              <span className="font-main text-xl font-semibold text-textgray">
                Book Odyssey
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="p-2 -mr-2 rounded-md text-textgray hover:bg-bggray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 font-MyFont">
              <ul className="flex flex-col gap-1">
                {[
                  { href: "/", label: "Home" },
                  ...NAV_LINKS,
                  { href: "/About", label: "About" },
                  { href: "/Contact", label: "Contact" },
                ].map(({ href, label, Icon, counterKey }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-md text-base text-textgray hover:bg-bggray transition-colors duration-200"
                    >
                      <span className="flex items-center gap-3">
                        {Icon && <Icon size={18} />}
                        {label}
                      </span>
                      {counterKey && counters[counterKey] > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-textgray text-primary text-xs font-bold rounded-full">
                          {counters[counterKey]}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-5 py-4 border-t border-bggray font-MyFont text-xs text-gray-500">
              One of the finest book stores online.
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
