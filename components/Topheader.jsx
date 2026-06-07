import React from "react";
import Link from "next/link";
import { FiTruck } from "react-icons/fi";

export default function Topheader() {
  return (
    <div className="hidden md:block w-full bg-textgray text-primary">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8 py-1.5 font-MyFont text-xs">
        <span className="inline-flex items-center gap-2">
          <FiTruck size={14} aria-hidden="true" />
          Free shipping on orders over ₹499
        </span>
        <nav aria-label="Secondary" className="flex items-center gap-5">
          <Link
            href="/About"
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            About
          </Link>
          <Link
            href="/Contact"
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            Contact
          </Link>
          <Link
            href="/Policy"
            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </div>
  );
}
