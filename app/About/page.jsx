import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";

const VALUES = [
  {
    Icon: FiBookOpen,
    title: "Curated by readers",
    body: "Every list is shaped by editors who care more about your next book than the bestseller chart.",
  },
  {
    Icon: FiUsers,
    title: "A community of readers",
    body: "We share what we are loving, why it works, and where it lands in the larger conversation.",
  },
  {
    Icon: FiHeart,
    title: "Books that earn their place",
    body: "Fiction or non-fiction, popular or quiet, the criterion is the same: it has to be worth the shelf.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero band */}
      <section className="relative h-[260px] md:h-[340px] overflow-hidden">
        <Image
          src="/about.jpg"
          alt=""
          fill
          quality={75}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-textgray/60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl h-full px-6 lg:px-8 flex flex-col justify-end pb-10">
          <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
            About us
          </span>
          <h1 className="mt-2 font-main text-3xl md:text-5xl font-semibold tracking-tight text-primary leading-[1.1] max-w-3xl">
            A bookstore for readers who care about what they read.
          </h1>
        </div>
      </section>

      {/* Mission / story */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-main text-2xl md:text-3xl font-semibold tracking-tight text-textgray">
                Our mission
              </h2>
              <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />
              <p className="mt-5 font-MyFont text-base lg:text-lg text-gray-600 leading-relaxed">
                Book Odyssey exists to ignite a passion for reading and learning
                by offering a thoughtfully curated selection of titles for
                readers across the world. We believe books have the power to
                inspire, educate, and quietly change a life.
              </p>
            </div>

            <div>
              <h2 className="font-main text-2xl md:text-3xl font-semibold tracking-tight text-textgray">
                What we are
              </h2>
              <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />
              <div className="mt-5 space-y-4 font-MyFont text-base lg:text-lg text-gray-600 leading-relaxed">
                <p>
                  We are not just an online book retailer. We are a small,
                  opinionated literary community organised around one belief:
                  every reader deserves a shelf curated with intent.
                </p>
                <p>
                  Whether you are a seasoned bibliophile or just starting your
                  reading journey, we want to be a trusted companion. Welcome
                  to Book Odyssey, where literature thrives and readers find
                  each other.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-bggray rounded-[2rem] -rotate-2"
              />
              <Image
                src="/about2.jpg"
                alt="Bookshelf and reading nook"
                width={500}
                height={300}
                quality={75}
                className="w-full h-auto rounded-[2rem] shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bggray/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="font-main text-2xl md:text-3xl font-semibold tracking-tight text-textgray">
              What guides us
            </h2>
            <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />
            <p className="mt-4 font-MyFont text-base text-gray-600">
              Three quiet principles shape the catalogue, the writing, and the
              way we work with publishers.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {VALUES.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="bg-primary rounded-2xl p-6 lg:p-7 border border-bggray"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bggray text-textgray">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-main text-lg font-semibold text-textgray">
                  {title}
                </h3>
                <p className="mt-2 font-MyFont text-sm text-gray-600 leading-relaxed">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
        <div className="rounded-2xl bg-textgray text-primary p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-main text-2xl md:text-3xl font-semibold tracking-tight">
              Ready to find your next read?
            </h2>
            <p className="mt-2 font-MyFont text-sm md:text-base text-primary/85">
              Explore our curated collections across fiction, biography,
              history, manga, and more.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-textgray font-MyFont font-semibold text-sm rounded-full px-5 py-3 hover:bg-bggray transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            Browse the catalogue
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
