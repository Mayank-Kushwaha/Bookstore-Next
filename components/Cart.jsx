"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

function QuantityStepper({ qty, onDec, onInc, label }) {
  return (
    <div
      className="inline-flex items-center bg-bggray rounded-full p-1"
      role="group"
      aria-label={label || "Quantity"}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        className="w-8 h-8 inline-flex items-center justify-center rounded-full text-textgray hover:bg-primary transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
      >
        <FiMinus size={14} />
      </button>
      <span
        className="min-w-[28px] text-center font-MyFont text-sm font-semibold text-textgray select-none"
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase quantity"
        className="w-8 h-8 inline-flex items-center justify-center rounded-full text-textgray hover:bg-primary transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice,
  } = useCart();

  const handleCardClick = (selfLink) => {
    if (selfLink) window.open(selfLink, "_blank", "noopener,noreferrer");
  };

  const subtotal = calculateTotalPrice();
  const itemCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="font-main text-3xl md:text-4xl font-semibold tracking-tight text-textgray">
          Your cart
        </h1>
        {cartItems.length > 0 && (
          <p className="mt-1 font-MyFont text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "book" : "books"} ready to ship.
          </p>
        )}
      </header>

      {cartItems.length === 0 ? (
        <div className="bg-bggray/60 rounded-2xl py-16 px-6 text-center">
          <FiShoppingBag
            size={42}
            className="mx-auto text-gray-400"
            aria-hidden="true"
          />
          <h2 className="mt-4 font-main text-xl text-textgray">
            Your cart is empty
          </h2>
          <p className="mt-1 font-MyFont text-sm text-gray-600 max-w-sm mx-auto">
            Find your next read from our curated collections.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Line items */}
          <div className="lg:col-span-2">
            <ul className="divide-y divide-bggray">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-5 flex gap-4 sm:gap-6"
                >
                  <button
                    type="button"
                    onClick={() => handleCardClick(item.preview)}
                    aria-label={`Preview ${item.title}`}
                    className="shrink-0 block w-20 sm:w-24 aspect-[3/4] bg-bggray rounded-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                  >
                    <Image
                      src={item.image || "/default.jpg"}
                      width={120}
                      height={160}
                      unoptimized
                      alt={item.title || "Book cover"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default.jpg";
                      }}
                    />
                  </button>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className="font-MyFont text-sm sm:text-base font-semibold text-textgray line-clamp-2"
                          title={item.title}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-0.5 font-MyFont text-xs sm:text-sm text-gray-500 line-clamp-1">
                          {Array.isArray(item.author)
                            ? item.author.join(", ")
                            : item.author || "Unknown author"}
                        </p>
                      </div>
                      <span className="font-MyFont text-sm sm:text-base font-semibold text-textgray whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between gap-3 flex-wrap">
                      <QuantityStepper
                        qty={item.quantity}
                        onDec={() => decrementQuantity(item.id)}
                        onInc={() => incrementQuantity(item.id)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success("Removed from cart");
                        }}
                        className="inline-flex items-center gap-1.5 font-MyFont text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                      >
                        <FiTrash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 font-MyFont text-sm text-textgray hover:text-black transition-colors duration-200"
            >
              <FiArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1 mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-24 bg-bggray/60 rounded-2xl p-6 md:p-7">
              <h2 className="font-main text-lg font-semibold text-textgray">
                Order summary
              </h2>

              <dl className="mt-4 space-y-2 font-MyFont text-sm">
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

              <label
                htmlFor="order-notes"
                className="block mt-5 font-MyFont text-sm font-semibold text-textgray"
              >
                Order notes (optional)
              </label>
              <textarea
                id="order-notes"
                rows="3"
                placeholder="Gift wrap, delivery instructions, etc."
                className="mt-1.5 block w-full bg-primary border border-transparent rounded-md font-MyFont text-sm text-textgray placeholder:text-gray-500 px-3 py-2 outline-none transition-colors duration-200 focus:border-textgray resize-none"
              />

              <Link href="/Checkout" className="block mt-5">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-base rounded-full py-3 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                >
                  Checkout
                </button>
              </Link>

              <p className="mt-3 font-MyFont text-xs text-gray-500 text-center">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
