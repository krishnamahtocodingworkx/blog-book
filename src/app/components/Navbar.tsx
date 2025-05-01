"use client"; // <-- important for client-side hooks

import { IMAGES } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="h-16 flex items-center justify-between px-20">
      <Link href="/" className="flex items-center gap-1">
        <Image src={IMAGES.LOGO} width={30} height={30} alt="logo" />
        <h3 className="font-semibold">Blog Book</h3>
      </Link>
      <span className="flex items-center gap-10">
        <Link
          href="/"
          className={`hover:text-[var(--primary)] hover:scale-105 transition-all duration-300 ease-in-out ${
            pathname === "/" ? "text-[var(--primary)] scale-105" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`hover:text-[var(--primary)] hover:scale-105 transition-all duration-300 ease-in-out ${
            pathname === "/about" ? "text-[var(--primary)] scale-105" : ""
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:text-[var(--primary)] hover:scale-105 transition-all duration-300 ease-in-out ${
            pathname === "/contact" ? "text-[var(--primary)] scale-105" : ""
          }`}
        >
          Contact
        </Link>
        <Link
          href="/blogs"
          className={`hover:text-[var(--primary)] hover:scale-105 transition-all duration-300 ease-in-out ${
            pathname.includes("/blogs") ? "text-[var(--primary)] scale-105" : ""
          }`}
        >
          Blogs
        </Link>
      </span>
      <span className="custom-button">Get Started</span>
    </nav>
  );
};

export default Navbar;
