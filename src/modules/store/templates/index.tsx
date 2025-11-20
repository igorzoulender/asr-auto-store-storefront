import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Banner from "@modules/common/components/banner"
import BannerBreadcrumbs from "@modules/common/components/banner-breadcrumbs"
import StoreFilter from "@modules/store/components/store-filter"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="w-full" data-testid="store-container">
      {/* Banner with Breadcrumbs */}
      <div className="relative">
        <Banner
          title="Notre Collection de Véhicules"
          subtitle="Trouvez le véhicule parfait pour vous"
          data-testid="store-banner"
        />
        <BannerBreadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Acheter" },
          ]}
          data-testid="store-breadcrumbs"
        />
      </div>

      {/* Main content with filter and products */}
      <div className="content-container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar - sticky on scroll */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <StoreFilter />
          </div>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={<SkeletonProductGrid numberOfProducts={9} />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
