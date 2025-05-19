import { useFetchProducts } from "../hooks/useFetchProducts.js";
import BrandPreview from "../components/BrandPreview.jsx";
import { Spinner } from "@heroui/react";

function HomePage() {
  const { data: brandsData, loading } = useFetchProducts("raw");

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

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        All Brands
      </h1>

      <div className="space-y-12">
        {Object.entries(brandsData).map(([brandName, products]) => (
          <BrandPreview
            key={brandName}
            brandName={brandName}
            products={products.slice(0, 3)}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;
