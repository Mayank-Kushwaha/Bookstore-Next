"use client";
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import Card from "@/components/Card";
import { MutatingDots } from "react-loader-spinner";

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
          className="items-center w-full border-2 py-2 px-4"
          onKeyDown={handleSearchKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BiSearch
          className="icon-s mx-2 md:mx-8 mt-3  "
          onClick={() => {
            fetchBooks();
          }}
        />
      </div>
      <div className="flex justify-center" >
      {loading ? (
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
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
