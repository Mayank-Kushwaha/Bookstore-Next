"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { FiArrowRight } from "react-icons/fi";

const Books = ({ heading, order, title, result }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = { heading, order, title };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchBooks() {
      try {
        setLoading(true);
        const fetchCount = Math.min(Number(result) * 3 || 15, 40);
        const apiUrl = `/api/books?mode=subject&subject=${encodeURIComponent(
          heading
        )}&orderBy=${encodeURIComponent(order)}&maxResults=${fetchCount}&requireCover=1`;
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`/api/books responded ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("An error occurred:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    return () => controller.abort();
  }, [heading, order, result]);

  const visibleCount = Number(result) || 5;

  return (
    <section id="books" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="font-main text-2xl md:text-[28px] font-semibold tracking-tight text-textgray">
              {title}
            </h2>
            <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />
          </div>
          <Link
            href={{ pathname: "/SeeAll", query: queryParams }}
            className="inline-flex items-center gap-1.5 font-MyFont text-sm font-medium text-textgray hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray rounded-sm"
          >
            See all
            <FiArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 lg:grid-cols-5 lg:gap-x-6">
            {Array.from({ length: visibleCount }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full bg-bggray rounded-lg" />
                <div className="mt-3 h-3 w-3/4 bg-bggray rounded" />
                <div className="mt-2 h-3 w-1/2 bg-bggray rounded" />
              </div>
            ))}
          </div>
        ) : (
          <Card books={books} hideOnImageError maxVisible={visibleCount} />
        )}
      </div>
    </section>
  );
};

export default Books;
