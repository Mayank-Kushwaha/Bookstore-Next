"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the cart
const CartContext = createContext();

// Create a custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item with the same ID already exists in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
    } else {
      // Item doesn't exist in the cart, add it
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
  };

  // Function to increment the quantity of an item in the cart
  const incrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);

    // Update local storage with the updated cart
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Function to decrement the quantity of an item in the cart
  const decrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }

    // Update local storage with the updated cart
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
