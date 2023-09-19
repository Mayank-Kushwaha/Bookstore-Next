import Link from "next/link";

export default function Topheader() {
  return (
    <div className="hidden w-full h-6 p-1 bg-bggray text-textgray md:block">
      <div className="mx-auto max-w-6xl flex items-center justify-start text-sm gap-x-4 font-MyFont px-8">
        <Link href="/" className="relative text-sm opacity-70 hover:opacity-95">
          About US
        </Link>
        <Link href="/" className="text-sm opacity-70 hover:opacity-95">
          Contact Us
        </Link>
        <Link href="/" className="text-sm opacity-70 hover:opacity-95">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
