"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import toast from "react-hot-toast";

const QUICK_LINKS = [
  { href: "/About", label: "About Us" },
  { href: "/Contact", label: "Contact Us" },
  { href: "/Faq", label: "FAQ" },
  { href: "/Policy", label: "Privacy Policy" },
  { href: "/Terms", label: "Terms & Conditions" },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    Icon: FiFacebook,
  },
  {
    href: "https://www.instagram.com/_mayank._k___/",
    label: "Instagram",
    Icon: SlSocialInstagram,
  },
  {
    href: "https://t.me/+919023373686",
    label: "Telegram",
    Icon: PiTelegramLogo,
  },
  {
    href: "mailto:mayankkush0842@gmail.com",
    label: "Email",
    Icon: IoMailUnreadOutline,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing");
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-bggray bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <h2 className="font-main text-2xl font-semibold text-textgray">
              Book Odyssey
            </h2>
            <p className="mt-3 font-MyFont text-sm leading-relaxed text-gray-600 max-w-sm">
              An online bookstore for readers who care about what they read.
              Fiction, biography, history, manga, and more, curated for the
              shelf you want next.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-bggray text-textgray hover:bg-textgray hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-main text-sm font-semibold uppercase tracking-wider text-textgray">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 font-MyFont text-sm">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-textgray transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-main text-sm font-semibold uppercase tracking-wider text-textgray">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 font-MyFont text-sm text-gray-600">
              <li>
                <span className="block text-xs text-gray-500">Email</span>
                <Link
                  href="mailto:mayankkush0842@gmail.com"
                  className="hover:text-textgray transition-colors duration-200 break-all"
                >
                  mayankkush0842@gmail.com
                </Link>
              </li>
              <li>
                <span className="block text-xs text-gray-500">Phone</span>
                <Link
                  href="tel:+919023373686"
                  className="hover:text-textgray transition-colors duration-200"
                >
                  +91 9023 373 686
                </Link>
              </li>
              <li>
                <span className="block text-xs text-gray-500">Address</span>
                Ahmedabad, Gujarat, India
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-main text-sm font-semibold uppercase tracking-wider text-textgray">
              Stay in the loop
            </h3>
            <p className="mt-3 font-MyFont text-sm text-gray-600">
              New arrivals and curated reading lists, once a month. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full font-MyFont bg-bggray border border-transparent rounded-md px-4 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray focus:bg-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-textgray text-primary font-MyFont text-sm font-semibold rounded-md px-4 py-2.5 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-bggray bg-textgray">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 font-MyFont text-xs text-primary/85">
          <span>© {new Date().getFullYear()} Book Odyssey. All rights reserved.</span>
          <span>
            Crafted by{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary transition-colors duration-200"
              href="https://mayank-kushwaha-aiportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mayank Kushwaha
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
