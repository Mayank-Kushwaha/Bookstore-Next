import Main from "@/components/Main";
import Books from "@/components/Books";
import Books2 from "@/components/Books2";
import photo1 from "../public/asset 1.jpeg";
import photo2 from "../public/asset 2.jpeg";
import photo6 from "../public/asset 6.jpeg";
import photo7 from "../public/asset 7.jpeg";
import photo8 from "../public/asset 8.jpeg";
import photo9 from "../public/asset 9.jpeg";
import photo10 from "../public/asset 10.jpeg";
import photo11 from "../public/asset 11.jpeg";
import photo12 from "../public/asset 12.jpeg";
import photo13 from "../public/asset 13.jpeg";
import photo14 from "../public/asset 14.jpeg";
import photo15 from "../public/asset 15.jpeg";
import photo16 from "../public/asset 16.jpeg";
import photo17 from "../public/asset 17.jpeg";
import photo18 from "../public/asset 18.jpeg";
import photo19 from "../public/asset 19.jpeg";
import photo20 from "../public/asset 20.jpeg";
import Hashtag from "@/components/Hastag";

export default function Home() {
  return (
<div>
  <Main/>
  <Books />
        <Books2
          heading="Best Seller"
          photo1={photo6}
          photo2={photo7}
          photo3={photo8}
          photo4={photo9}
          photo5={photo10}
        />
        <Books2
          heading="Classic"
          photo1={photo11}
          photo2={photo8}
          photo3={photo9}
          photo4={photo1}
          photo5={photo2}
        />
        <Books2
          heading="English & IELTS"
          photo1={photo12}
          photo2={photo13}
          photo3={photo14}
          photo4={photo15}
          photo5={photo16}
        />
        <Books2
          heading="Manga"
          photo1={photo6}
          photo2={photo17}
          photo3={photo18}
          photo4={photo19}
          photo5={photo20}
        />
        <Hashtag/>
</div>
      
  );
}
