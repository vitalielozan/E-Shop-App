import React, { useState, useEffect } from "react";
import EmptyMasage from "../components/EmptyMasage.jsx";
import { messages } from "../constants/constants.js";
import MotionDiv from "../components/MotionDiv.jsx";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@heroui/react";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Shopping cart</h1>
      {cartItems.length === 0 ? (
        <EmptyMasage
          imageSrc="/shopping-bag.png"
          message={messages.messageCart}
        />
      ) : (
        <MotionDiv>
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cartItems.map((item, index) => (
              <Card
                key={index}
                className="w-full bg-white/80 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-gray-900/80"
              >
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

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
                    onPress={() => handleRemoveFromCart(index)}
                    fullWidth
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </MotionDiv>
      )}
    </div>
  );
}

export default CartPage;
