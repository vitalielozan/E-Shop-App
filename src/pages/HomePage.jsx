import { useFetchProducts } from "../hooks/useFetchProducts.js";
import BrandsGalery from "../components/BrandsGalery.jsx";

function HomePage() {
  const { data: brandsData, loading, error } = useFetchProducts("raw");

  if (loading) return <p className="p-4">Products loading...</p>;

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    );

  return <BrandsGalery brandsData={brandsData} />;
}

export default HomePage;
