import React from "react";
import Main from "@/components/Main";
import Books from "@/components/Books";
import Hashtag from "@/components/Hastag";

export default function Home() {
  return (
    <div>
      <Main />
      <Books heading="anime" title="Manga" order="newest" result="5" />
      <Books heading="mystery" title="Mystery" order="newest" result="5" />
      <Books heading="business" title="Business" order="newest" result="5" />
      <Books heading="History" title="History" order="newest" result="5" />
      <Books heading="thriller" title="Thriller" order="newest" result="5" />
      <Books
        heading="adventure fiction"
        title="Adventure fiction"
        order="newest"
        result="5"
      />
      <Books heading="drama" title="Drama" order="newest" result="5" />
      <Books heading="fantasy" title="Fantasy" order="newest" result="5" />
      <Books
        heading="Science and fiction"
        title="Science and Fiction"
        order="newest"
        result="5"
      />
      <Hashtag />
    </div>
  );
}
