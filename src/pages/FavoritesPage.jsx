import React, { useState, useEffect } from "react";
import MotionDiv from "../components/MotionDiv.jsx";
import EmptyMasage from "../components/EmptyMasage.jsx";
import { messages } from "../constants/constants.js";
import { toast } from "react-toastify";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@heroui/react";

function FavoritesPage() {
  const navigate = useNavigate();
  const [favoritItems, setFavoritItems] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedFavorit = localStorage.getItem("favorit");
    if (storedFavorit) {
      setFavoritItems(JSON.parse(storedFavorit));
    }
  }, []);

  const handleAddToCartFromFavorite = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alredyInCart = cart.some((item) => item.id === product.id);
    if (alredyInCart) {
      toast.warning("This product is alredy in cart!");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Your product is added to cart!");
  };

  const handleRemoveFromFavorite = (productId) => {
    const updatedFavorites = favoritItems.filter(
      (item) => item.id !== productId,
    );
    localStorage.setItem("favorit", JSON.stringify(updatedFavorites));
    setFavoritItems(updatedFavorites);
    toast.info("Removed from favorites.");
  };

  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Your favorite products</h1>
      {favoritItems.length === 0 ? (
        <EmptyMasage imageSrc="/favorite.png" message={messages.messageFav} />
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favoritItems.map((item, index) => (
            <MotionDiv key={index}>
              <Card className="w-full bg-white/80 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-gray-900/80">
                <CardHeader className="p-0">
                  <Image
                    isZoomed
                    src={item.image}
                    alt={item.title}
                    className="mx-auto h-48 w-full rounded-t object-cover px-10"
                  />
                </CardHeader>

                <CardBody className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.shortDesc}
                  </p>
                  <p className="text-md font-bold text-indigo-600">
                    ${item.price}
                  </p>
                </CardBody>

                <CardFooter className="justify-around">
                  <Button
                    onPress={() => handleAddToCartFromFavorite(item)}
                    className="rounded-full bg-gray-900 px-4 py-2 text-white shadow hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>

                  <Button
                    onPress={() => handleRemoveFromFavorite(item.id)}
                    className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
