"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { MutatingDots } from "react-loader-spinner";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function AdvanceSearch() {
  const [isbnNumber, setIsbnNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [oclcNumber, setOclcNumber] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    filtering: "",
    printType: "",
    projection: "",
    sorting: "",
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let apiUrl = "https://www.googleapis.com/books/v1/volumes?maxResults=40";
      if (searchQuery) apiUrl += `&q=${searchQuery}`;
      if (isbnNumber) apiUrl += `&q=isbn:${isbnNumber}`;
      if (author) apiUrl += `&q=inauthor:${author}`;
      if (publisher) apiUrl += `&q=inpublisher:${publisher}`;
      if (category) apiUrl += `&q=subject:${category}`;
      if (oclcNumber) apiUrl += `&q=oclc:${oclcNumber}`;
      if (filters.sorting) apiUrl += `&orderBy=${filters.sorting}`;
      if (filters.filtering) apiUrl += `&filter=${filters.filtering}`;
      if (filters.printType) apiUrl += `&printType=${filters.printType}`;
      if (filters.projection) apiUrl += `&projection=${filters.projection}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBooks(data.items || []);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setBooks([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchBooks();
    }
  };

  const handleFilter = () => {
    setModal(!modal);
    fetchBooks();
  };

  const applyFilter = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8 ">
      <div className="font-MyFont flex md:flex-nowrap flex-wrap w-[100%] justify-between font-bold">
        <div className="flex md:hidden">
          Enter any one field value you want to search for and hit the search
          button
        </div>
        <div className=" flex md:hidden w-[100%] h-[1.5px] my-2 bg-black"></div>

        <div className="mt-4 md:mt-0 flex justify-start items-center gap-4 ">
          <label>Book Title</label>
          <input
            type="text"
            placeholder="Enter Book Title"
            value={searchQuery}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden md:flex text-bold mx-4 my-2">OR</div>
        <div className="mt-4 md:mt-0 flex justify-start items-center gap-4 ">
          <label>ISBN Number</label>
          <input
            type="text"
            placeholder="Enter Book ISBN number"
            value={isbnNumber}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setIsbnNumber(e.target.value)}
          />
        </div>
        <div className="hidden md:flex text-bold mx-4 my-2">OR</div>
        <div className="mt-4 md:mt-0 flex justify-start items-center gap-4">
          <label>Book Author</label>
          <input
            type="text"
            placeholder="Enter Book Author"
            value={author}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>
      <div className=" hidden md:flex w-[100%] h-[1.5px] my-2 bg-black"></div>
      <div className="font-MyFont flex md:flex-nowrap flex-wrap justify-between font-bold ">
        <div className="mt-4 md:mt-0 hidden md:flex justify-start items-center gap-4">
          <label>Book publisher</label>
          <input
            type="text"
            placeholder="Enter Book Publisher"
            value={publisher}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="hidden md:flex text-bold mx-4 my-2">OR</div>
        <div className="mt-4 md:mt-0 hidden md:flex justify-start items-center gap-4">
          <label>Book Category</label>
          <input
            type="text"
            placeholder="Enter Book category"
            value={category}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="hidden md:flex text-bold mx-4 my-2">OR</div>
        <div className="mt-4 md:mt-0 hidden md:flex justify-start items-center gap-4">
          <label>Book oclc Number</label>
          <input
            type="text"
            placeholder="Enter Book oclc Number"
            value={oclcNumber}
            className="items-center border-2 py-2 px-4 w-[100%]"
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setOclcNumber(e.target.value)}
          />
        </div>
       
        <div className="flex  border-2 border-black rounded-full gap-4 px-4 py-2 m-4"
         onClick={() => {
          fetchBooks();
        }}>
        <div className="font-semibold ">Search</div>
        <BiSearch
          className="icon-s mt-2 "
         
        />
        </div>
        
      </div>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center font-MyFont font-medium underline mt-4 cursor-pointer"
          onClick={handleFilter}
        >
          Extra Filters
        </div>
        <div className="flex float-right underline mt-2 mr-8">
          <Link
            className="flex items-center font-MyFont font-medium"
            href={{
              pathname: "/Search",
            }}
          >
            Normal Search options
          </Link>
        </div>
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
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full md:max-w-md">
            <h2 className="text-lg text-center font-semibold mb-4">
              Extra Filters
            </h2>
            {/* Filtering */}
            <div className="mb-4">
              <h3 className=" font-bold mb-2">Filtering</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "partial",
                  "full",
                  "free-ebooks",
                  "paid-ebooks",
                  "ebooks",
                ].map((value, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      filters.filtering === value
                        ? "border-2 border-black rounded-lg px-2 py-1 font-bold"
                        : "btn-secondary"
                    } `}
                    onClick={() => applyFilter("filtering", value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <hr className="my-4" />
            {/* Print Type */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Print Type</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "books", "magazines"].map((value, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      filters.printType === value
                        ? "border-2 border-black rounded-lg px-2 py-1 font-bold"
                        : "btn-secondary"
                    }`}
                    onClick={() => applyFilter("printType", value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <hr className="my-4" />

            {/* Projection */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Projection</h3>
              <div className="flex flex-wrap gap-2">
                {["full", "lite"].map((value, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      filters.projection === value
                        ? "border-2 border-black rounded-lg px-2 py-1 font-bold"
                        : "btn-secondary"
                    } `}
                    onClick={() => applyFilter("projection", value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <hr className="my-4" />

            {/* Sorting */}
            <div>
              <h3 className="font-bold mb-2">Sorting</h3>
              <div className="flex flex-wrap gap-2">
                {["relevance", "newest"].map((value, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      filters.sorting === value
                        ? "border-2 border-black rounded-lg px-2 py-1 font-bold"
                        : "btn-secondary"
                    } `}
                    onClick={() => applyFilter("sorting", value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <hr className="my-4" />
            <button
              className="btn btn-primary mt-4 w-full border-2 border-black rounded-lg px-2 py-1 font-bold"
              onClick={handleFilter}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      {/* Search Results */}
    </div>
  );
}
