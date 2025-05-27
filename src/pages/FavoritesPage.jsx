import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MotionDiv from "../components/MotionDiv.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@heroui/react";

function FavoritesPage() {
  const [favoritItems, setFavoritItems] = useState([]);

  useEffect(() => {
    const storedFavorit = localStorage.getItem("favorit");
    if (storedFavorit) {
      setFavoritItems(JSON.parse(storedFavorit));
    }
  }, []);

  const handleAddToCartFromFavorite = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const favorit = JSON.parse(localStorage.getItem("favorit")) || [];
    const alredyInCart = cart.some((item) => item.id === product.id);
    if (alredyInCart) {
      alert("This product is alredy in cart!");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Your product is added to cart!");

    const updatedFavorites = favorit.filter((item) => item.id !== product.id);
    localStorage.setItem("favorit", JSON.stringify(updatedFavorites));
    setFavoritItems(updatedFavorites);
  };

  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Your favorite products</h1>
      {favoritItems.length === 0 ? (
        <div className="flex flex-col items-center justify-around gap-3 py-3">
          <Image alt="Shopping Bag" src="/favorite.png" width={300} />
          <p className="mb-5">
            There are no favorite products. <br />
            Choose your favorites from our offers.
          </p>
          <Button
            as={Link}
            to={"/"}
            className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
          >
            Continue Shopping
          </Button>
        </div>
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
                    className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
                    fullWidth
                  >
                    Add to Cart
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
