import React, { useState, useEffect } from "react";
import { CartFavContext } from "./context.js";
import { toast } from "react-toastify";

function CartFavProvider({ children }) {
  const currentUser = localStorage.getItem("currentUser");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [cart, setCart] = useState(() => {
    try {
      const saved = currentUser
        ? localStorage.getItem(`cart_${currentUser}`)
        : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = currentUser
        ? localStorage.getItem(`favorites_${currentUser}`)
        : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `favorites_${currentUser}`,
        JSON.stringify(favorites),
      );
    }
  }, [favorites, currentUser]);

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
        currentUser,
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
