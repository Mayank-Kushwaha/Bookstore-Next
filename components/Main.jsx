"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiTruck, FiTag } from "react-icons/fi";

const TRUST = [
  { Icon: FiTruck, label: "Fast delivery" },
  { Icon: FiTag, label: "Exclusive deals" },
  { Icon: FiBookOpen, label: "Curated picks" },
];

export default function Main() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 lg:pt-16 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Copy */}
          <div className="md:col-span-7 order-2 md:order-1">
            <span className="inline-flex items-center font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Online bookstore
            </span>

            <h1 className="mt-4 font-main font-semibold tracking-tight text-textgray text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              The best place to find your next favourite book.
            </h1>

            <p className="mt-5 font-MyFont text-base lg:text-lg text-gray-600 max-w-xl leading-relaxed">
              Browse a curated catalogue across fiction, biography, history,
              manga, and more. Read previews instantly, save favourites, and
              check out in seconds.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#books"
                className="inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm lg:text-base rounded-full px-5 py-3 hover:bg-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
              >
                Browse the catalogue
                <FiArrowRight size={18} />
              </Link>
              <Link
                href="/Search"
                className="inline-flex items-center gap-2 bg-bggray text-textgray font-MyFont font-semibold text-sm lg:text-base rounded-full px-5 py-3 hover:bg-white border border-bggray hover:border-textgray transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
              >
                Search a title
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-bggray rounded-[2rem] rotate-2"
              />
              <Image
                src="/myimage.webp"
                width={540}
                height={540}
                priority
                unoptimized
                alt="Selection of curated books"
                className="w-full h-auto rounded-[2rem] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip - sits directly under the hero, not inside it */}
      <div className="border-y border-bggray bg-bggray/40">
        <ul className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-3 font-MyFont text-sm text-gray-600">
          {TRUST.map(({ Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon size={16} className="text-textgray" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
