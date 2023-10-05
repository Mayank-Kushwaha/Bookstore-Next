"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FcLikePlaceholder } from "react-icons/fc";

function Card({ books }) {
  const handleCardClick = (selfLink) => {
    window.open(selfLink, "_blank");
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded border-2 border-bggray align-baseline last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
        >
          <div
            onClick={() => handleCardClick(book.volumeInfo.previewLink)}
            className="p-4 sm:p-8 md:p-4 lg:p-8 cursor-pointer bg-bggray"
          >
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || "/default.jpg"}
              priority="high"
              className="inline-block align-baseline"
              width={500}
              height={500}
              alt="Picture of the author"
              onError={(e) => {
                e.target.src = "/default.jpg";
              }}
            />
          </div>
          <div className="content px-4 py-4 flex flex-col justify-between   ">
            <div className="mb-2 md:line-clamp-1">
              <h3 className="text-base font-MyFont">{book.volumeInfo.title}</h3>
            </div>
            <div className="price mb-1 font-MyFont font-medium">
              <span>Price: </span>
              <span>
                {book.saleInfo && book.saleInfo.listPrice
                  ? book.saleInfo.listPrice.amount <= 9
                    ? (book.saleInfo.listPrice.amount * 10).toFixed(2)
                    : book.saleInfo.listPrice.amount
                  : Math.floor(Math.random() * (300 - 100 + 1)) + 100}
              </span>
            </div>
            <div className="flex w-max justify-between ">
              <div className="cursor-pointer pt-4 px-1">
                <Link
                  onClick={() => {
                    toast.success("Book Added To Cart successfully");
                  }}
                  href={{
                    pathname: "/Cart", // The path to your cart.js page
                    query: {
                      // Pass the book details as query parameters
                      bookId: book.id,
                      bookImage: book.volumeInfo.imageLinks?.thumbnail,
                      bookTitle: book.volumeInfo.title,
                      bookAuthor: book.volumeInfo.authors, // Assuming authors is an array
                      bookPrice:
                        book.saleInfo?.listPrice?.amount ||
                        Math.floor(Math.random() * (300 - 100 + 1)) + 100, // Price or a default value
                      // Add more book details as needed
                    },
                  }}
                  className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                >
                  Add To Cart
                </Link>
              </div>

              <div className="flex cursor-pointer w-max px-1 pt-2">
                <Link
                  onClick={() => {
                    toast.success("Book Added To Wishlist successfully");
                  }}
                  href={{
                    pathname: "/Wishlist", // The path to your cart.js page
                    query: {
                      // Pass the book details as query parameters
                      bookId: book.id,
                      bookImage: book.volumeInfo.imageLinks?.thumbnail,
                      bookTitle: book.volumeInfo.title,
                      bookAuthor: book.volumeInfo.authors, // Assuming authors is an array
                      bookPrice:
                        book.saleInfo?.listPrice?.amount ||
                        Math.floor(Math.random() * (300 - 100 + 1)) + 100, // Price or a default value
                      // Add more book details as needed
                    },
                  }}
                  className="outline-btn-color cursor-pointer basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FcLikePlaceholder fontSize="1.75rem" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
