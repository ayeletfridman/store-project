"use client";

import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";
import Link from "next/link";
import styles from "./CheckoutPage.module.css";
// import { TrashIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const getTotalPrice = useAppStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">עגלת הקניות ריקה</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          חזור לחנות
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold mb-6">עגלת הקניות שלך</h1>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="object-contain"
            />
            <div className="flex-grow">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, "decrease")}
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-bold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, "increase")}
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="font-bold text-lg w-24 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            ></button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-4">סיכום הזמנה</h2>
        <div className="flex justify-between text-lg mb-2">
          <span>סכום ביניים</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg mb-4">
          <span>משלוח</span>
          <span>חינם</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-2xl font-bold mb-6">
          <span>סך הכל</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full bg-green-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-700">
          המשך לתשלום
        </button>
      </div>
    </div>
  );
}
