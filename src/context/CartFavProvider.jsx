import React, { useState, useEffect } from "react";
import { CartFavContext } from "./context.js";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext.js";

function CartFavProvider({ children }) {
  const { user, isLoggedIn } = useAuthContext();
  const [cart, setCart] = useState(() => {
    if (isLoggedIn && user) {
      try {
        const saved = localStorage.getItem(`cart_${user.email}`);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [favorites, setFavorites] = useState(() => {
    if (isLoggedIn && user) {
      try {
        const saved = localStorage.getItem(`favorites_${user.email}`);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
      localStorage.setItem(
        `favorites_${user.email}`,
        JSON.stringify(favorites),
      );
    }
  }, [cart, user, favorites, isLoggedIn]);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      toast.warning("Log in to add this item to your cart.");
      return;
    }
    if (!product || !product.id) {
      toast.error("Invalid product.");
      return;
    }
    if (cart.some((item) => item.id === product.id)) {
      toast.warning("Product already in cart!");
      return;
    }
    setCart([...cart, product]);
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    toast.success("Removed from cart.");
  };

  const addToFavorites = (product) => {
    if (!isLoggedIn) {
      toast.warning("Log in to add this item to your cart.");
      return;
    }

    if (!product || !product.id) {
      toast.error("Invalid product.");
      return;
    }
    if (favorites.some((item) => item.id === product.id)) {
      toast.warning("Product already in favorites!");
      return;
    }
    setFavorites([...favorites, product]);
    toast.success("Added to favorites!");
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((item) => item.id !== productId));
    toast.success("Removed from favorites.");
  };

  return (
    <CartFavContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartFavContext.Provider>
  );
}

export default CartFavProvider;
