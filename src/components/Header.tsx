"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import styles from "./Header.module.css";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const cart = useAppStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          GKI Store
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>

          {categories
            .filter((category) => category && category.trim() !== "")
            .map((category) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className={styles.navLink}
              >
                {category}
              </Link>
            ))}

          <Link href="/wishlist" className={styles.navLink}>
            <HeartIcon height={22} width={22} />
            <span>Wishlist</span>
          </Link>

          <Link href="/checkout" className={styles.cartLink}>
            <ShoppingCartIcon height={20} width={20} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className={styles.cartCount}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
