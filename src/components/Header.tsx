"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import styles from "./Header.module.css"; // 1. ייבוא קובץ העיצוב
// import {
//   ShoppingCartIcon,
//   HeartIcon,
//   ChevronDownIcon, // 1. נייבא אייקון של חץ
// } from "@heroicons/react/24/outline";
import { useState } from "react"; // 2. נייבא את useState

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const cart = useAppStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className={styles.logo}>
          GKI Store
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            בית
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
              קטגוריות
              {/* <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              /> */}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-50 min-w-[200px] border">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 capitalize"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/checkout"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <span>עגלת קניות</span>
            {cartItemCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
