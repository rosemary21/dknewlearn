import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  function addToCart(item) {
    // Check if cart already exists in localStorage
    let cart = localStorage.getItem('cart');
  
    // If cart doesn't exist, create an empty array
    if (!cart) {
      cart = [];
    } else {
      // Parse existing cart from JSON
      cart = JSON.parse(cart);
    }
  
    // Check if item already exists in the cart
    const itemExists = cart.some(cartItem => cartItem.id === item.id); // Assuming items have a unique 'id'
  
    if (itemExists) {
      // Show a toast notification for existing item
      toast.warning("This item is already in your cart!")
    } else {
      // Add item to cart
      cart.push(item);
  
      // Store updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      setCart(cart)

      toast.success("Item added to cart successfully!")

    // location.reload()
    }
  }

  const removeItemFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart)
    toast.info("Item removed from cart.");
  };

  const clearCart = () => {

    localStorage.removeItem("cart");
    setCart([]);
    toast.warn("Cart cleared.");
  };


  // Pass both cart and addToCart function through context
  return (
    <CartContext.Provider value={{ cart, addToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
