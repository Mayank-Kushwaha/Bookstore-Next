import React from "react";
import Main from "@/components/Main";
import Books from "@/components/Books";
import Hashtag from "@/components/Hastag";

export default function Home() {
  return (
    <div>
      <Main />
      <Books heading="manga" title="Manga & Anime" order="relevance" result="5" />
      <Books heading="mystery" title="Mystery" order="relevance" result="5" />
      <Books heading="business" title="Business" order="relevance" result="5" />
      <Books heading="history" title="History" order="relevance" result="5" />

      <Hashtag />

      <Books heading="thriller" title="Thriller" order="relevance" result="5" />
      <Books
        heading="adventure fiction"
        title="Adventure"
        order="relevance"
        result="5"
      />
      <Books heading="drama" title="Drama" order="relevance" result="5" />
      <Books heading="fantasy" title="Fantasy" order="relevance" result="5" />
      <Books
        heading="science and fiction"
        title="Science Fiction"
        order="relevance"
        result="5"
      />
    </div>
  );
}
