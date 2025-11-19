import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import PopularBrands from "@modules/home/components/popular-brands"
import TrendingVehicles from "@modules/home/components/trending-vehicles"
import HowItWorks from "@modules/home/components/how-It-works"
import WhyChooseUs from "@modules/home/components/why-choose-us"

export const metadata: Metadata = {
  title: "ASR-AUTO - Accueil",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Achetez votre voiture en toute sérénité avec ASR-AUTO. Inspection 150 points, garantie, livraison suivie. BMW, Mercedes, Toyota disponibles.",
  
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="lg:pt-[380px] md:pt-[380px] sm:pt-[720px] pt-[780px] pb-12 space-y-0">
        {/* Section How It Works */}
        <HowItWorks />

        {/* Popular Brands */}
        <PopularBrands />

        {/* Trending Vehicles */}
        <TrendingVehicles />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul> */}
      </div>
    </>
  )
}
