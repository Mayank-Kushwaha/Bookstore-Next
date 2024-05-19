"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Update the path to your CartContext file
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
// import { parseCookies } from "nookies";
import Cookies from "js-cookie";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setpayment] = useState("Bank");

  const router = useRouter();
  const { cartItems, removeFromCart, calculateTotalPrice } = useCart();
  const [items, setItems] = useState({});

  const saveCartToDatabase = async (e) => {
    e.preventDefault();

    try {
      setItems(cartItems);
      console.log("items " + items);
      const total = calculateTotalPrice();
      const res = await fetch("api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          payment,
          items,
          total: total,
        }),
      });
      // console.log("cartitems",cartItemss);
      // console.log("items", cartitems);
      if (res.ok) {
        setName("");

        toast.success("Payment Done successfully");
        console.log(totalpricevalue);
        router.push("/");
      } else {
        console.log("data saving failed.");
      }
    } catch (error) {
      console.log("Error during saving data into cart: ", error);
    }
  };
  const makePayment = async () => {
    const token = Cookies.get("token"); // Get the token from cookies
    console.log("Token inside chectoutjs " + token);
    // const { token } = parseCookies();
    // console.log("Token inside chectoutjs " + token);
    setItems(cartItems);
    const total = calculateTotalPrice();

    // Make API call to the serverless API to create a Razorpay order
    const data = await fetch("api/razorpay", {
      method: "POST",
      body: JSON.stringify({
        total,
      }),
    }).then((t) => t.json());
    console.log("Razorpay data", data);
    var options = {
      key: process.env.RAZORPAY_API_KEY,
      name: name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for your purchase",
      handler: async function (response) {
        console.log(response);
        const paymentData = {
          name,
          email,
          phone,
          address,
          payment,
          items,
          total,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        // Make API call to verify the payment on the server
        const verifyResponse = await fetch("api/paymentverify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        const queryString = `name=${name}&email=${email}&phone=${phone}&address=${address}&payment=${payment}
      \&total=${total}&razorpay_payment_id=${
          response.razorpay_payment_id
        }&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${
          response.razorpay_signature
        }`;

        const verifyResult = await verifyResponse.json();
        console.log("response verify==", verifyResult);
        if (verifyResult?.message == "success") {
          setName("");
          console.log(queryString);
          toast.success("Payment Done successfully");
          console.log("Onclick clicked");
         router.push(`/paymentsuccess?${queryString}`);
          cartItems.map((item) => removeFromCart(item.id));
        } else {
          console.log("Data saving failed.");
        }
        console.log(items);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
      console.log(response.razorpay_payment_id);
      console.log(response.razorpay_order_id);
      console.log(response.razorpay_signature);
    });
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <h1 className="text-center font-main text-2xl font-semibold lg:text-3xl">
        {" "}
        Checkout
      </h1>
      <p className="mb-8 text-center font-MyFont lg:mb-14">
        Provide your payment and delivery address information to finalize your
        order.
      </p>
      <form
        onSubmit={saveCartToDatabase}
        className="my-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-5 lg:gap-x-10 font-MyFont divide-x"
      >
        <div className="md:col-span-1 lg:col-span-3">
          <h2 className="text-xl font-bold">Billing Details</h2>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Full Name
              <input
                placeholder="Enter Your Full Name"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="fullName"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Email Address
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Valid Email"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Phone
              <input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+919021457863 (or) 09932146687"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                type="text"
                name="phone"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="font-MyFont font-medium">
              Address
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                placeholder="No (27), 11 M, 370205, gujarat, India"
                rows="4"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                name="address"
              ></textarea>
            </label>
          </div>
          <label className="ml-1">
            <input
              // onChange={(e) => setEmail(e.target.value)}
              className="mr-2 scale-125 accent-skin-accent outline-skin-accent"
              type="checkbox"
              name="saveInfo"
            />
            Save this information for next time
          </label>
          <div className="my-4">
            <label className="font-MyFont font-medium">
              Order Notes (optional)
              <textarea
                rows="4"
                className="my-1 block w-full md:pr-10 rounded border-2 border-gray-300 bg-primary py-1 px-2 font-normal outline-skin-accent"
                name="orderNotes"
              ></textarea>
            </label>
          </div>
          <div>
            <Link
              className="text-link hidden items-center underline decoration-dashed underline-offset-8 hover:decoration-solid md:inline-flex font-MyFont opacity-60"
              href="/"
            >
              {" "}
              <MdArrowBackIos />
              Return To Cart
            </Link>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-3 rounded justify-between divide-y bg-bggray p-4 md:col-span-1 md:p-6 lg:col-span-2 lg:my-0 lg:p-8">
          <div className="flex flex-col justify-between ">
            <h2 className="text-center text-lg font-semibold">Order Summary</h2>
            <span className="font-medium mt-10 mb-2">Have a Coupon code?</span>
            <div className="mt-1 flex justify-between">
              <input
                placeholder="Enter Your Coupon code"
                className=" block  md:pr-10 rounded border-2 border-gray-300 bg-primary py-1font-normal outline-skin-accent mr-3 flex-1 px-2 "
                type="text"
              />
              <button
                type="button"
                className="rounded z-100 bg-gray-800 px-4 py-1 text-lg font-medium tracking-widest text-primary outline-offset-2 hover:bg-opacity-80 active:bg-opacity-100"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between ">
            <div className="flex items-center py-6 justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-semibold">
                {" "}
                {calculateTotalPrice()} &#x20B9;
              </span>
            </div>
            <div className="flex flex-col font-MyFont gap-3 justify-center ">
              <label htmlFor="Cash" className="flex">
                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  id="Cash"
                  className="h-5 w-5 mt-2  border-2 border-black cursor-default rounded-full bg-primary shadow-[0_0_0_2px] shadow-bggray  focus-within:border-2 focus-within:border-skin-accent"
                  checked={payment === "Cash"}
                  onChange={(e) => setpayment(e.target.value)}
                />
                <h1 className=" ml-auto w-11/12 mt-2 text-left font-bold leading-none text-skin-dark">
                  Cash on Delivery{" "}
                </h1>
              </label>

              <label htmlFor="Cash" className="flex">
                <input
                  type="radio"
                  name="payment"
                  value="Bank"
                  id="Bank"
                  className="h-5 w-5 mt-2  border-2 border-black cursor-default rounded-full bg-primary shadow-[0_0_0_2px] shadow-bggray  focus-within:border-2 focus-within:border-skin-accent"
                  checked={payment === "Bank"}
                  onChange={(e) => setpayment(e.target.value)}
                />
                <h1 className=" ml-auto w-11/12 mt-2 text-left font-bold leading-none text-skin-dark">
                  Bank Transfer{" "}
                  <p className="flex text-sm font-normal py-1 font-MyFont">
                    Make your payment directly from googlepay, paytm, UPI
                  </p>
                </h1>
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                makePayment();
              }}
              className="bg-textgray text-white w-full flex justify-center py-2 px-2 mt-2 font-MyFont text-lg font-medium md:rounded md:py-1"
            >
              <span>Place order</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
