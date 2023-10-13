"use client";
import React from "react";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MutatingDots } from "react-loader-spinner";

const SeeAll = () => {
  const searchParams = useSearchParams();
  const result = 40;
  const heading = searchParams.get("heading");
  const order = searchParams.get("order");
  const title = searchParams.get("title");
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setloading(true);
        // Replace this with your API call to fetch books based on heading, order, and result
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${heading}&orderBy=${order}&maxResults=${result}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        setBooks(data.items || []);
        setloading(false);
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
      <div className="flex justify-center" >
      {loading ? (
        <MutatingDots
          height="100"
          width="100"
          color="#ff0000"
          secondaryColor="#ff0000"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <Card books={books} />
      )}
      </div>
    </div>
  );
};

export default SeeAll;
