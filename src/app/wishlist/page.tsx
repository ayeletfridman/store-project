"use client";

import { useAppStore } from "@/store/useAppStore";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import gridStyles from "../ProductsGrid.module.css";
import "../globals.css";
import emptyStyles from "../checkout/CheckoutPage.module.css";

export default function WishlistPage() {
  const wishlist = useAppStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className={emptyStyles.emptyCart}>
        <h1>The wishlist is empty</h1>
        <Link href="/" className="btn btn-primary">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>My Wishlist</h1>
      <div className={gridStyles.grid}>
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
