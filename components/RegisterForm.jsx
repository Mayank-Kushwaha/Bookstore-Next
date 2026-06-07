"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
} from "react-icons/fi";

function passwordStrength(pw) {
  if (!pw) return { score: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too short", "Weak", "Okay", "Strong", "Excellent"];
  return { score, label: labels[score] };
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const strength = useMemo(() => passwordStrength(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms & Privacy policy to continue.");
      return;
    }

    try {
      setLoading(true);
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("An account with this email already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        e.target.reset();
        toast.success("Account created. Please sign in.");
        router.push("/Login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
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
              Create account
            </span>
            <h1 className="mt-3 font-main text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-textgray leading-[1.1]">
              Start your reading journey.
            </h1>
            <p className="mt-4 font-MyFont text-base text-gray-600 leading-relaxed max-w-md">
              Create a free Book Odyssey account to save your wishlist, track
              orders, and receive curated recommendations.
            </p>

            <ul className="mt-6 space-y-2.5 font-MyFont text-sm text-gray-600 max-w-md">
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textgray shrink-0"
                />
                Fast checkout with saved addresses.
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textgray shrink-0"
                />
                Wishlist that syncs across devices.
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-textgray shrink-0"
                />
                Order tracking and invoice downloads.
              </li>
            </ul>

            <p className="mt-6 font-MyFont text-sm text-gray-500">
              Already a member?{" "}
              <Link
                href="/Login"
                className="text-textgray font-semibold underline underline-offset-4 hover:text-black transition-colors duration-200"
              >
                Sign in
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
                Create your account
              </h2>
              <p className="mt-1 font-MyFont text-sm text-gray-600">
                Takes less than a minute.
              </p>

              <div className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="reg-name"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      id="reg-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-10 pr-4 py-3 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="reg-email"
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
                      id="reg-email"
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
                    htmlFor="reg-password"
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
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
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

                  {/* Strength meter */}
                  {password && (
                    <div className="mt-2 flex items-center gap-2" aria-live="polite">
                      <div className="flex-1 flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                              i < strength.score
                                ? strength.score >= 3
                                  ? "bg-green-600"
                                  : strength.score === 2
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                                : "bg-bggray"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-MyFont text-xs text-gray-600 min-w-[64px] text-right">
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-bggray accent-textgray cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                  />
                  <span className="font-MyFont text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/Terms"
                      className="text-textgray font-semibold underline underline-offset-4"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/Policy"
                      className="text-textgray font-semibold underline underline-offset-4"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

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
                  <FiUserPlus size={18} />
                  {loading ? "Creating account" : "Create account"}
                </button>

                <div className="text-center font-MyFont text-sm text-gray-600 lg:hidden">
                  Already a member?{" "}
                  <Link
                    href="/Login"
                    className="text-textgray font-semibold underline underline-offset-4"
                  >
                    Sign in
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
