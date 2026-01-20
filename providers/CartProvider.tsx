import { Coffee } from "@/lib/coffeeApi";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  coffee: Coffee;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (coffee: Coffee, size?: string, quantity?: number) => void;
  removeFromCart: (coffeeId: number) => void;
  updateQuantity: (coffeeId: number, quantity: number) => void;
  incrementQuantity: (coffeeId: number) => void;
  decrementQuantity: (coffeeId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (coffeeId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (
    coffee: Coffee,
    size: string = "M",
    quantity: number = 1,
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.coffee.id === coffee.id && item.size === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.coffee.id === coffee.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { coffee, size, quantity }];
    });
  };

  const removeFromCart = (coffeeId: number) => {
    setCartItems((prev) => prev.filter((item) => item.coffee.id !== coffeeId));
  };

  const updateQuantity = (coffeeId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(coffeeId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.coffee.id === coffeeId ? { ...item, quantity } : item,
      ),
    );
  };

  const incrementQuantity = (coffeeId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.coffee.id === coffeeId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrementQuantity = (coffeeId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.coffee.id === coffeeId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const sizeMultiplier =
        item.size === "S" ? 0.8 : item.size === "L" ? 1.2 : 1;
      return total + item.coffee.price * sizeMultiplier * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (coffeeId: number) => {
    return cartItems.some((item) => item.coffee.id === coffeeId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
