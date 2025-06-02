import React, { useEffect } from "react";
import MotionDiv from "../components/MotionDiv.jsx";
import EmptyMasage from "../components/EmptyMasage.jsx";
import { messages } from "../constants/constants.js";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useCartFav } from "../hooks/useCartFav.js";
import { toast } from "react-toastify";
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
  const { cart, favorites, addToCart, removeFromFavorites } = useCartFav();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddToCartFromFavorite = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.warning("Product already in cart!");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Your favorite products</h1>
      {favorites.length === 0 ? (
        <EmptyMasage imageSrc="/favorite.png" message={messages.messageFav} />
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((item) => (
            <MotionDiv key={item.id}>
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
                    onPress={() => removeFromFavorites(item.id)}
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
