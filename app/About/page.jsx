import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/about.jpg"
          className="object-cover brightness-50 w-full h-[250px]"
          width={500}
          height={200}
          quality={75}
          loading="lazy"
          alt="About Picture"
        />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-main text-primary text-2xl font-bold capitalize">
          {" "}
          About US
        </h1>
      </div>
      <div className="lg:px-20 max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
        <div className="grid gap-4  md:grid-cols-2 md:grid-rows-3 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <h2 className="font-main text-xl font-bold">Our Mission</h2>
            <p className="my-2 font-MyFont">
              our mission is to ignite a passion for reading and learning by
              providing a diverse and curated selection of books to readers
              worldwide. We are dedicated to empowering knowledge, believing in
              the transformative power of books to inspire, educate, and
              entertain.
            </p>
          </section>
          <section className="md:row-span-2 md:row-start-2 lg:col-span-3">
            <h2 className="font-main text-xl font-bold">What We Are</h2>
            <p className="my-2 font-MyFont">
              we're not just an online book retailer; we're a vibrant literary
              community passionate about the written word. We believe that books
              have the power to inspire, educate, and transform lives.
            </p>
            <p className="my-2 font-MyFont">
              We take pride in curating a diverse collection of books that span
              genres and interests, ensuring there's something for everyone.
              Whether you're a seasoned bibliophile or just starting your
              reading journey, we're here to be your trusted companions. Join us
              in celebrating the joy of reading and the boundless possibilities
              that books bring to our lives. Welcome to My-Bookstore, where
              literature thrives, and readers unite.
            </p>
          </section>
          <div className="mt-6  md:col-start-2 md:row-span-3 md:row-start-1 lg:col-span-2 lg:col-start-4">
            <Image
              src="/about2.jpg"
              className="object-cover border-8 w-full border-textgray md:max-h-96 md:max-w-[24rem]"
              width={500}
              height={300}
              quality={75}
              loading="lazy"
              alt="About Picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
