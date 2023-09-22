"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams} from 'next/navigation'
import { FaRegHeart } from "react-icons/fa";

const SeeAll = () => {

  const handleCardClick = (selfLink) => {
    window.open(selfLink, '_blank');
};
  const searchParams = useSearchParams()
  const result = 40 ;
   const heading = searchParams.get('heading')
  const order = searchParams.get('order')
   const title = searchParams.get('title')

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Replace this with your API call to fetch books based on heading, order, and result
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${heading}&orderBy=${order}&maxResults=${result}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        setBooks(data.items || []);
      } catch (error) {
        console.error("An error occurred:", error);
        setBooks([]);
      }
    }
fetchBooks();
   
  }, []);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 flex justify-center font-semibold mr-auto md:text-2xl ">
        {" "}
        {title}
      </h1>
      <div  className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {books.map((book, index) => (
            <div
              key={index}
              
              className="flex flex-col justify-between rounded border-2 border-bggray align-baseline last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
            >
              <div onClick={() => handleCardClick(book.volumeInfo.previewLink)} className="p-4 sm:p-8 md:p-4 lg:p-8 cursor-pointer bg-bggray">
                <Image
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  priority="high"
                  className="inline-block align-baseline"
                  width={500}
                  height={500}
                  alt="Picture of the author"
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
                      ? book.saleInfo.listPrice.amount <= 99
                        ? (book.saleInfo.listPrice.amount * 10).toFixed(3)
                        : book.saleInfo.listPrice.amount
                      : Math.floor(Math.random() * (300 - 100 + 1)) + 100}
                  </span>
                </div>
                <div className="flex cursor-pointer gap-x-2">
                  <Link href="/Cart"
                    
                    className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                  >
                    Add To Cart
                  </Link>
                  <Link href="/Wishlist"
                    
                    className="outline-btn-color cursor-pointer basis-1/4 rounded p-1"
                    title="Add To Wishlist"
                  >
                    <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default SeeAll;
