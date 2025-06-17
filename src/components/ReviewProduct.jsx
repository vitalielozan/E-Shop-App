import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { StarIcon } from "lucide-react";
import { Button, Form } from "@heroui/react";
import { Textarea } from "@heroui/input";

function ReviewProduct({ productId }) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReview = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(storedReview[productId] || []);
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const newReview = {
      name: user.email || "Anonim",
      comment,
      rating,
      date: new Date().toISOString(),
    };

    const storedReview = JSON.parse(localStorage.getItem("reviews")) || {};
    const updatedReview = storedReview[productId]
      ? [...storedReview[productId], newReview]
      : [newReview];
    storedReview[productId] = updatedReview;
    localStorage.setItem("reviews", JSON.stringify(storedReview));
    setReviews(updatedReview);
    setComment("");
    setRating(5);
  };

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.length > 1
        ? localPart[0] + "*".repeat(localPart.length - 1)
        : "*";
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Reviews
      </h2>

      {user ? (
        <Form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            required
            variant="faded"
            className="w-full max-w-xs"
          />

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {rating} stars
            </span>
          </div>

          <Button
            type="submit"
            className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
            fullWidth
          >
            Send Review
          </Button>
        </Form>
      ) : (
        <p className="mb-4 text-lg italic text-gray-500 dark:text-gray-400">
          I must be loged for reviews.
        </p>
      )}

      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-lg italic text-gray-400 dark:text-gray-500">
            There are no reviews for this product.
          </p>
        )}

        {reviews.map((r, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="me-2 font-semibold text-gray-800 dark:text-gray-100">
                {maskEmail(r.name)}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {new Date(r.date).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= r.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProduct;
