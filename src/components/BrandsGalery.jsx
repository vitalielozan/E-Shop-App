import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import ProductCard from "./ProductCard.jsx";

function BrandsGalery({ brandsData }) {
  console.log(brandsData);
  const brandsArray = Object.entries(brandsData);
  console.log(brandsArray);
  const brandsPerPage = 2;
  const productsPerBrand = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(brandsArray.length / brandsPerPage);
  console.log(totalPages);

  const startIndex = (currentPage - 1) * brandsPerPage;
  console.log(startIndex);
  const currentBrands = brandsArray.slice(
    startIndex,
    startIndex + brandsPerPage,
  );
  console.log(currentBrands);

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        All Brands
      </h1>

      <div className="space-y-12">
        {currentBrands.map(([brandName, products]) => (
          <div key={brandName}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-500">
                {brandName}
              </h3>
              <Link
                to={`/brand/${brandName}`}
                className="text-sm text-indigo-700 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {products.slice(0, productsPerBrand).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="sm"
            className="disabled:opacity-50"
          >
            Prev
          </Button>
          <Button
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            size="sm"
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default BrandsGalery;
