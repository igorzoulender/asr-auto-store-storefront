import { NextRequest, NextResponse } from "next/server"
import { listProductsWithSort } from "@lib/data/products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 9

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const countryCode = searchParams.get("countryCode") || "fr"
    const sortBy = (searchParams.get("sortBy") || "created_at") as SortOptions

    const queryParams: any = {
      limit: PRODUCT_LIMIT,
    }

    // Ajouter les filtres depuis les paramètres URL
    const brand = searchParams.get("brand")
    const models = searchParams.get("models")
    const year = searchParams.get("year")
    const type = searchParams.get("type")
    const fuel = searchParams.get("fuel")
    const transmission = searchParams.get("transmission")

    // TODO: Implémenter les filtres réels une fois que l'API backend les supporte
    // Pour l'instant, on retourne simplement les produits paginés

    const {
      response: { products, count },
    } = await listProductsWithSort({
      page,
      queryParams,
      sortBy,
      countryCode,
    })

    return NextResponse.json({
      products,
      count,
      hasMore: products.length === PRODUCT_LIMIT && page * PRODUCT_LIMIT < count,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

