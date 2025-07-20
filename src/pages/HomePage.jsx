import { useFetchProducts } from '../hooks/useFetchProducts.js'
import BrandsGalery from '../components/BrandsGalery.jsx'
import { Spinner } from '@heroui/react'

function HomePage() {
  const { data: brandsData, loading, error } = useFetchProducts('raw')

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
    )

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    )

  return <BrandsGalery brandsData={brandsData} />
}

export default HomePage
