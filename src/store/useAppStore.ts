import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem } from "@/types";

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
}

interface StoreActions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  toggleWishlist: (product: Product) => void;
  getTotalPrice: () => number;
}

export const useAppStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, action) => {
        const cart = get().cart;
        set({
          cart: cart
            .map((item) => {
              if (item.id === productId) {
                if (action === "increase") {
                  return { ...item, quantity: item.quantity + 1 };
                }
                if (action === "decrease") {
                  return item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : null;
                }
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null),
        });
      },

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const existingProduct = wishlist.find((item) => item.id === product.id);

        if (existingProduct) {
          set({
            wishlist: wishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "gki-store-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
