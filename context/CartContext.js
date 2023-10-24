"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
// Create a context for the cart
const CartContext = createContext();

// Create a custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export function CartProvider({ children }) {
  const token = Cookies.get('token');
  const [cartItems, setCartItems] = useState([]);
  const [total, settotal] = useState(0);
  // const { token } = parseCookies();

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    if (token) {
      // Check if the token exists
      (async () => {
        try {
          const items = await fetch("api/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (items.ok) {
            const data = await items.json();
            setCartItems(data);
            console.log("Inside context cartitems", data);
          } else {
            console.error("Error while fetching the cart: " + items.statusText);
          }
        } catch (error) {
          console.error(
            "An unexpected error occurred while fetching the cart: " +
              error.message
          );
        }
      })();
    }
  }, [token]); // Depend on the 'token' variable

  //  useEffect(() => {
  //    const storedCartItems = localStorage.getItem("cartItems");
  //    if (storedCartItems) {
  //      setCartItems(JSON.parse(storedCartItems));
  //    }
  //  }, []);

  const addToCart = async (item, productId) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its quantity and price
        cartItems[existingItemIndex].quantity += item.quantity;
      } else {
        // If the item is not in the cart, add it to cartItems
        cartItems.push(item);
      }

      const total = cartItems.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
        0
      );
      settotal(total);

      const requestData = {
        items: cartItems,
        total: total,
        productId: productId,
      };

      const method = existingItemIndex !== -1 ? "PUT" : "POST";

      const res = await fetch("api/cart", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        toast.success("Book Added To Cart successfully");
        setCartItems(cartItems);
        // Update local storage
      } else {
        console.error("Error while adding item to cart.");
        toast.success("Book Added To Cart successfully");
      }
    } catch (error) {
      console.error("Error while adding item to cart ", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (res.status === 200) {
        const res2 = await res.json();
        console.log("After removing from cart", res2);
        setCartItems(res2.items);
        settotal(res2.total); // Update cart items specifically
        console.log("After removing from cart itemsssss", res2.items);
      } else {
        console.log("Error during removing data from cart:", res.statusText);
      }
    } catch (error) {
      console.log("Error during removing data from cart:", error.message);
    }
  };
  const incrementQuantity = async (productId) => {
    try {
      const res = await fetch("api/cart", {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (res.status === 200) {
        const res2 = await res.json();
        console.log("After removing from cart", res2);
        setCartItems(res2.items);
        settotal(res2.total); // Update cart items specifically
        console.log("After removing from cart itemsssss", res2.items);
      } else {
        console.log("Error during removing data from cart:", res.statusText);
      }
    } catch (error) {
      console.log("Error during removing data from cart:", error.message);
    }
  };
  const decrementQuantity = async (productId) => {
    try {
      const res = await fetch("api/decrement", {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (res.status === 200) {
        const res2 = await res.json();
        console.log("After removing from cart", res2);
        setCartItems(res2.items);
        settotal(res2.total); // Update cart items specifically
        console.log("After removing from cart itemsssss", res2.items);
      } else {
        console.log("Error during removing data from cart:", res.statusText);
      }
    } catch (error) {
      console.log("Error during removing data from cart:", error.message);
    }
  };

  // Function to increment the quantity of an item in the cart
  // const incrementQuantity = (index) => {
  //   const updatedCart = [...cartItems];
  //   updatedCart[index].quantity += 1;
  //   setCartItems(updatedCart);

  //   // Update local storage with the updated cart
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  // };

  // // Function to decrement the quantity of an item in the cart
  // const decrementQuantity = (index) => {
  //   const updatedCart = [...cartItems];
  //   if (updatedCart[index].quantity > 1) {
  //     updatedCart[index].quantity -= 1;
  //     setCartItems(updatedCart);
  //   }

  //   // Update local storage with the updated cart
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  // };

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
