"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "@formspree/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import {
  FiFacebook,
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const CHANNELS = [
  {
    Icon: FiMail,
    label: "Email",
    value: "mayankkush0842@gmail.com",
    href: "mailto:mayankkush0842@gmail.com",
  },
  {
    Icon: FiPhone,
    label: "Phone",
    value: "+91 9023 373 686",
    href: "tel:+919023373686",
  },
  {
    Icon: FiMapPin,
    label: "Address",
    value: "Ahmedabad, Gujarat, India",
  },
  {
    Icon: FiClock,
    label: "Hours",
    value: "Mon to Sat, 10:00 to 18:00 IST",
  },
];

const SOCIALS = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: FiFacebook },
  {
    href: "https://www.instagram.com/_mayank._k___/",
    label: "Instagram",
    Icon: SlSocialInstagram,
  },
  { href: "https://t.me/+919023373686", label: "Telegram", Icon: PiTelegramLogo },
  {
    href: "mailto:mayankkush0842@gmail.com",
    label: "Email us",
    Icon: IoMailUnreadOutline,
  },
];

export default function Contact() {
  const router = useRouter();
  const [state, handleSubmit] = useForm("mqkvgrjn");

  if (state.succeeded) {
    toast.success("Message sent. We will reply shortly.");
    router.push("/");
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <header className="mb-10 max-w-2xl">
        <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Contact
        </span>
        <h1 className="mt-2 font-main text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-textgray leading-[1.1]">
          We would love to hear from you.
        </h1>
        <p className="mt-4 font-MyFont text-base text-gray-600 leading-relaxed">
          Questions about an order, a recommendation request, or a partnership
          idea, drop us a line and we will respond within one business day.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Channels */}
        <aside className="lg:col-span-5">
          <div className="bg-bggray/60 rounded-2xl p-6 md:p-8">
            <h2 className="font-main text-xl font-semibold text-textgray">
              Reach us directly
            </h2>
            <ul className="mt-5 space-y-4 font-MyFont text-sm">
              {CHANNELS.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-textgray shrink-0">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{label}</p>
                    {href ? (
                      <Link
                        href={href}
                        className="text-textgray hover:text-black transition-colors duration-200 break-all"
                      >
                        {value}
                      </Link>
                    ) : (
                      <p className="text-textgray">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="font-MyFont text-xs font-semibold uppercase tracking-wider text-gray-500">
                Follow along
              </p>
              <div className="mt-3 flex items-center gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    aria-label={label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-textgray hover:bg-textgray hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                  >
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-bggray/60 rounded-2xl p-6 md:p-8"
            noValidate
          >
            <h2 className="font-main text-xl font-semibold text-textgray">
              Send us a message
            </h2>
            <p className="mt-1 font-MyFont text-sm text-gray-600">
              We typically reply within one business day.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="w-full font-MyFont bg-primary border border-transparent rounded-md px-4 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className="w-full font-MyFont bg-primary border border-transparent rounded-md px-4 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-query"
                  className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-query"
                  name="query"
                  rows="5"
                  placeholder="Tell us a bit more."
                  required
                  className="w-full font-MyFont bg-primary border border-transparent rounded-md px-4 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-base rounded-full px-6 py-3 hover:bg-black transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
              >
                <FiSend size={16} />
                {state.submitting ? "Sending" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
