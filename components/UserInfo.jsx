"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie2 from "js-cookie";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  FiLogOut,
  FiDownload,
  FiChevronRight,
  FiPackage,
  FiUser,
  FiMail,
  FiCreditCard,
  FiMapPin,
} from "react-icons/fi";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function initialsFrom(name) {
  if (!name) return "U";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/paymentverify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) setPayments(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPayments();
  }, [session, token]);

  const downloadPdf = (payment) => {
    const pdf = new jsPDF();
    pdf.setFontSize(28);
    pdf.text("Book Odyssey", 15, 18);
    pdf.setFontSize(11);
    pdf.text("Order invoice", 15, 26);

    const columns = ["Field", "Value"];
    const rows = [
      ["Name", payment.name],
      ["Email", payment.email],
      ["Phone", payment.phone],
      ["Address", payment.address],
      ["Payment Mode", payment.payment],
      ...payment.items.map((item) => [
        "Ordered Items",
        `Id: ${item.id}, Name: ${item.title}, Price: ${item.price}`,
      ]),
      ["Total Amount", payment.total],
      ["Payment ID", payment.razorpay_payment_id],
      ["Payment Order", payment.razorpay_order_id],
      ["Razorpay Signature", payment.razorpay_signature],
    ];

    pdf.autoTable(columns, rows, { startY: 36 });
    pdf.setFontSize(10);
    pdf.text(
      "Thank you for shopping with us.",
      15,
      pdf.internal.pageSize.getHeight() - 10
    );
    pdf.save(`order_${payment.razorpay_order_id}.pdf`);
  };

  const handleLogout = () => {
    toast.success("Logged out");
    signOut();
    cookie2.remove("user");
    cookie2.remove("token");
    router.push("/");
  };

  const name = session?.user?.name || "Reader";
  const email = session?.user?.email || "";

  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="mb-8">
        <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Account
        </span>
        <h1 className="mt-2 font-main text-3xl md:text-4xl font-semibold tracking-tight text-textgray">
          Welcome back, {name.split(" ")[0]}.
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile card */}
        <aside className="lg:col-span-4">
          <div className="bg-bggray/60 rounded-2xl p-6 md:p-7">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-textgray text-primary font-main text-xl font-semibold"
              >
                {initialsFrom(name)}
              </span>
              <div className="min-w-0">
                <p className="font-MyFont text-sm text-gray-500">Signed in as</p>
                <p
                  className="font-main text-lg font-semibold text-textgray truncate"
                  title={name}
                >
                  {name}
                </p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 font-MyFont text-sm">
              <div className="flex items-start gap-3">
                <FiUser size={16} className="mt-0.5 text-gray-500" />
                <div className="min-w-0">
                  <dt className="text-xs text-gray-500">Name</dt>
                  <dd className="text-textgray break-words">{name}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMail size={16} className="mt-0.5 text-gray-500" />
                <div className="min-w-0">
                  <dt className="text-xs text-gray-500">Email</dt>
                  <dd className="text-textgray break-all">{email}</dd>
                </div>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary border border-bggray text-textgray font-MyFont font-semibold text-sm rounded-full py-2.5 hover:bg-bggray hover:border-textgray transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
            >
              <FiLogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Orders */}
        <section className="lg:col-span-8">
          <h2 className="font-main text-xl md:text-2xl font-semibold text-textgray">
            Recent orders
          </h2>
          <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />

          {payments.length === 0 ? (
            <div className="mt-6 bg-bggray/60 rounded-2xl py-14 px-6 text-center">
              <FiPackage size={36} className="mx-auto text-gray-400" aria-hidden="true" />
              <p className="mt-4 font-main text-lg text-textgray">No orders yet</p>
              <p className="mt-1 font-MyFont text-sm text-gray-600 max-w-sm mx-auto">
                When you place an order it will appear here with the option to
                download the invoice and track shipping.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200"
              >
                Browse the catalogue
              </Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {payments.map((payment, index) => {
                const isOpen = expanded === payment.razorpay_order_id;
                const itemCount = payment.items?.length || 0;
                return (
                  <li
                    key={payment.razorpay_order_id || index}
                    className="bg-primary border border-bggray rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isOpen ? null : payment.razorpay_order_id)
                      }
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bggray/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                    >
                      <div className="min-w-0">
                        <p className="font-MyFont text-xs text-gray-500">
                          Order #{index + 1}
                          {payment.createdAt && (
                            <>
                              {" "}
                              · {formatDate(payment.createdAt)}
                            </>
                          )}
                        </p>
                        <p className="font-MyFont text-sm font-semibold text-textgray truncate">
                          {itemCount} {itemCount === 1 ? "book" : "books"} · ₹
                          {payment.total}
                        </p>
                      </div>
                      <FiChevronRight
                        size={18}
                        className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-bggray px-5 py-5 space-y-4 font-MyFont text-sm">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <FiUser size={15} className="mt-0.5 text-gray-500" />
                            <div className="min-w-0">
                              <dt className="text-xs text-gray-500">Name</dt>
                              <dd className="text-textgray break-words">
                                {payment.name}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiMail size={15} className="mt-0.5 text-gray-500" />
                            <div className="min-w-0">
                              <dt className="text-xs text-gray-500">Email</dt>
                              <dd className="text-textgray break-all">
                                {payment.email}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiMapPin size={15} className="mt-0.5 text-gray-500" />
                            <div className="min-w-0">
                              <dt className="text-xs text-gray-500">Address</dt>
                              <dd className="text-textgray break-words">
                                {payment.address}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiCreditCard size={15} className="mt-0.5 text-gray-500" />
                            <div className="min-w-0">
                              <dt className="text-xs text-gray-500">Payment</dt>
                              <dd className="text-textgray">{payment.payment}</dd>
                            </div>
                          </div>
                        </dl>

                        <div>
                          <p className="text-xs text-gray-500 mb-1.5">Items</p>
                          <ul className="space-y-1 text-textgray">
                            {payment.items?.map((it, i) => (
                              <li
                                key={`${it.id}-${i}`}
                                className="flex items-center justify-between gap-3"
                              >
                                <span className="truncate">{it.title}</span>
                                <span className="shrink-0">₹{it.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-bggray flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="font-main text-xl font-semibold text-textgray">
                              ₹{payment.total}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => downloadPdf(payment)}
                              className="inline-flex items-center gap-2 bg-primary border border-bggray text-textgray font-MyFont text-sm font-semibold rounded-full px-4 py-2 hover:border-textgray hover:bg-bggray/60 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-textgray"
                            >
                              <FiDownload size={15} />
                              Invoice
                            </button>
                            <Link
                              href={{
                                pathname: "/Track",
                                query: {
                                  paymentid: payment.razorpay_order_id,
                                  date: new Date(payment.createdAt)
                                    .toISOString()
                                    .split("T")[0],
                                },
                              }}
                              className="inline-flex items-center gap-2 bg-textgray text-primary font-MyFont text-sm font-semibold rounded-full px-4 py-2 hover:bg-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
                            >
                              Track order
                              <FiChevronRight size={15} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
