"use client";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import React, { useState, useMemo } from "react";
import Card from "@/components/Card";
import Link from "next/link";

const QUICK_CATEGORIES = [
  "Fiction",
  "Mystery",
  "History",
  "Business",
  "Fantasy",
  "Biography",
  "Science",
  "Romance",
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
];

function CardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded border-2 border-bggray animate-pulse">
      <div className="bg-bggray aspect-[3/4] w-full" />
      <div className="px-4 py-4 space-y-3">
        <div className="h-4 w-3/4 bg-bggray rounded" />
        <div className="h-4 w-1/3 bg-bggray rounded" />
        <div className="flex gap-2 pt-2">
          <div className="h-9 w-24 bg-bggray rounded" />
          <div className="h-9 w-9 bg-bggray rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [order, setOrder] = useState("relevance");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [books, setBooks] = useState([]);
  const result = 40;

  const fetchBooks = async (q, sort = order) => {
    const query = (q ?? searchQuery).trim();
    if (!query) return;
    setActiveQuery(query);
    try {
      setLoading(true);
      setHasSearched(true);
      const apiUrl = `/api/books?q=${encodeURIComponent(
        query
      )}&orderBy=${encodeURIComponent(sort)}&maxResults=${result}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`/api/books responded ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("An error occurred:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchBooks();
    }
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    fetchBooks(category);
  };

  const handleSortChange = (value) => {
    setOrder(value);
    if (activeQuery) fetchBooks(activeQuery, value);
  };

  const resultCount = useMemo(() => books.length, [books]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 md:px-8">
      {/* Hero / Search header */}
      <header className="text-center mb-8 md:mb-10">
        <h1 className="font-main text-3xl md:text-4xl font-medium tracking-tight text-textgray">
          Find your next read
        </h1>
        <p className="font-MyFont text-sm md:text-base text-gray-600 mt-2">
          Search millions of titles by name, author, or topic.
        </p>
      </header>

      {/* Search bar */}
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          fetchBooks();
        }}
        className="mx-auto max-w-3xl"
      >
        <label htmlFor="book-search" className="sr-only">
          Search for books
        </label>
        <div className="group relative flex items-center bg-bggray border-2 border-transparent rounded-full transition-colors duration-200 focus-within:border-textgray focus-within:bg-primary">
          <BiSearch
            className="absolute left-4 text-gray-500 pointer-events-none"
            size={22}
            aria-hidden="true"
          />
          <input
            id="book-search"
            type="search"
            placeholder="Try “Sherlock Holmes”, “Atomic Habits”…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full font-MyFont bg-transparent outline-none py-3 md:py-4 pl-12 pr-12 md:pr-32 text-base placeholder:text-gray-500"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 md:right-28 p-2 text-gray-500 hover:text-textgray transition-colors duration-200 cursor-pointer"
            >
              <IoIosClose size={22} />
            </button>
          )}
          <button
            type="submit"
            className="hidden md:flex items-center gap-2 absolute right-2 bg-textgray text-primary font-MyFont font-semibold rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
          >
            Search
            <IoIosArrowForward />
          </button>
        </div>

        {/* Mobile submit button */}
        <button
          type="submit"
          className="md:hidden mt-3 w-full bg-textgray text-primary font-MyFont font-semibold rounded-full py-3 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
        >
          Search
        </button>

        {/* Sub-controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <Link
            href={{ pathname: "/AdvanceSearch" }}
            className="inline-flex items-center gap-1.5 font-MyFont text-sm text-textgray underline underline-offset-4 hover:text-black transition-colors duration-200"
          >
            <HiOutlineAdjustmentsHorizontal size={18} />
            Advanced Search
          </Link>

          <div
            className="inline-flex items-center bg-bggray rounded-full p-1"
            role="group"
            aria-label="Sort results"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSortChange(opt.value)}
                aria-pressed={order === opt.value}
                className={`font-MyFont text-sm px-4 py-1.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray ${
                  order === opt.value
                    ? "bg-textgray text-primary"
                    : "text-textgray hover:bg-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Quick category chips - only show before first search */}
      {!hasSearched && (
        <section aria-labelledby="popular-heading" className="mt-10">
          <h2
            id="popular-heading"
            className="font-main text-lg md:text-xl text-textgray text-center mb-4"
          >
            Popular categories
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="font-MyFont text-sm md:text-base bg-white border-2 border-bggray text-textgray rounded-full px-4 py-2 hover:border-textgray hover:bg-bggray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Results header */}
      {hasSearched && !loading && (
        <div className="mt-8 mb-2 flex items-baseline justify-between">
          <p className="font-MyFont text-sm md:text-base text-textgray">
            {resultCount > 0 ? (
              <>
                <span className="font-semibold">{resultCount}</span> result
                {resultCount === 1 ? "" : "s"} for{" "}
                <span className="font-main italic">“{activeQuery}”</span>
              </>
            ) : (
              <>
                No results for{" "}
                <span className="font-main italic">“{activeQuery}”</span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Results grid / states */}
      <div className="mt-2">
        {loading ? (
          <div
            className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            aria-live="polite"
            aria-busy="true"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : hasSearched && books.length === 0 ? (
          <div className="mt-10 text-center px-4">
            <h3 className="font-main text-xl text-textgray">
              We couldn’t find anything
            </h3>
            <p className="font-MyFont text-sm text-gray-600 mt-2 max-w-md mx-auto">
              Try different keywords, check your spelling, or use the advanced
              search to narrow by author or ISBN.
            </p>
            <Link
              href={{ pathname: "/AdvanceSearch" }}
              className="inline-block mt-5 bg-textgray text-primary font-MyFont font-semibold rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200"
            >
              Try Advanced Search
            </Link>
          </div>
        ) : (
          <Card books={books} />
        )}
      </div>
    </div>
  );
}
