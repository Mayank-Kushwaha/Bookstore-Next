import Main from "@/components/Main";
import Books from "@/components/Books";
import Books2 from "@/components/Books2";
import photo1 from "../assets/asset 1.jpeg";
import photo2 from "../assets/asset 2.jpeg";
import photo6 from "../assets/asset 6.jpeg";
import photo7 from "../assets/asset 7.jpeg";
import photo8 from "../assets/asset 8.jpeg";
import photo9 from "../assets/asset 9.jpeg";
import photo10 from "../assets/asset 10.jpeg";
import photo11 from "../assets/asset 11.jpeg";
import photo12 from "../assets/asset 12.jpeg";
import photo13 from "../assets/asset 13.jpeg";
import photo14 from "../assets/asset 14.jpeg";
import photo15 from "../assets/asset 15.jpeg";
import photo16 from "../assets/asset 16.jpeg";
import photo17 from "../assets/asset 17.jpeg";
import photo18 from "../assets/asset 18.jpeg";
import photo19 from "../assets/asset 19.jpeg";
import photo20 from "../assets/asset 20.jpeg";
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
