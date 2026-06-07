"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WIshlistContext";
import { FiHeart, FiShoppingCart, FiBookOpen } from "react-icons/fi";

function Card({ books, hideOnImageError = false, maxVisible }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, WishlistItems } = useWishlist();
  const [liked, setLiked] = useState([]);
  const [failedIds, setFailedIds] = useState(() => new Set());

  useEffect(() => {
    if (WishlistItems && WishlistItems.length > 0) {
      setLiked(WishlistItems.map((item) => item.id));
    } else {
      setLiked([]);
    }
  }, [WishlistItems]);

  const handleCardClick = (selfLink) => {
    if (selfLink) window.open(selfLink, "_blank", "noopener,noreferrer");
  };

  const markFailed = (id) => {
    setFailedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  let visibleBooks = hideOnImageError
    ? books.filter(
        (b) => b.volumeInfo?.imageLinks?.thumbnail && !failedIds.has(b.id)
      )
    : books;
  if (hideOnImageError && typeof maxVisible === "number") {
    visibleBooks = visibleBooks.slice(0, maxVisible);
  }

  const buildBookPayload = (book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors,
    price: book.saleInfo?.listPrice?.amount || 299,
    image: book.volumeInfo.imageLinks?.thumbnail,
    preview: book.volumeInfo.previewLink,
    quantity: 1,
  });

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 lg:grid-cols-5 lg:gap-x-6">
      {visibleBooks.map((book) => {
        const isLiked = liked.includes(book.id);
        const author = Array.isArray(book.volumeInfo.authors)
          ? book.volumeInfo.authors.join(", ")
          : book.volumeInfo.authors || "Unknown author";
        const price =
          book.saleInfo && book.saleInfo.listPrice
            ? book.saleInfo.listPrice.amount
            : 299;
        const readLabel =
          book.readabilityLabel === "Read Preview" ? "Preview" : "Read";

        return (
          <article key={book.id} className="group flex flex-col">
            {/* Cover frame */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleCardClick(book.volumeInfo.previewLink)}
                aria-label={`Open ${book.volumeInfo.title}`}
                className="relative block w-full aspect-[3/4] overflow-hidden rounded-lg bg-bggray focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray focus-visible:ring-offset-2"
              >
                {book.readOnline && (
                  <span className="absolute top-2 left-2 z-10 bg-green-600 text-white text-[10px] font-MyFont font-semibold tracking-wide uppercase px-2 py-1 rounded">
                    {book.readabilityLabel || "Read Online"}
                  </span>
                )}
                <Image
                  src={book.volumeInfo.imageLinks?.thumbnail || "/default.jpg"}
                  unoptimized
                  priority={false}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  alt={book.volumeInfo.title || "Book cover"}
                  onError={(e) => {
                    if (hideOnImageError) {
                      markFailed(book.id);
                    } else {
                      e.target.src = "/default.jpg";
                    }
                  }}
                />
              </button>

              {/* Wishlist icon overlay */}
              <button
                type="button"
                aria-label={
                  isLiked ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={isLiked}
                onClick={() => {
                  const payload = buildBookPayload(book);
                  if (isLiked) {
                    removeFromWishlist(book.id);
                    setLiked(liked.filter((id) => id !== book.id));
                    toast.success("Removed from wishlist");
                  } else {
                    addToWishlist(payload);
                    setLiked([...liked, book.id]);
                    toast.success("Added to wishlist");
                  }
                }}
                className={`absolute top-2 right-2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/90 backdrop-blur-sm shadow-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray ${
                  isLiked
                    ? "text-red-500"
                    : "text-textgray hover:text-red-500"
                }`}
              >
                <FiHeart
                  size={18}
                  className={isLiked ? "fill-current" : ""}
                />
              </button>

              {/* Read button - only when readable, slides up from bottom on hover */}
              {book.readOnline && (
                <button
                  type="button"
                  onClick={() => handleCardClick(book.volumeInfo.previewLink)}
                  className="absolute left-2 right-2 bottom-2 inline-flex items-center justify-center gap-1.5 bg-textgray/95 text-primary text-xs font-MyFont font-semibold px-3 py-2 rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-textgray focus-visible:ring-offset-2"
                  title={
                    book.readabilityLabel === "Read Preview"
                      ? "Read a preview"
                      : "Read this book online"
                  }
                >
                  <FiBookOpen size={14} />
                  {readLabel}
                </button>
              )}
            </div>

            {/* Meta */}
            <div className="mt-3 flex flex-col gap-0.5">
              <h3
                className="font-MyFont text-sm font-semibold text-textgray line-clamp-2 leading-snug"
                title={book.volumeInfo.title}
              >
                {book.volumeInfo.title}
              </h3>
              <p className="font-MyFont text-xs text-gray-500 line-clamp-1">
                {author}
              </p>
            </div>

            {/* Price + add */}
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="font-MyFont text-sm font-semibold text-textgray">
                ₹{price}
              </span>
              <button
                type="button"
                onClick={() => {
                  addToCart(buildBookPayload(book), book.id);
                  toast.success("Added to cart");
                }}
                className="inline-flex items-center gap-1.5 bg-textgray text-primary font-MyFont text-xs font-semibold px-3 py-2 rounded-full hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                aria-label={`Add ${book.volumeInfo.title} to cart`}
              >
                <FiShoppingCart size={14} />
                Add
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Card;
