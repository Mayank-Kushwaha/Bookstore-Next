import Image from "next/image";
import mainphoto from "../public/asset 0.png";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { FiArrowDownCircle, FiFacebook } from "react-icons/fi";
import Link from "next/link";

export default function Main() {
  return (
    <div className="flex flex-col justify-between mx-auto max-w-6xl gap-y-4 px-4 py-6 md:flex-row-reverse md:gap-x-4 md:px-8 lg:py-10">
      <div>
        <Image
          src='/asset 0.png'
          className="drop-shadow"
          priority="high"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div className="info-wrapper flex flex-1 flex-col gap-y-4 md:justify-center lg:justify-end lg:gap-y-8">
        <h1 className="font-main text-4xl font-semibold md:!leading-tight lg:text-5xl xl:text-6xl opacity-80 ">
          {" "}
          Best Place to Find <br></br> Your Favourite <br></br> Books.
        </h1>
        <p className="font-MyFont lg:text-lg opacity-80 ">
          Unleash your imagination with our online bookstore! Discover a vast
          selection of books for all ages and interests, with something for
          everyone. Shop now and find your next favorite read!
        </p>
        <p className="w-[125px] ring-1 ring-textgray ring-opacity-80 flex flex-row rounded py-3 px-4 text-lg font-main opacity-80 font-semibold">
          Browse
          <FiArrowDownCircle className="icon-bottom ml-3 mt-2 scale-150 bounce" />
        </p>
        <div className="flex flex-row gap-x-8 mt-6 opacity-80 !stroke-current stroke-2 ">
          {" "}
          <Link href="https://www.facebook.com/">
            {" "}
            <FiFacebook href="" className="icon-bottom " />{" "}
          </Link>
          <Link href="https://www.instagram.com/_mayank._k___/">
            {" "}
            <SlSocialInstagram className="icon-bottom" />{" "}
          </Link>
          <Link href="https://t.me/+919023373686">
            {" "}
            <PiTelegramLogo className="icon-bottom" />{" "}
          </Link>
          <Link href="mailto:mayankkush0842@gmail.com">
            {" "}
            <IoMailUnreadOutline className="icon-bottom" />
          </Link>
        </div>
        <div className="mt-12 flex gap-2 font-MyFont divide-x divide-textgray md:w-[125%] lg:w-auto">
          <div className="">Fast Delivery</div>
          <div className=" pl-2">Exclusive Deals</div>
          <div className=" pl-2">Curated Collections</div>
        </div>
      </div>
    </div>
  );
}
