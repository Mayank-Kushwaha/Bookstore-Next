"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";

export default function Hashtag() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're on the list");
    setEmail("");
  };

  return (
    <section className="mt-12 lg:mt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-bggray rounded-2xl px-6 sm:px-10 py-10 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-main text-2xl md:text-3xl font-semibold tracking-tight text-textgray">
              A short letter, twice a month.
            </h2>
            <p className="mt-3 font-MyFont text-sm md:text-base text-gray-600 leading-relaxed">
              New arrivals, reading lists from our editors, and a quiet
              recommendation worth your weekend. No spam, ever.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-auto lg:min-w-[420px] flex flex-col sm:flex-row gap-2"
          >
            <label htmlFor="hashtag-newsletter" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <FiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
                aria-hidden="true"
              />
              <input
                id="hashtag-newsletter"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full font-MyFont bg-primary border border-transparent rounded-full pl-10 pr-4 py-3 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-6 py-3 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
