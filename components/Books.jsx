"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { IoIosArrowForward } from "react-icons/io";
const Books = ({ heading, order, title, result }) => {
  const [books, setBooks] = useState([]);

  const queryParams = {
    heading,
    order,
    title,
  };
  useEffect(() => {
    async function fetchBooks() {
      try {
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
  }, [heading]);

  return (
    <div id="books" className="pt-14">
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-main text-2xl font-medium md:text-2xl">
            {title}
          </h2>
          <Link
            className="hidden md:flex items-center font-MyFont font-medium"
            href={{
              pathname: "/SeeAll",
              query: queryParams,
            }}
          >
            See All
            <IoIosArrowForward className="ml-2" />
          </Link>
        </div>

        <Card books={books} />

        <div className="mt-8 flex items-center justify-center md:hidden">
          <Link
            className="flex items-center font-MyFont font-medium"
            href={{
              pathname: "/SeeAll",
              query: queryParams,
            }}
          >
            See All
            <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Books;
