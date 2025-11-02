"use client";

import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";
import Link from "next/link";
import styles from "./CheckoutPage.module.css";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const getTotalPrice = useAppStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.pageGrid}`}>
        <h1>The cart is empty</h1>
        <Link href="/" className="btn btn-primary">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.pageGrid}`}>
      <div className={styles.cartList}>
        <h1>Your cart</h1>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Image
              src={item.image}
              alt={item.title}
              width={90}
              height={90}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>

            <div className={styles.itemQuantity}>
              <button
                onClick={() => updateQuantity(item.id, "decrease")}
                className="btn btn-secondary"
              >
                -
              </button>
              <span className={styles.quantityText}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, "increase")}
                className="btn btn-secondary"
              >
                +
              </button>
            </div>

            <p className={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="btn-danger"
            >
              <TrashIcon height={20} width={20} />{" "}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>Order Summary</h2>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className={styles.summaryTotal}>
          <span> Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className={`${styles.checkoutButton} btn btn-primary`}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
