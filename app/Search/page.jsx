"use client";
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import Card from "@/components/Card";
import { MutatingDots } from "react-loader-spinner";
import Link from "next/link";


export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const result = 40;
  const order = "relevance";
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      setloading(true);
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=${order}&maxResults=${result}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log(data);

      setBooks(data.items || []);
      setloading(false);
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
      <div className="font-MyFont flex justify-between">
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          className="items-center w-full border-2 rounded-lg py-2 px-4"
          onKeyDown={handleSearchKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex  border-2 border-black rounded-full gap-4 px-4 py-2 ml-2 "
         onClick={() => {
          fetchBooks();
        }}>
        <div className="font-semibold ">Search</div>
        <BiSearch
          className="icon-s mt-2 "
         
        />
        </div>
      </div>
      <div className="flex float-right underline mt-2 mr-8">
        <Link
          className="flex items-center font-MyFont font-medium"
          href={{
            pathname: "/AdvanceSearch",
          }}
        >
          Advanced Search options
        </Link>
      </div>
      <div className="flex justify-center">
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
}
