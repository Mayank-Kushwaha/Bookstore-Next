"use client";
import React, { useState } from "react";

import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WIshlistContext";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

function Card({ books }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist } = useWishlist();
  const [liked, setliked] = useState([]);
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
              unoptimized = {true} // {false} | {true}
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
                  ? book.saleInfo.listPrice.amount
                  : 299}
              </span>
            </div>
            <div className="flex w-max justify-between ">
              <div className="cursor-pointer pt-4 px-1">
                <button
                  onClick={() => {
                    const bookDetails = {
                      id: book.id,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors, // Assuming authors is an array
                      price: book.saleInfo?.listPrice?.amount || 299,
                      image: book.volumeInfo.imageLinks?.thumbnail,
                      preview: book.volumeInfo.previewLink,
                      quantity: 1, // Price or a default value
                      // Add more book details as needed
                    };
                    addToCart(bookDetails); // Pass the book details to addToCart
                    console.log("booksdetail", bookDetails);
                    console.log("preview", book.preview);

                    toast.success("Book Added To Cart successfully");
                  }}
                  className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                >
                  Add To Cart
                </button>
              </div>

              <div className="flex cursor-pointer w-max px-1 pt-2">
                <button
                  onClick={() => {
                    const bookDetails = {
                      id: book.id,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors, // Assuming authors is an array
                      price: book.saleInfo?.listPrice?.amount || 299,
                      image: book.volumeInfo.imageLinks?.thumbnail,
                      preview: book.volumeInfo.previewLink,
                      quantity: 1, // Price or a default value
                      // Add more book details as needed
                    };
                    if (liked.includes(book.id)) {
                      setliked((prev) => prev.filter((id) => id !== book.id));
                      removeFromWishlist(index);
                      toast.error("Book Removed from Wishlist successfully");
                    } else {
                      setliked((prev) => [...prev, book.id]);
                      addToWishlist(bookDetails); 
                      toast.success("Book Added To Wishlist successfully");
                    }
                   
                
                    // console.log("booksdetail", bookDetails);
                    // console.log("preview", book.volumeInfo.previewLink);
                    // console.log("preview", book.volumeInfo.authors);
                    // toast.success("Book Added To Wishlist successfully");
                  }}
                  className="outline-btn-color cursor-pointer basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  {liked.includes(book.id) ? (
                    <FcLike fontSize="1.75rem" />
                  ) : (
                    <FcLikePlaceholder fontSize="1.75rem" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
