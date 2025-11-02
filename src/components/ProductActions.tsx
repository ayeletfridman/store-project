"use client";

import { Product } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function ProductActions({ product }: { product: Product }) {
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);

  const wishlist = useAppStore((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);
  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
      <button
        onClick={() => addToCart(product)}
        className="btn btn-primary"
        style={{ flex: 1 }}
      >
        <ShoppingCartIcon height={22} width={22} />
        add to cart
      </button>

      <button
        onClick={() => toggleWishlist(product)}
        className={`btn btn-secondary ${isInWishlist ? "active" : ""}`}
      >
        <HeartIcon
          height={28}
          width={28}
          style={{
            fill: isInWishlist ? "#e53e3e" : "none",
            color: isInWishlist ? "#e53e3e" : "#333",
          }}
        />
      </button>
    </div>
  );
}
