"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from "js-cookie";
import Cookies from "js-cookie";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/paymentverify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.length > 0) {
          setPayments(data);
        }
        console.log("response" + data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPayments();
  }, [session]);
  console.log(payments);

  // let queryParams = {};
  //  const handleTrack = (payment) => {

  //   if (payments.length > 0) {
  //     const date = new Date(payment.createdAt);
  //     const formattedDate = `${date.getFullYear()}-${String(
  //       date.getMonth() + 1
  //     ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  //     queryParams = {
  //       paymentid: payment.razorpay_order_id,
  //       date: formattedDate,
  //     };
  //   }
  //  }
  const downloadPdf = (payment) => {
    const pdf = new jsPDF();

    // Add header
    pdf.setFontSize(30);
    pdf.text("Book Odysseys", 15, 15);

    // Define the columns for your table
    const columns = ["Field", "Value"];

    // Define the rows for your table
    const rows = [
      ["Name", payment.name],
      ["Email", payment.email],
      ["Phone", payment.phone],
      ["Address", payment.address],
      ["Payment Mode", payment.payment],
      // Add a row for each cart item
      ...payment.items.map((item) => [
        "Ordered Items",
        `Id: ${item.id}, Name: ${item.title}, Price: ${item.price}`,
      ]),
      ["Total Amount", payment.total],
      ["Payment ID", payment.razorpay_payment_id],
      ["Payment Order", payment.razorpay_order_id],
      ["Razorpay Signature", payment.razorpay_signature],
      ["", ,],
    ];

    // Add the table to the PDF
    pdf.autoTable(columns, rows, {
      startY: 40, // Start the table 30 units down
      didDrawPage: (data) => {
        // Add table header
        pdf.setFontSize(20);
        pdf.text("Invoice", data.settings.margin.left, 35);
      },
    });

    // Add footer
    pdf.setFontSize(12);
    pdf.text(
      "Thank you for shopping with us",
      15,
      pdf.internal.pageSize.getHeight() - 10
    );

    pdf.save(`order_details_${payment.razorpay_order_id}.pdf`);
  };

  console.log("token inside dashboard " + token);
  console.log("data inside dashboard " + payments);
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8">
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl ">
        Welcome to Book odyssey
      </div>
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col  text-md gap-2 my-6">
        <div className="font-main ">
          Name:{" "}
          <span className="font-bold font-MyFont pl-3">
            {session?.user?.name}
          </span>
        </div>
        <div className="font-main">
          Email:{" "}
          <span className="font-bold font-MyFont pl-3">
            {session?.user?.email}
          </span>
        </div>
        <button
          onClick={() => {
            toast.success("Logout successfully");
            signOut();
            cookie2.remove("user");
            cookie2.remove("token");
            router.push("/");
          }}
          className="bg-red-500 text-white w-[150px] font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
      <div className="flex pb-8 md:pb-0 md:pr-10 xl:pr-20 font-main text-xl md:text-3xl mt-8 ">
        Recent Order Details
      </div>
      {payments.map((payment, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-2">Order {index + 1}</h2>
          <p>
            <strong>Name:</strong> {payment.name}
          </p>
          <p>
            <strong>Email:</strong> {payment.email}
          </p>
          <p>
            <strong>Phone:</strong> {payment.phone}
          </p>
          <p>
            <strong>Address:</strong> {payment.address}
          </p>
          <p>
            <strong>Payment:</strong> {payment.payment}
          </p>
          <p>
            <strong>Ordered Items:</strong>{" "}
            {payment.items
              .map((item) => `${item.id}, ${item.title}, ${item.price}`)
              .join(", ")}
          </p>
          <p>
            <strong>Total Amount:</strong> {payment.total}
          </p>
          <p>
            <strong>Razorpay Order ID:</strong> {payment.razorpay_order_id}
          </p>
          <p>
            <strong>Razorpay Payment ID:</strong> {payment.razorpay_payment_id}
          </p>
          <p className="break-words">
            <strong>Razorpay Signature:</strong> {payment.razorpay_signature}
          </p>
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <button
              className="mt-4 text-xl w-max bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => downloadPdf(payment)}
            >
              Download Order Details as PDF
            </button>
            <Link
              className="flex items-center font-MyFont font-medium w-max  bg-blue-500 text-white py-2 px-4 rounded"
              // onClick={() => handleTrack(payment)}
              href={{
                pathname: "/Track",
                query: {
                  paymentid: payment.razorpay_order_id,
                  date: new Date(payment.createdAt).toISOString().split("T")[0],
                },
              }}
            >
              Track your order
              <IoIosArrowForward className="ml-2" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
