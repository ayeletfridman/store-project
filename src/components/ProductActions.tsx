"use client";

import { Product } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductActions({ product }: { product: Product }) {
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const isInWishlist = useAppStore((state) =>
    state.wishlist.some((item) => item.id === product.id)
  );

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => addToCart(product)}
        className="flex-1 bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        הוספה לעגלה
      </button>
      <button
        onClick={() => toggleWishlist(product)}
        className="border-2 border-gray-300 py-3 px-6 rounded-lg hover:border-red-500"
      >
        <HeartIcon
          className={`h-7 w-7 text-gray-600 ${
            isInWishlist ? "fill-red-500 text-red-500" : "hover:text-red-500"
          }`}
        />
      </button>
    </div>
  );
}
