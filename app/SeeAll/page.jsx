"use client";
import React from "react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SeeAll = () => {
  const searchParams = useSearchParams();
  const result = 40;
  const heading = searchParams.get("heading");
  const order = searchParams.get("order");
  const title = searchParams.get("title");

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
      <Card books={books} />
    </div>
  );
};

export default SeeAll;
