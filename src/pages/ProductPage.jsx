import { useParams } from "react-router-dom";
import { useFetchProducts } from "../hooks/useFetchProducts.js";
import {
  Spinner,
  Button,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@heroui/react";

function ProductPage() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetchProducts("id", id);

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

  const { title, description, price, image } = product;

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl bg-white/80 px-6 py-10 shadow-2xl dark:bg-gray-900/80 sm:px-8 lg:px-10">
      <CardHeader className="flex flex-col items-center justify-center gap-4">
        <Image
          src={image || "/placeholder.jpg"}
          alt={title}
          className="mb-4 w-full rounded-xl object-cover shadow-md"
        />
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-6">
        <span className="text-2xl font-bold text-indigo-600">${price}</span>
        <Button className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r">
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductPage;
