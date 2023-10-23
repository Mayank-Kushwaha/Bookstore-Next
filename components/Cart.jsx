"use client";
import React from "react";
import { useCart } from "@/context/CartContext"; // Update the path to your CartContext file
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

import { BsCartDash, BsBoxSeam } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice,
  } = useCart();

  const handleCardClick = (selfLink) => {
    window.open(selfLink, "_blank");
  };
  console.log(cartItems);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="font-main text-xl my-4 font-semibold mr-auto md:text-2xl">
        My Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-32 text-lg font-MyFont">
          <BsBoxSeam className="icon-w opacity-50" />
          <span>Cart is empty!</span>
        </div>
      ) : (
        <div className="my-4 lg:grid lg:grid-cols-3 lg:gap-x-6">
          <div className="table-wrapper lg:col-span-2 w-full divide-y">
            <div className="lg:min-h-[20.25rem]">
              <table className="w-full table-fixed">
                <thead className="hidden place-items-center  divide-x divide-y font-MyFont bg-bggray font-bold rounded w-full md:table-header-group">
                  <tr>
                    <th colSpan="2" className="w-[42.5%] py-1 ">
                      Book Details
                    </th>
                    <th className="w-[17.5%] py-1 text-left pl-5">Price</th>
                    <th className="w-[17.5%] py-1">Quantity</th>
                    <th className="w-[22.5%] py-1 col-span-2">Action</th>
                  </tr>
                </thead>
                <tbody className=" font-MyFont place-items-center font-semibold table-fixed">
                  {cartItems.map((item, index) => (
                    <div key={index}>
                      <tr className=" hidden md:flex">
                        <td className="w-max py-4">
                          <div
                            onClick={() => handleCardClick(item.preview)}
                            className="w-max flex justify-between"
                          >
                            <Image
                              src={item.image || "/default.jpg"}
                              priority="high"
                              unoptimized={true} // {false} | {true}
                              width={120}
                              height={100}
                              alt="Picture of the author"
                              onError={(e) => {
                                e.target.src = "/default.jpg";
                              }}
                            />
                            <div className="w-[185px] flex flex-col justify-center items-start  px-4 py-4 font-MyFont">
                              <div>Title: {item.title}</div>
                              <div>Author: {item.author}</div>
                            </div>
                          </div>
                        </td>
                        <td className="w-[84px] flex items-center justify-center py-4 px-6 ">
                          <div>{item.price}&#x20B9;</div>
                        </td>
                        <td className="w-max py-1 px-4 flex items-center justify-center">
                          <div className="flex flex-row h-10 w-full rounded-lg  bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decrementQuantity(item.id)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900 outline-none custom-input-number"
                              name="custom-input-number"
                              value={item.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </td>
                        <td className="w-max px-2 py-1 flex items-center justify-center">
                          <div>
                            <button
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                removeFromCart(item.id);
                                toast.success("Book Removed Successfully");
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>

                      <div className="grid md:hidden">
                        <tr>
                          <td
                            onClick={() => handleCardClick(item.preview)}
                            className="flex"
                          >
                            <div>
                              <Image
                                src={item.image || "/default.jpg"}
                                priority="high"
                                unoptimized={true}
                                width={200}
                                height={100}
                                alt="Picture of the author"
                                onError={(e) => {
                                  e.target.src = "/default.jpg";
                                }}
                              />
                            </div>
                            <div className="flex flex-col justify-center  px-4 text-left">
                              <div className="flex md:hidden">
                                Author :{item.title}
                              </div>
                              <div className="flex md:hidden ">
                                Title: {item.author}
                              </div>
                              <div className="flex md:hidden ">
                                Price: {item.price} &#x20B9;
                              </div>
                            </div>
                          </td>

                          {/* <td>
                            <div className="px-4 text-left">
                              <div className="flex md:hidden">
                                Author :{item.title}
                              </div>
                              <div className="flex md:hidden">
                                Title: {item.author}
                              </div>
                              <div className="flex md:hidden text-right">
                                Price: {item.price} &#x20B9;
                              </div>
                            </div>
                          </td> */}
                        </tr>
                        <tr>
                          <td className="flex py-6 px-2">
                            <div className="flex flex-row w-[200px] rounded-lg relative bg-transparent mt-1">
                              <button
                                data-action="decrement"
                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                onClick={() => decrementQuantity(item.id)}
                              >
                                <span className="m-auto text-2xl font-thin">
                                  −
                                </span>
                              </button>
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900 custom-input-number"
                                name="custom-input-number"
                                value={item.quantity}
                                readOnly
                              ></input>
                              <button
                                data-action="increment"
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                onClick={() => incrementQuantity(item.id)}
                              >
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                            <div className="px-4 flex">
                              <button
                                className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  removeFromCart(item.id);
                                  toast.success("Book Removed Successfully");
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                          {/* <td className="w-max py-1 p4-8 text-center ">
                            <div>
                              <button
                                className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  removeFromCart(index);
                                  toast.success("Book Removed Successfully");
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </td> */}
                        </tr>
                      </div>
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid lg:inline-flex font-MyFont opacity-60"
              href="/"
            >
              <MdArrowBackIos />
              Continue Shopping
            </Link>
          </div>

          <div className="others flex flex-col justify-between lg:my-0 font-MyFont divide-y">
            <div className="pb-4">
              <label
                htmlFor="order-notes"
                className="mb-1 font-sans font-semibold"
              >
                Order Notes
              </label>
              <textarea
                id="order-notes"
                name="order-notes"
                rows="4"
                className="block w-full rounded border-2 my-1 md:pr-10 border-gray-300 bg-primary font-normal outline-skin-accent py-1 px-2 outline-skin-accent"
              ></textarea>
            </div>
            {/* <div className="coupon-code-wrapper py-4 ">
              <label
                htmlFor="coupon-code"
                className="mb-1 font-sans font-semibold"
              >
                Coupon Code
              </label>
              <input
                type="text"
                id="coupon-code"
                className="block w-full rounded border-2 my-1 md:pr-10 border-gray-300 bg-primary font-normal outline-skin-accent py-1 px-2 outline-skin-accent"
              ></input>
              <span className="font-MyFont text-sm italic opacity-70">
                Coupon code will be applied on the checkout
              </span>
            </div> */}
            <div>
              <Link
                className="text-link inline-flex items-center underline decoration-dashed underline-offset-8 hover:decoration-solid lg:hidden font-MyFont opacity-60"
                href="/"
              >
                <MdArrowBackIos />
                Continue Shopping
              </Link>
              <div className="font-sans text-lg lg:block mt-4">
                <div className="mb-4 flex items-baseline justify-between py-4">
                  <span className="text-base">Total Price :</span>
                  <span className="font-semibold">
                    {calculateTotalPrice()} &#x20B9;
                  </span>
                </div>

                <Link href="/Checkout">
                  {" "}
                  <button
                    type="button"
                    className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
                  >
                    <BsCartDash className="mt-1 mr-3" />
                    <span>Checkout</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
