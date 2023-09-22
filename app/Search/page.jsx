'use client'
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const result = 40;
  const order = "newest";
  const [books, setBooks] = useState([]);

  const handleCardClick = (selfLink) => {
    window.open(selfLink, "_blank");
  };

  const fetchBooks = async () => {
    try {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=${order}&maxResults=${result}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log(data);

      setBooks(data.items || []);
    } catch (error) {
      console.error("An error occurred:", error);
      setBooks([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    event.preventdefault;
    if (event.key === "Enter") {
      fetchBooks();
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8 ">
      <div className="font-MyFont search flex divide-x justify-between items-center text-xl mr-auto md:text-2xl my-1 w-full md:pr-10 rounded  border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent">
        <input
          type="text"
          placeholder="  Search Here"
          value={searchQuery}
          className="w-full border-0"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <BiSearch onClick={() => {fetchBooks();}}/>
      </div>
     
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(book.volumeInfo.previewLink)}
            className="flex flex-col justify-between rounded border-2 cursor-pointer border-bggray align-baseline last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
          >
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail || "/default.png"}
                priority="high"
                className="inline-block align-baseline"
                width={500}
                height={500}
                alt="Picture of the author"
                onError={(e) => {
                  e.target.src = "/default.png";
                }}
              />
            </div>
            <div className="content px-4 py-4 flex flex-col justify-between   ">
              <div className="mb-2 md:line-clamp-1">
                <h3 className="text-base font-MyFont">
                  {book.volumeInfo.title}
                </h3>
              </div>
              <div className="price mb-1 font-MyFont font-medium">
                <span>Price: </span>
                <span>
                  {book.saleInfo && book.saleInfo.listPrice
                    ? book.saleInfo.listPrice.amount <= 10
                      ? (book.saleInfo.listPrice.amount * 100).toFixed(2)
                      : book.saleInfo.listPrice.amount
                    : Math.floor(Math.random() * (300 - 100 + 1)) + 100}
                </span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
