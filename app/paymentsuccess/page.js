"use client";
import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Policy() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");
  const payment = searchParams.get("payment");
  const total = searchParams.get("total");
  const paymentid = searchParams.get("razorpay_payment_id");
  const paymentorder = searchParams.get("razorpay_order_id");
  const razorpay_signature = searchParams.get("razorpay_signature");

  const orderDetailsRef = useRef();



const downloadPdf = () => {
  const pdf = new jsPDF();

  // Add header
  pdf.setFontSize(30);
  pdf.text('Book Odysseys', 15, 15);

  // Define the columns for your table
  const columns = ["Field", "Value"];

  // Define the rows for your table
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Address", address],
    ["Payment Mode", payment],
    ["Total Amount", total],
    ["Payment ID", paymentid],
    ["Payment Order", paymentorder],
    ["Razorpay Signature", razorpay_signature],
    ["", ,]
  ];

  // Add the table to the PDF
  pdf.autoTable(columns, rows, {
    startY: 40, // Start the table 30 units down
    didDrawPage: (data) => {
      // Add table header
      pdf.setFontSize(20);
      pdf.text('Invoice', data.settings.margin.left, 35);
    }
  });

  // Add footer
  pdf.setFontSize(12);
  pdf.text('Thank you for shopping with us', 15, pdf.internal.pageSize.getHeight() - 10);

  pdf.save("order_details.pdf");
}
  return (
    <div  className="max-w-6xl w-full mx-auto px-4 py-6 justify-start md:px-8 font-sans">
      <div ref={orderDetailsRef} className="p-6 mt-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-8 font-main">Payments Details:</h2>
        <table className="table-auto w-full">
          <tbody className=" ">
            <tr><td><strong>Name:</strong></td><td>{name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>{email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>{phone}</td></tr>
            <tr><td><strong>Address:</strong></td><td>{address}</td></tr>
            <tr><td><strong>Payment Mode:</strong></td><td>{payment}</td></tr>
            <tr><td><strong>Total Amount:</strong></td><td>{total}</td></tr>
            <tr><td><strong>Payment ID:</strong></td><td>{paymentid}</td></tr>
            <tr><td><strong>Payment Order:</strong></td><td>{paymentorder}</td></tr>
            <tr><td><strong>Razorpay Signature:</strong></td><td>{razorpay_signature}</td></tr>
          </tbody>
        </table>
      </div>
      <button className="mt-4 text-xl bg-blue-500 text-white py-2 px-4 rounded" onClick={downloadPdf}>Download Order Details as PDF</button>
    </div>
  );
}