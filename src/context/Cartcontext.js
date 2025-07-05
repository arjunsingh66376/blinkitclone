// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.title === item.title);
      if (existingItem) {
        // If item already exists, update its quantity (or just return prevItems if you don't want quantity here)
        return prevItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item is new, add it with a quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to increase item quantity in cart
  const increaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease item quantity in cart
  const decreaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (title) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};