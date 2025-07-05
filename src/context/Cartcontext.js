// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Helper function to generate a random weight (keeping it as it was in your original Cards.js)
const generateRandomWeight = () => {
    const units = ['gm', 'kg', 'pack', 'ml', 'L'];
    const randomUnit = units[Math.floor(Math.random() * units.length)];
    let value;

    switch (randomUnit) {
        case 'gm':
            value = Math.floor(Math.random() * (1000 - 50) + 50); // 50-999 gm
            return `${value} ${randomUnit}`;
        case 'kg':
            value = (Math.random() * (5 - 0.1) + 0.1).toFixed(1); // 0.1-5.0 kg
            return `${value} ${randomUnit}`;
        case 'pack':
            value = Math.floor(Math.random() * (10 - 1) + 1); // 1-9 packs
            return `${value} ${randomUnit}`;
        case 'ml':
            value = Math.floor(Math.random() * (1000 - 100) + 100); // 100-999 ml
            return `${value} ${randomUnit}`;
        case 'L':
            value = (Math.random() * (5 - 0.5) + 0.5).toFixed(1); // 0.5-5.0 L
            return `${value} ${randomUnit}`;
        default:
            return '1 unit'; // Fallback
    }
};

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.title === item.title);
            if (existingItem) {
                // If item already exists, do not re-add, just ensure quantity is at least 1
                return prevItems.map((cartItem) =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity || 1) }
                        : cartItem
                );
            } else {
                // If item is new, add it with a quantity of 1 and double its price
                const originalUnitPrice = parseFloat(item.price || 0);
                const initialCartPricePerUnit = originalUnitPrice * 2;

                return [
                    ...prevItems,
                    {
                        ...item,
                        quantity: 1,
                        originalUnitPrice: originalUnitPrice,
                        price: initialCartPricePerUnit.toFixed(0),
                        initialCartPricePerUnit: initialCartPricePerUnit,
                        weight: item.weight || generateRandomWeight(),
                    },
                ];
            }
        });
    };

    // Function to increase item quantity and adjust total price
    const increaseQuantity = (title) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.title === title) {
                    const newQuantity = (item.quantity || 1) + 1;
                    const newPrice = (item.initialCartPricePerUnit * newQuantity).toFixed(0);
                    return {
                        ...item,
                        quantity: newQuantity,
                        price: newPrice,
                    };
                }
                return item;
            })
        );
    };

    // Function to decrease item quantity and adjust total price, but not below quantity 1
    const decreaseQuantity = (title) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.title === title) {
                    const currentQuantity = item.quantity || 1;
                    const newQuantity = Math.max(1, currentQuantity - 1); // Quantity never goes below 1

                    // Calculate the base price for the new quantity
                    let calculatedPrice = item.initialCartPricePerUnit * newQuantity;

                    // Ensure the price doesn't go below a minimum if quantity is 1
                    if (newQuantity === 1) {
                        // When quantity is 1, the minimum price should be its initial doubled unit price
                        calculatedPrice = Math.max(item.initialCartPricePerUnit, calculatedPrice);
                    }

                    return {
                        ...item,
                        quantity: newQuantity,
                        price: calculatedPrice.toFixed(0),
                    };
                }
                return item;
            })
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