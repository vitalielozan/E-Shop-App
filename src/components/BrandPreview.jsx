import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function BrandPreview({ brandName, products }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {brandName}
        </h3>
        <Link
          to={`/brand/${brandName}`}
          className="text-sm text-indigo-600 hover:underline"
        >
          View All ➡️
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
