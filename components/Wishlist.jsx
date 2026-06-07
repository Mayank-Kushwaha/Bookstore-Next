"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WIshlistContext";
import { useCart } from "@/context/CartContext";
import { FiArrowLeft, FiTrash2, FiShoppingCart, FiHeart } from "react-icons/fi";

export default function Wishlist() {
  const { WishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleCardClick = (selfLink) => {
    if (selfLink) window.open(selfLink, "_blank", "noopener,noreferrer");
  };

  const moveToCart = (item) => {
    addToCart(
      {
        id: item.id,
        image: item.image,
        title: item.title,
        author: item.author,
        price: item.price,
        preview: item.preview,
        quantity: 1,
      },
      item.id
    );
    removeFromWishlist(item.id);
    toast.success("Moved to cart");
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-main text-3xl md:text-4xl font-semibold tracking-tight text-textgray">
            Your wishlist
          </h1>
          {WishlistItems.length > 0 && (
            <p className="mt-1 font-MyFont text-sm text-gray-600">
              {WishlistItems.length}{" "}
              {WishlistItems.length === 1 ? "book" : "books"} saved for later.
            </p>
          )}
        </div>
        {WishlistItems.length > 0 && (
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-2 font-MyFont text-sm text-textgray hover:text-black transition-colors duration-200"
          >
            <FiArrowLeft size={16} />
            Continue shopping
          </Link>
        )}
      </header>

      {WishlistItems.length === 0 ? (
        <div className="bg-bggray/60 rounded-2xl py-16 px-6 text-center">
          <FiHeart
            size={42}
            className="mx-auto text-gray-400"
            aria-hidden="true"
          />
          <h2 className="mt-4 font-main text-xl text-textgray">
            No books saved yet
          </h2>
          <p className="mt-1 font-MyFont text-sm text-gray-600 max-w-sm mx-auto">
            Tap the heart on any book to keep it here for later.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {WishlistItems.map((item) => (
            <li
              key={item.id}
              className="bg-primary border border-bggray rounded-2xl p-4 flex gap-4"
            >
              <button
                type="button"
                onClick={() => handleCardClick(item.preview)}
                aria-label={`Preview ${item.title}`}
                className="shrink-0 block w-24 aspect-[3/4] bg-bggray rounded-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
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
                <h3
                  className="font-MyFont text-sm font-semibold text-textgray line-clamp-2"
                  title={item.title}
                >
                  {item.title}
                </h3>
                <p className="mt-0.5 font-MyFont text-xs text-gray-500 line-clamp-1">
                  {Array.isArray(item.author)
                    ? item.author.join(", ")
                    : item.author || "Unknown author"}
                </p>
                <span className="mt-2 font-MyFont text-sm font-semibold text-textgray">
                  ₹{item.price}
                </span>

                <div className="mt-auto pt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveToCart(item)}
                    className="inline-flex items-center gap-1.5 bg-textgray text-primary font-MyFont text-xs font-semibold px-3 py-2 rounded-full hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                  >
                    <FiShoppingCart size={14} />
                    Move to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast.success("Removed from wishlist");
                    }}
                    aria-label={`Remove ${item.title} from wishlist`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-red-600 hover:bg-bggray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {WishlistItems.length > 0 && (
        <Link
          href="/"
          className="mt-8 inline-flex md:hidden items-center gap-2 font-MyFont text-sm text-textgray hover:text-black transition-colors duration-200"
        >
          <FiArrowLeft size={16} />
          Continue shopping
        </Link>
      )}
    </div>
  );
}
