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
    if (!heading) return;
    const controller = new AbortController();
    async function fetchBooks() {
      try {
        setloading(true);
        const apiUrl = `/api/books?mode=subject&subject=${encodeURIComponent(
          heading
        )}&orderBy=${encodeURIComponent(order || "relevance")}&maxResults=${result}`;
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
        setloading(false);
      }
    }
    fetchBooks();
    return () => controller.abort();
  }, [heading, order, result]);

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
