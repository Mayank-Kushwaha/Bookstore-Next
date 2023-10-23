"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WIshlistContext";
import { BsBoxSeam } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useCart } from "@/context/CartContext";

export default function Wishlist() {
  const { WishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const handleCardClick = (selfLink) => {
    window.open(selfLink, "_blank");
  };


  return (
    
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8  ">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl ">
        {" "}
        My Wishlist
      </h1>
      {WishlistItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-32 text-lg font-MyFont">
          <BsBoxSeam className="icon-w opacity-50" />
          <span>Wishlist is empty!</span>
        </div>
      ) : (
        <div>
          <div className="hidden md:flex py-2 px-4 justify-center text-center items-center  font-MyFont bg-bggray font-bold  rounded ">
            <div className="w-1/2">Books Title</div>
            <div className="w-1/4  ">Price</div>
            <div className="w-1/4  ">Action</div>
          </div>
          <div className=" font-MyFont place-items-center text-center font-semibold table-fixed">
            {WishlistItems.map((item, index) => (
              <div key={index}>
                <div
                  className=" hidden md:flex justify-center items-center py-4"
                >
                  <div 
                  onClick={() => handleCardClick(item.preview)}
                  className="w-1/2 flex ">
                    <Image
                      src={item.image || "/default.jpg"}
                      priority="high"
                      unoptimized = {true}
                      width={120}
                      height={100}
                      alt="Picture of the author"
                      onError={(e) => {
                        e.target.src = "/default.jpg";
                      }}
                    />
                    <div className=" flex flex-col text-left px-4 py-8 font-MyFont">
                      <div>Title: {item.title}</div>
                      <div>Author: {item.author}</div>
                    </div>
                  </div>

                  <div className="w-1/4">{item.price}&#x20B9;</div>

                  <div className="w-1/4 flex justify-between">
                    <div>
                    <button
                      className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => { removeFromWishlist(item.id)
                                toast.success("Book Removed Successfully");}
                              }
                    >
                      Remove
                    </button>
                    </div>
                    <div className="py-2 pr-4">
                    <button
                  onClick={() => {
                    removeFromWishlist(item.id); 
                    const bookDetails = {
                      id: item.id,
                      image: item.image,
                      title: item.title,
                      author: item.author, // Assuming authors is an array
                      price: item.price,
                      preview: item.preview,
                      quantity: 1, // Price or a default value
                      // Add more book details as needed
                    };
                    addToCart(bookDetails); // Pass the book details to addToCart
                    // console.log("booksdetail", bookDetails);
                    // console.log("preview", item.title);
                    // console.log("preview", item.preview);

             
                  }}
                  className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                  </div>
                    
                  </div>
                </div>

                <div className="flex md:hidden justify-center items-center py-4">
                  <div className="flex justify-between">
                    <div 
                     onClick={() => handleCardClick(item.preview)}
                   >
                      <Image
                        src={item.image || "/default.jpg"}
                        priority="high"
                        unoptimized = {true}
                        width={250}
                        height={110}
                        alt="Picture of the author"
                        onError={(e) => {
                          e.target.src = "/default.jpg";
                        }}
                      />
                    </div>
                    <div className="px-4 pt-2 text-left flex flex-col justify-between">
                      <div>
                      <div className="flex md:hidden">Author :{item.title}</div>
                      <div className="flex md:hidden">Title: {item.author}</div>
                      <div className="flex md:hidden text-right">
                        Price: {item.price} &#x20B9;
                      </div>
                      </div>
                      <div className="flex flex-col py-2 justify-between">
                        <div className="pb-3">
                      <button
                      className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => {removeFromWishlist(item.id)
                        toast.success("Book Removed Successfully");}
                      }
                    >
                      Remove
                    </button>
                    </div>
                    <div className="py-2 pr-4">
                    <button
                  onClick={() => {
                    removeFromWishlist(item.id); 
                    const bookDetails = {
                      id: item.id,
                      image: item.image,
                      title: item.title,
                      author: item.author, // Assuming authors is an array
                      price: item.price,
                      preview: item.preview,
                      quantity: 1, // Price or a default value
                      // Add more book details as needed
                    };
                    addToCart(bookDetails);
                    
                   // Pass the book details to addToCart
                    console.log("booksdetail", bookDetails);
                    console.log("preview", item.preview);
                    
                  }}
                  className="bg-textgray justify-center px-2 py-2 font-MyFont text-primary flex-1 rounded md:px-4 text-sm font-semibold"
                >
                  Add To Cart
                </button>
                  </div>
                    </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 mx-auto flex items-center justify-between ">
            <Link
              className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid md:inline-flex font-MyFont opacity-60"
              href="/"
            >
              {" "}
              <MdArrowBackIos />
              Continue Shopping
            </Link>
            <Link
              className="text-link w-full inline-flex items-center underline decoration-dashed underline-offset-8 hover:decoration-solid lg:hidden font-MyFont opacity-60"
              href="/"
            >
              <MdArrowBackIos />
              Continue Shopping
            </Link>
          
          </div>
        </div>
      )}
    </div>
  );
}
