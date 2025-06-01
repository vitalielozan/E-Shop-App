import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProducts } from "../hooks/useFetchProducts.js";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  Spinner,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@heroui/react";
import ImageCarousel from "../components/ImageCarousel.jsx";

function ProductPage() {
  const { id } = useParams();
  const [inCart, setInCart] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const { data: product, loading, error } = useFetchProducts("id", id);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const fav = JSON.parse(localStorage.getItem("favorit")) || [];

    setInCart(cart.some((item) => item.id === id));
    setInFavorite(fav.some((item) => item.id === id));
  }, [id, product]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.warning("Log in to add this items to your cart!");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (inCart) {
      toast.warning("This product is already in cart!");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Your product was added to cart!");
    setInCart(true);
  };

  const handleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Removed from cart!");
    setInCart(false);
  };

  const handleAddToFavorite = () => {
    if (!isLoggedIn) {
      toast.warning("Log in to add this items to your cart!");
      return;
    }
    const fav = JSON.parse(localStorage.getItem("favorit")) || [];
    if (inFavorite) {
      toast.warning("This product is already in favorites!");
      return;
    }

    fav.push(product);
    localStorage.setItem("favorit", JSON.stringify(fav));
    toast.success("Added to favorites!");
    setInFavorite(true);
  };

  const handleRemoveFromFavorite = () => {
    const fav = JSON.parse(localStorage.getItem("favorit")) || [];
    const updated = fav.filter((item) => item.id !== id);
    localStorage.setItem("favorit", JSON.stringify(updated));
    toast.success("Removed from favorites!");
    setInFavorite(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner
          size="lg"
          color="primary"
          label="Loading..."
          labelColor="primary"
        />
      </div>
    );

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    );

  if (!product || Array.isArray(product))
    return <p className="py-10 text-center text-red-500">Product not found.</p>;

  const { title, description, price, images, typ, rating } = product;

  const imagesArr = Array.isArray(images) ? images : [images];

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl bg-white/80 px-6 py-10 shadow-2xl dark:bg-gray-900/80 sm:px-8 lg:px-10">
      <CardHeader className="flex flex-col items-center justify-center gap-4">
        <ImageCarousel srcArray={imagesArr} />
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-6">
        <span className="text-2xl font-bold text-indigo-600">${price}</span>
        <div className="justify-content-between align-items-center flex gap-6 text-lg text-gray-500 dark:text-gray-300">
          <p>
            Rating <br />
            {rating}
          </p>
          <p>
            Produkttyp <br />
            {typ}
          </p>
        </div>
      </CardBody>
      <CardFooter className="justify-around">
        {inCart ? (
          <Button
            onPress={handleRemoveFromCart}
            className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            onPress={handleAddToCart}
            className="rounded-full bg-gray-900 px-4 py-2 text-white shadow hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        <Button
          onPress={inFavorite ? handleRemoveFromFavorite : handleAddToFavorite}
          className={`rounded-full px-4 py-2 text-white shadow hover:scale-105 ${
            inFavorite ? "bg-pink-600" : "bg-gray-900"
          }`}
        >
          <Heart
            className="h-5 w-5"
            fill={inFavorite ? "currentColor" : "none"}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductPage;
