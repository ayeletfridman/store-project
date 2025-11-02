"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  return (
    <div className={styles.card}>
      {" "}
      <Link href={`/product/${product.id}`} className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw, 33vw"
          className={styles.image}
        />
      </Link>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>

        <Link href={`/product/${product.id}`} className={styles.title}>
          {product.title}
        </Link>

        <div className={styles.price}>${product.price.toFixed(2)}</div>

        <div className={styles.actions}>
          <button
            onClick={() => addToCart(product)}
            className={`btn btn-primary ${styles.fullWidth}`}
          >
            <ShoppingCartIcon height={20} width={20} />
            add to cart
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`btn-wishlist ${isInWishlist ? "active" : ""}`}
          >
            <HeartIcon height={24} width={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
