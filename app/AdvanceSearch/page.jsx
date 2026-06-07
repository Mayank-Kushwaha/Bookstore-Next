"use client";
import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
];

const FIELDS = [
  {
    id: "title",
    label: "Book Title",
    placeholder: "e.g. The Midnight Library",
    paramKey: "title",
  },
  {
    id: "author",
    label: "Author",
    placeholder: "e.g. Haruki Murakami",
    paramKey: "author",
  },
  {
    id: "isbn",
    label: "ISBN",
    placeholder: "e.g. 9780525559474",
    paramKey: "isbn",
  },
  {
    id: "publisher",
    label: "Publisher",
    placeholder: "e.g. Penguin Random House",
    paramKey: "publisher",
  },
  {
    id: "category",
    label: "Category / Subject",
    placeholder: "e.g. Science Fiction",
    paramKey: "subject",
  },
  {
    id: "oclc",
    label: "OCLC Number",
    placeholder: "e.g. 123456789",
    paramKey: "oclcRaw",
  },
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

export default function AdvanceSearch() {
  const [values, setValues] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "",
    oclc: "",
  });
  const [order, setOrder] = useState("relevance");
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState({
    filtering: "",
    printType: "",
    projection: "",
    sorting: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [books, setBooks] = useState([]);
  const [summary, setSummary] = useState([]);

  const activeFieldCount = useMemo(
    () => Object.values(values).filter((v) => v.trim()).length,
    [values]
  );

  const setField = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));

  const clearAll = () => {
    setValues({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      category: "",
      oclc: "",
    });
    setFilters({ filtering: "", printType: "", projection: "", sorting: "" });
    setOrder("relevance");
    setBooks([]);
    setHasSearched(false);
    setSummary([]);
  };

  const fetchBooks = async (sortOverride) => {
    const params = new URLSearchParams();
    const summaryParts = [];

    if (values.title.trim()) {
      params.set("title", values.title.trim());
      summaryParts.push(`title: ${values.title.trim()}`);
    }
    if (values.author.trim()) {
      params.set("author", values.author.trim());
      summaryParts.push(`author: ${values.author.trim()}`);
    }
    if (values.isbn.trim()) {
      params.set("isbn", values.isbn.trim());
      summaryParts.push(`ISBN: ${values.isbn.trim()}`);
    }
    if (values.publisher.trim()) {
      params.set("publisher", values.publisher.trim());
      summaryParts.push(`publisher: ${values.publisher.trim()}`);
    }
    if (values.category.trim()) {
      params.set("subject", values.category.trim());
      summaryParts.push(`subject: ${values.category.trim()}`);
    }
    if (values.oclc.trim()) {
      params.set("q", `oclc:${values.oclc.trim()}`);
      summaryParts.push(`OCLC: ${values.oclc.trim()}`);
    }

    if ([...params.keys()].length === 0) {
      setBooks([]);
      setHasSearched(true);
      setSummary([]);
      return;
    }

    params.set("maxResults", "40");
    const effectiveOrder = sortOverride ?? order;
    if (effectiveOrder) params.set("orderBy", effectiveOrder);

    try {
      setLoading(true);
      setHasSearched(true);
      setSummary(summaryParts);
      const response = await fetch(`/api/books?${params.toString()}`);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchBooks();
    }
  };

  const handleSortChange = (value) => {
    setOrder(value);
    if (hasSearched) fetchBooks(value);
  };

  // Close modal on Escape
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => {
      if (e.key === "Escape") setModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const activeExtraCount =
    (filters.filtering ? 1 : 0) +
    (filters.printType ? 1 : 0) +
    (filters.projection ? 1 : 0);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 md:px-8">
      {/* Hero */}
      <header className="text-center mb-8 md:mb-10">
        <h1 className="font-main text-3xl md:text-4xl font-medium tracking-tight text-textgray">
          Advanced Search
        </h1>
        <p className="font-MyFont text-sm md:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
          Fill in any combination of fields to narrow your search. We&apos;ll match
          all the criteria you provide.
        </p>
      </header>

      {/* Form */}
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          fetchBooks();
        }}
        className="bg-bggray/60 rounded-2xl p-5 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {FIELDS.map((f) => (
            <div key={f.id} className="flex flex-col">
              <label
                htmlFor={`adv-${f.id}`}
                className="font-MyFont text-sm font-semibold text-textgray mb-1.5"
              >
                {f.label}
              </label>
              <div className="relative">
                <input
                  id={`adv-${f.id}`}
                  type="text"
                  inputMode={f.id === "isbn" || f.id === "oclc" ? "numeric" : "text"}
                  placeholder={f.placeholder}
                  value={values[f.id]}
                  onChange={(e) => setField(f.id, e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  className="w-full font-MyFont bg-white border-2 border-transparent rounded-lg py-3 px-4 pr-10 text-base text-textgray placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-textgray"
                />
                {values[f.id] && (
                  <button
                    type="button"
                    aria-label={`Clear ${f.label}`}
                    onClick={() => setField(f.id, "")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-textgray transition-colors duration-200 cursor-pointer"
                  >
                    <IoIosClose size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-2 font-MyFont text-sm font-semibold text-textgray bg-white border-2 border-bggray rounded-full px-4 py-2.5 hover:border-textgray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
            >
              <HiOutlineAdjustmentsHorizontal size={18} />
              Extra Filters
              {activeExtraCount > 0 && (
                <span className="ml-1 bg-textgray text-primary text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 inline-flex items-center justify-center">
                  {activeExtraCount}
                </span>
              )}
            </button>

            {(activeFieldCount > 0 || activeExtraCount > 0) && (
              <button
                type="button"
                onClick={clearAll}
                className="font-MyFont text-sm font-medium text-gray-600 hover:text-textgray underline underline-offset-4 transition-colors duration-200 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <div
              className="inline-flex items-center bg-white rounded-full p-1 border-2 border-bggray"
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
                      : "text-textgray hover:bg-bggray"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || activeFieldCount === 0}
              className="inline-flex items-center justify-center gap-2 bg-textgray text-primary font-MyFont font-semibold rounded-full px-6 py-2.5 hover:bg-black transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
            >
              <BiSearch size={18} />
              Search
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href={{ pathname: "/Search" }}
            className="font-MyFont text-sm text-textgray underline underline-offset-4 hover:text-black transition-colors duration-200"
          >
            Switch to simple search
          </Link>
        </div>
      </form>

      {/* Summary / results header */}
      {hasSearched && !loading && (
        <div className="mt-8 mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-MyFont text-sm md:text-base text-textgray">
            {books.length > 0 ? (
              <>
                <span className="font-semibold">{books.length}</span> result
                {books.length === 1 ? "" : "s"}
                {summary.length > 0 && (
                  <span className="text-gray-600">
                    {" "}
                    matching {summary.join(", ")}
                  </span>
                )}
              </>
            ) : (
              <>No results matching your criteria.</>
            )}
          </p>
        </div>
      )}

      {/* Results / states */}
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
              We couldn&apos;t find anything
            </h3>
            <p className="font-MyFont text-sm text-gray-600 mt-2 max-w-md mx-auto">
              Try fewer fields, broader terms, or check your spelling. ISBN
              numbers should be entered without dashes.
            </p>
          </div>
        ) : (
          <Card books={books} />
        )}
      </div>

      {/* Extra Filters Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="extra-filters-title"
        >
          <div
            className="absolute inset-0 bg-textgray/60"
            onClick={() => setModal(false)}
          />
          <div className="relative bg-primary rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <h2
                id="extra-filters-title"
                className="font-main text-xl text-textgray"
              >
                Extra Filters
              </h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setModal(false)}
                className="p-2 text-gray-500 hover:text-textgray transition-colors duration-200 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
              >
                <IoIosClose size={26} />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-6">
              <FilterGroup
                label="Filter"
                options={["partial", "full", "free-ebooks", "paid-ebooks", "ebooks"]}
                value={filters.filtering}
                onChange={(v) =>
                  setFilters((p) => ({ ...p, filtering: p.filtering === v ? "" : v }))
                }
              />
              <FilterGroup
                label="Print Type"
                options={["all", "books", "magazines"]}
                value={filters.printType}
                onChange={(v) =>
                  setFilters((p) => ({ ...p, printType: p.printType === v ? "" : v }))
                }
              />
              <FilterGroup
                label="Projection"
                options={["full", "lite"]}
                value={filters.projection}
                onChange={(v) =>
                  setFilters((p) => ({ ...p, projection: p.projection === v ? "" : v }))
                }
              />

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setFilters({ filtering: "", printType: "", projection: "", sorting: "" })
                  }
                  className="font-MyFont text-sm font-medium text-gray-600 hover:text-textgray underline underline-offset-4 transition-colors duration-200 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModal(false);
                    if (hasSearched) fetchBooks();
                  }}
                  className="bg-textgray text-primary font-MyFont font-semibold rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <h3 className="font-MyFont text-sm font-semibold text-textgray mb-2">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`font-MyFont text-sm rounded-full px-3.5 py-1.5 border-2 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray ${
                active
                  ? "bg-textgray text-primary border-textgray"
                  : "bg-white text-textgray border-bggray hover:border-textgray"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
