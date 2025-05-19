import { useFetchProducts } from "../hooks/useFetchProducts.js";
import BrandsGalery from "../components/BrandsGalery.jsx";
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

  return <BrandsGalery brandsData={brandsData} />;
}

export default HomePage;
