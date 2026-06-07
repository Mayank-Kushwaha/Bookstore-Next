"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const res3 = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res2 = await res.json();
      if (res2.error || res3?.error) {
        setError("Invalid credentials. Please try again.");
        toast.error("Login failed");
        return;
      }
      cookie.set("token", res2.token, { expires: 30 });
      cookie.set("user", res2.user);
      toast.success("Logged in");
      router.push("/Dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Welcome */}
          <div className="lg:col-span-5">
            <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Member access
            </span>
            <h1 className="mt-3 font-main text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-textgray leading-[1.1]">
              Welcome back to <br className="hidden lg:block" /> Book Odyssey.
            </h1>
            <p className="mt-4 font-MyFont text-base text-gray-600 leading-relaxed max-w-md">
              Sign in to access your cart, wishlist, recent orders, and
              personalised reading recommendations.
            </p>
            <p className="mt-6 font-MyFont text-sm text-gray-500">
              New here?{" "}
              <Link
                href="/Register"
                className="text-textgray font-semibold underline underline-offset-4 hover:text-black transition-colors duration-200"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Form card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-bggray/60 rounded-2xl p-6 md:p-8 lg:p-10"
            >
              <h2 className="font-main text-xl font-semibold text-textgray">
                Sign in
              </h2>
              <p className="mt-1 font-MyFont text-sm text-gray-600">
                Enter your details below.
              </p>

              <div className="mt-6 space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <FiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-10 pr-4 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="login-password"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-10 pr-12 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-textgray transition-colors duration-200 cursor-pointer rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="bg-red-50 text-red-700 border border-red-200 text-sm font-MyFont rounded-md px-3 py-2"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-base rounded-md py-3 hover:bg-black transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                >
                  <FiLogIn size={18} />
                  {loading ? "Signing in" : "Sign in"}
                </button>

                <div className="text-center font-MyFont text-sm text-gray-600 lg:hidden">
                  New here?{" "}
                  <Link
                    href="/Register"
                    className="text-textgray font-semibold underline underline-offset-4"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
