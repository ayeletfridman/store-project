"use client";

import { useAppStore } from "@/store/useAppStore";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const wishlist = useAppStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">רשימת המשאלות ריקה</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          חזור לחנות
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">רשימת המשאלות שלי</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
