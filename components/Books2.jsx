import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

export default function Books2({
  heading,
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
}) {
  return (
    <div id="books" className="pb-14">
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-main text-2xl font-medium capitalize md:text-2xl">
            {heading}
          </h2>
          <Link
            className="hidden md:flex items-center font-sans font-medium"
            href="/categories/new-arrivals"
          >
            See All
            <IoIosArrowForward className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-y-2 rounded border-2 border-bggray align-baseline last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex">
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={photo1}
                priority="high"
                max-width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="content px-4 pb-4">
              <header className="h-10 line-clamp-2">
                <h3 className="text-base font-MyFont">A Tale of Two Cities</h3>
              </header>
              <div className="price mb-1 font-MyFont font-medium">
                <span>MMK: </span>
                <span>16,100</span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 rounded border-2 border-bggray last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex">
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={photo2}
                priority="high"
                max-width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="content px-4 pb-4">
              <header className="h-10 line-clamp-2">
                <h3 className="text-base font-MyFont">A Tale of Two Cities</h3>
              </header>
              <div className="price mb-1 font-MyFont font-medium">
                <span>MMK: </span>
                <span>16,100</span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 rounded border-2 border-bggray last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex">
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={photo3}
                priority="high"
                max-width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="content px-4 pb-4">
              <header className="h-10 line-clamp-2">
                <h3 className="text-base font-MyFont">A Tale of Two Cities</h3>
              </header>
              <div className="price mb-1 font-MyFont font-medium">
                <span>MMK: </span>
                <span>16,100</span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 rounded border-2 border-bggray last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex">
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={photo4}
                priority="high"
                max-width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="content px-4 pb-4">
              <header className="h-10 line-clamp-2">
                <h3 className="text-base font-MyFont">A Tale of Two Cities</h3>
              </header>
              <div className="price mb-1 font-MyFont font-medium">
                <span>MMK: </span>
                <span>16,100</span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 rounded border-2 border-bggray last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex">
            <div className="p-4 sm:p-8 md:p-4 lg:p-8 bg-bggray">
              <Image
                src={photo5}
                priority="high"
                max-width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="content px-4 pb-4">
              <header className="h-10 line-clamp-2">
                <h3 className="text-base font-MyFont">A Tale of Two Cities</h3>
              </header>
              <div className="price mb-1 font-MyFont font-medium">
                <span>MMK: </span>
                <span>16,100</span>
              </div>
              <div className="buttons flex gap-x-2">
                <button
                  type="button"
                  className="bg-textgray font-MyFont text-primary flex-1 rounded px-1 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="outline-btn-color basis-1/4 rounded p-1"
                  title="Add To Wishlist"
                >
                  <FaRegHeart className="!stroke-skin-dark inline-block h-6 w-6 stroke-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center md:hidden">
          <Link
            className="flex items-center font-MyFont font-medium"
            href="/categories/new-arrivals"
          >
            See All
            <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
