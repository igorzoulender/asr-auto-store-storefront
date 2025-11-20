"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useParams } from "next/navigation"
import VehicleCard from "@modules/store/components/vehicle-card"
import LoadMoreButton from "@modules/store/components/load-more-button"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 9

type PaginatedProductsClientProps = {
  initialProducts: HttpTypes.StoreProduct[]
  initialCount: number
  region: HttpTypes.StoreRegion
  sortBy?: SortOptions
  countryCode: string
}

export default function PaginatedProductsClient({
  initialProducts,
  initialCount,
  region,
  sortBy,
  countryCode,
}: PaginatedProductsClientProps) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Calculer hasMore : il y a plus de produits si le nombre de produits chargés est inférieur au total
  const calculateHasMore = (currentProducts: HttpTypes.StoreProduct[], totalCount: number) => {
    // Si on a moins de produits que le total, il y en a plus à charger
    return currentProducts.length < totalCount
  }
  
  const [hasMore, setHasMore] = useState(() => {
    const result = calculateHasMore(initialProducts, initialCount)
    console.log('🔍 Initial hasMore calculation:', {
      productsCount: initialProducts.length,
      totalCount: initialCount,
      hasMore: result,
      PRODUCT_LIMIT
    })
    return result
  })

  // Réinitialiser quand les paramètres de recherche changent
  useEffect(() => {
    setProducts(initialProducts)
    setPage(1)
    const newHasMore = calculateHasMore(initialProducts, initialCount)
    console.log('🔄 Effect hasMore calculation:', {
      productsCount: initialProducts.length,
      totalCount: initialCount,
      hasMore: newHasMore
    })
    setHasMore(newHasMore)
  }, [initialProducts, initialCount])

  const loadMore = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    const nextPage = page + 1

    try {
      const params = new URLSearchParams(searchParams)
      params.set("page", String(nextPage))
      params.set("countryCode", countryCode)
      if (sortBy) {
        params.set("sortBy", sortBy)
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        const newProducts = [...products, ...data.products]
        setProducts(newProducts)
        setPage(nextPage)
        // Utiliser hasMore de l'API ou calculer basé sur le nombre total
        const newHasMore = data.hasMore !== undefined 
          ? data.hasMore 
          : calculateHasMore(newProducts, initialCount)
        setHasMore(newHasMore)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more products:", error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <VehicleCard product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {/* Debug info - à retirer en production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="text-center mt-4 text-sm text-gray-500">
          Debug: {products.length} produits / {initialCount} total | hasMore: {hasMore ? 'true' : 'false'}
        </div>
      )} */}
      <LoadMoreButton hasMore={hasMore} isLoading={isLoading} onLoadMore={loadMore} />
    </>
  )
}

