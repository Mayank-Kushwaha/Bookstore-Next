"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTag,
  FiCreditCard,
  FiLock,
} from "react-icons/fi";

const PAYMENT_OPTIONS = [
  {
    value: "Bank",
    label: "UPI / Card / Net Banking",
    description: "Pay securely via Razorpay (GPay, PhonePe, Paytm, UPI, card).",
  },
  {
    value: "Cash",
    label: "Cash on delivery",
    description: "Pay when your order arrives at the doorstep.",
  },
];

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("Bank");
  const [saveInfo, setSaveInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { cartItems, removeFromCart, calculateTotalPrice } = useCart();

  const subtotal = calculateTotalPrice();
  const itemCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const makePayment = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please complete the billing details");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please log in to place an order");
      router.push("/Login");
      return;
    }

    try {
      setLoading(true);
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
      });
      const data = await orderRes.json();
      if (!orderRes.ok || !data?.id) {
        toast.error(data?.message || "Could not start payment. Please try again.");
        return;
      }

      const razorpayKey =
        data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        toast.error(
          "Payment is not configured. Please contact support."
        );
        return;
      }

      if (typeof window === "undefined" || !window.Razorpay) {
        toast.error(
          "Payment library is still loading. Please try again in a moment."
        );
        return;
      }

      const options = {
        key: razorpayKey,
        name,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for your purchase",
        handler: async function (response) {
          const paymentData = {
            name,
            email,
            phone,
            address,
            payment,
            items: cartItems,
            total,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verifyResponse = await fetch("/api/paymentverify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
          });

          const verifyResult = await verifyResponse.json();
          if (verifyResponse.ok && verifyResult?.message === "success") {
            const queryString = new URLSearchParams({
              name,
              email,
              phone,
              address,
              payment,
              total: String(total),
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }).toString();

            toast.success("Payment successful");
            cartItems.forEach((item) => removeFromCart(item.id));
            setName("");
            router.push(`/paymentsuccess?${queryString}`);
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: { name, email, contact: phone },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again or contact support.");
        console.error("Razorpay payment failed:", response.error);
      });
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
      <header className="mb-8">
        <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Checkout
        </span>
        <h1 className="mt-2 font-main text-3xl md:text-4xl font-semibold tracking-tight text-textgray">
          Complete your order
        </h1>
        <p className="mt-1 font-MyFont text-sm text-gray-600">
          Enter your details below and choose a payment method.
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="bg-bggray/60 rounded-2xl py-16 px-6 text-center">
          <h2 className="font-main text-xl text-textgray">
            Your cart is empty
          </h2>
          <p className="mt-1 font-MyFont text-sm text-gray-600">
            Add a book to your cart before checking out.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200"
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            makePayment();
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <section className="bg-bggray/60 rounded-2xl p-6 md:p-7">
              <h2 className="font-main text-lg font-semibold text-textgray">
                Contact
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="chk-name"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={16}
                      aria-hidden="true"
                    />
                    <input
                      id="chk-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-9 pr-4 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="chk-email"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <FiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={16}
                      aria-hidden="true"
                    />
                    <input
                      id="chk-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-9 pr-4 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="chk-phone"
                    className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <FiPhone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={16}
                      aria-hidden="true"
                    />
                    <input
                      id="chk-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 90234 56789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-9 pr-4 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-bggray/60 rounded-2xl p-6 md:p-7">
              <h2 className="font-main text-lg font-semibold text-textgray">
                Shipping address
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="chk-address"
                  className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                >
                  Address
                </label>
                <div className="relative">
                  <FiMapPin
                    className="absolute left-3 top-3 text-gray-500"
                    size={16}
                    aria-hidden="true"
                  />
                  <textarea
                    id="chk-address"
                    rows="4"
                    autoComplete="street-address"
                    placeholder="House / Flat, Street, City, State, ZIP, Country"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-9 pr-4 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray resize-none"
                  />
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4 rounded border-bggray accent-textgray cursor-pointer"
                />
                <span className="font-MyFont text-sm text-gray-600">
                  Save this information for next time
                </span>
              </label>
            </section>

            {/* Payment */}
            <section className="bg-bggray/60 rounded-2xl p-6 md:p-7">
              <h2 className="font-main text-lg font-semibold text-textgray">
                Payment method
              </h2>
              <div
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                role="radiogroup"
                aria-label="Payment method"
              >
                {PAYMENT_OPTIONS.map((opt) => {
                  const active = payment === opt.value;
                  return (
                    <label
                      key={opt.value}
                      htmlFor={`pay-${opt.value}`}
                      className={`block rounded-xl border-2 p-4 cursor-pointer transition-colors duration-200 ${
                        active
                          ? "bg-primary border-textgray"
                          : "bg-primary border-transparent hover:border-textgray/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={`pay-${opt.value}`}
                          type="radio"
                          name="payment"
                          value={opt.value}
                          checked={active}
                          onChange={(e) => setPayment(e.target.value)}
                          className="mt-1 accent-textgray w-4 h-4 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <p className="font-MyFont font-semibold text-sm text-textgray">
                            {opt.label}
                          </p>
                          <p className="font-MyFont text-xs text-gray-600 mt-0.5">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Notes */}
            <section className="bg-bggray/60 rounded-2xl p-6 md:p-7">
              <label
                htmlFor="chk-notes"
                className="font-main text-lg font-semibold text-textgray block"
              >
                Order notes
                <span className="ml-2 font-MyFont text-xs font-medium text-gray-500">
                  Optional
                </span>
              </label>
              <textarea
                id="chk-notes"
                rows="3"
                placeholder="Gift wrap, delivery instructions, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-3 w-full font-MyFont bg-primary border border-transparent rounded-md px-3 py-2.5 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray resize-none"
              />
            </section>

            <Link
              href="/Cart"
              className="inline-flex items-center gap-2 font-MyFont text-sm text-textgray hover:text-black transition-colors duration-200"
            >
              <FiArrowLeft size={16} />
              Return to cart
            </Link>
          </div>

          {/* Right: order summary */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-bggray/60 rounded-2xl p-6 md:p-7">
              <h2 className="font-main text-lg font-semibold text-textgray">
                Order summary
              </h2>
              <p className="font-MyFont text-xs text-gray-500 mt-0.5">
                {itemCount} {itemCount === 1 ? "book" : "books"}
              </p>

              <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="shrink-0 relative w-12 h-16 rounded-md overflow-hidden bg-primary">
                      <Image
                        src={item.image || "/default.jpg"}
                        width={48}
                        height={64}
                        unoptimized
                        alt={item.title || "Book cover"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/default.jpg";
                        }}
                      />
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center bg-textgray text-primary text-[10px] font-bold rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-MyFont text-xs font-semibold text-textgray line-clamp-2"
                        title={item.title}
                      >
                        {item.title}
                      </p>
                      <p className="font-MyFont text-[11px] text-gray-500 mt-0.5">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-MyFont text-xs font-semibold text-textgray whitespace-nowrap">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Coupon */}
              <div className="mt-5">
                <label
                  htmlFor="chk-coupon"
                  className="font-MyFont text-sm font-semibold text-textgray block mb-1.5"
                >
                  Coupon code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FiTag
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={14}
                      aria-hidden="true"
                    />
                    <input
                      id="chk-coupon"
                      type="text"
                      placeholder="ODYSSEY10"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full font-MyFont bg-primary border border-transparent rounded-md pl-8 pr-3 py-2 text-sm text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-primary border border-bggray text-textgray font-MyFont text-sm font-semibold rounded-md px-3.5 py-2 hover:border-textgray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="my-5 border-t border-bggray" />

              <dl className="space-y-2 font-MyFont text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd className="text-textgray">₹{subtotal}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd className="text-textgray">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </dd>
                </div>
              </dl>

              <div className="my-4 border-t border-bggray" />

              <div className="flex justify-between items-baseline">
                <span className="font-MyFont text-sm font-semibold text-textgray">
                  Total
                </span>
                <span className="font-main text-2xl font-semibold text-textgray">
                  ₹{total}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-base rounded-full py-3 hover:bg-black transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
              >
                {loading ? (
                  <>Processing</>
                ) : (
                  <>
                    <FiCreditCard size={18} />
                    Place order · ₹{total}
                  </>
                )}
              </button>

              <p className="mt-3 inline-flex items-center justify-center w-full gap-1.5 font-MyFont text-xs text-gray-500">
                <FiLock size={12} />
                Secured by Razorpay
              </p>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}
