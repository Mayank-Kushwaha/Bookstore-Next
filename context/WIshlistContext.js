"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the Wishlist
const WishlistContext = createContext();

// Create a custom hook to access the Wishlist context
export const useWishlist = () => useContext(WishlistContext);

// Wishlist provider component
export function WishlistProvider({ children }) {
  const [WishlistItems, setWishlistItems] = useState([]);

  // Load Wishlist items from local storage when the component mounts
  useEffect(() => {
    const storedWishlistItems = localStorage.getItem("WishlistItems");
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, []);

  const addToWishlist = (item) => {
    const existingItemIndex = WishlistItems.findIndex(
      (WishlistItem) => WishlistItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item with the same ID already exists in the Wishlist, update its quantity
      const updatedWishlist = [...WishlistItems];
      updatedWishlist[existingItemIndex].quantity += item.quantity;
      setWishlistItems(updatedWishlist);
      localStorage.setItem("WishlistItems", JSON.stringify(updatedWishlist)); // Update local storage
    } else {
      // Item doesn't exist in the Wishlist, add it
      const updatedWishlist = [...WishlistItems, item];
      setWishlistItems(updatedWishlist);
      localStorage.setItem("WishlistItems", JSON.stringify(updatedWishlist)); // Update local storage
    }
  };

  // Function to remove an item from the Wishlist
  const removeFromWishlist = (index) => {
    const updatedWishlist = [...WishlistItems];
    updatedWishlist.splice(index, 1);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("WishlistItems", JSON.stringify(updatedWishlist)); // Update local storage
  };

  // Function to increment the quantity of an item in the Wishlist
  const incrementQuantity = (index) => {
    const updatedWishlist = [...WishlistItems];
    updatedWishlist[index].quantity += 1;
    setWishlistItems(updatedWishlist);

    // Update local storage with the updated Wishlist
    localStorage.setItem("WishlistItems", JSON.stringify(updatedWishlist));
  };

  // Function to decrement the quantity of an item in the Wishlist
  const decrementQuantity = (index) => {
    const updatedWishlist = [...WishlistItems];
    if (updatedWishlist[index].quantity > 1) {
      updatedWishlist[index].quantity -= 1;
      setWishlistItems(updatedWishlist);
    }

    // Update local storage with the updated Wishlist
    localStorage.setItem("WishlistItems", JSON.stringify(updatedWishlist));
  };

  // Calculate the total price of items in the Wishlist
  const calculateTotalPrice = () => {
    return WishlistItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        WishlistItems,
        addToWishlist,
        removeFromWishlist,
        incrementQuantity,
        decrementQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}