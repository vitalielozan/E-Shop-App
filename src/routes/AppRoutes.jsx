import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import CartPage from "../pages/CartPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import BrandPage from "../pages/BrandPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/brand/:brandName" element={<BrandPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
