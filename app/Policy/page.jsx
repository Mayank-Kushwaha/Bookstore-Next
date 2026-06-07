import React from "react";
import Link from "next/link";

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: [
      "Welcome to Book Odyssey. We value your privacy and are committed to protecting your personal information.",
      "This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website, interact with our services, or make purchases through our platform.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information we collect",
    body: ["We may collect the following types of information:"],
    list: [
      "Personal information: when you register an account or make a purchase, we may collect your name, email address, shipping address, and payment details.",
      "Browsing information: data about your interaction with our website, including IP address, browser type, device information, and cookies (see our Cookie Policy for details).",
      "Communication: records of your communications with our customer support team for quality assurance and support purposes.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How we use your information",
    body: ["We use your information for the following purposes:"],
    list: [
      "Order processing: to process and fulfil your orders, including shipping, payment processing, and order confirmation.",
      "Personalisation: to enhance your shopping experience by recommending titles based on your browsing and purchase history.",
      "Communication: to send transactional updates, order notifications, and marketing communications with your consent.",
      "Analytics: to analyse website performance, user behaviour, and trends so we can improve our services.",
    ],
  },
  {
    id: "information-sharing",
    title: "4. Information sharing",
    body: ["We may share your information with:"],
    list: [
      "Service providers: trusted third parties who assist us in running our business, such as payment processors, shipping companies, and marketing agencies.",
      "Legal requirements: when required by law, we may disclose your information to comply with legal obligations, protect our rights, or respond to legal requests.",
    ],
  },
  {
    id: "your-rights",
    title: "5. Your choices and rights",
    body: ["You have the right to:"],
    list: [
      "Access the personal data we hold about you.",
      "Rectify inaccurate or incomplete data.",
      "Request the deletion of your data under certain circumstances.",
      "Object to the processing of your data for marketing purposes.",
      "Withdraw any consent you previously provided, at any time.",
    ],
  },
  {
    id: "security",
    title: "6. Security measures",
    body: [
      "We employ industry-standard security measures to protect your data.",
      "However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
    ],
  },
  {
    id: "international-transfers",
    title: "7. International data transfers",
    body: [
      "Your data may be transferred and processed in countries outside your jurisdiction.",
      "We take appropriate steps to ensure your data remains protected, consistent with applicable data protection laws.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "8. Children's privacy",
    body: [
      "Our services are not intended for individuals under the age of 16. We do not knowingly collect or maintain personal information from children.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to this policy",
    body: [
      "We reserve the right to update this Privacy Policy periodically. The latest version will be posted on our website with the effective date.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact us",
    body: [
      "If you have questions or concerns about this Privacy Policy, please reach out using the details on our Contact page.",
    ],
  },
];

const LAST_UPDATED = "January 2026";

export default function Policy() {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <header className="max-w-3xl">
        <span className="inline-flex font-MyFont text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Legal
        </span>
        <h1 className="mt-2 font-main text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-textgray leading-[1.1]">
          Privacy Policy
        </h1>
        <p className="mt-4 font-MyFont text-base text-gray-600 leading-relaxed">
          This policy explains what data we collect, why we collect it, and how
          we keep it safe. If anything is unclear, write to us and we will be
          glad to help.
        </p>
        <p className="mt-3 font-MyFont text-xs text-gray-500">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="lg:col-span-3 lg:order-2"
        >
          <div className="lg:sticky lg:top-24 bg-bggray/60 rounded-2xl p-5">
            <p className="font-MyFont text-xs font-semibold uppercase tracking-wider text-gray-500">
              On this page
            </p>
            <ol className="mt-3 space-y-2 font-MyFont text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="text-textgray hover:text-black transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Body */}
        <article className="lg:col-span-9 lg:order-1 space-y-10 font-MyFont">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-main text-xl md:text-2xl font-semibold text-textgray">
                {s.title}
              </h2>
              <span className="block w-10 h-[2px] bg-textgray mt-2 opacity-80" />
              <div className="mt-4 space-y-3 text-gray-600 leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-2 space-y-2.5 pl-1">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-textgray shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* CTA back to Contact */}
          <section className="rounded-2xl bg-bggray/60 p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-main text-lg font-semibold text-textgray">
                Still have questions?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Our team is happy to walk you through any part of this policy.
              </p>
            </div>
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 bg-textgray text-primary font-MyFont font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-textgray"
            >
              Contact us
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}
