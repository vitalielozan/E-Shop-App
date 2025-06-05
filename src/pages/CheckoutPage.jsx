import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useCartFav } from "../hooks/useCartFav.js";
import { Form, Input, Button } from "@heroui/react";

const schema = yup.object().shape({
  billingAddress: yup.string().required("Billing address is required"),
  shippingAddress: yup.string().required("Shipping address is required"),
  cardNumber: yup
    .string()
    .matches(/^[0-9]{16}$/, "Invalid card number")
    .required("Card number is required"),
});

function CheckoutPage() {
  const { user } = useAuthContext();
  const { cart, clearCart } = useCartFav();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ rewsolver: yupResolver(schema) });

  useEffect(() => {
    if (!user) navigate("/login");
    else if (cart.length === 0) navigate("/cart");
  }, [user, cart, navigate]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
      reset();
    }, 2000);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h2 className="font-boldmb-6 text-3xl">Checkout</h2>
      {success ? (
        <div className="rounded-lg bg-green-100 p-4 text-center text-lg text-green-700 shadow">
          Payment successful! Redirecting to homepage...
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-lg border bg-white/80 p-4 shadow-sm dark:bg-gray-900/80">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between py-2 text-sm">
                  <span>{item.title}</span>
                  <span>{item.price} $.</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between text-base font-semibold">
              <span>Total : </span>
              <span>{total.toFixed(2)} $.</span>
            </div>
          </div>
          <Form
            className="space-y-6 rounded-lg bg-white/80 p-6 shadow dark:bg-slate-900/80"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                label="Billding Address"
                labelPlacement="outside"
                type="text"
                variant="bordered"
                size="lg"
                {...register("billdeingAddress")}
                error={errors.billingAddress?.message}
              />
            </div>
            <div>
              <Input
                label="Shipping Address"
                labelPlacement="outside"
                type="text"
                variant="bordered"
                size="lg"
                {...register("shippingAddress")}
                error={errors.shippingAddress?.message}
              />
            </div>
            <div>
              <Input
                label="Card Number"
                labelPlacement="outside"
                type="text"
                variant="bordered"
                size="lg"
                {...register("cardNumber")}
                error={errors.cardNumber?.message}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
