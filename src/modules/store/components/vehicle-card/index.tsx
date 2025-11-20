"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import {
  Gauge,
  Fuel,
  Cog,
  Car,
  GaugeCircle,
  Disc3,
  BatteryCharging,
} from "lucide-react"

type VehicleFeature = {
  label: string
  icon: React.ReactNode
}

type VehicleCardProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const VehicleCard = ({ product, region }: VehicleCardProps) => {
  const { cheapestPrice } = getProductPrice({ product })

  // Extraire les métadonnées du produit
  const metadata = product.metadata || {}
  const mileage = metadata.mileage || metadata.kilometrage || ""
  const transmission = metadata.transmission || metadata.boite || ""
  const fuel = metadata.fuel || metadata.carburant || ""
  const color = metadata.color || metadata.couleur || ""
  const drive = metadata.drive || metadata.traction || ""
  const engine = metadata.engine || metadata.moteur || ""
  const brakes = metadata.brakes || metadata.freins || ""
  const status = metadata.status || metadata.etat || ""

  // Construire le sous-titre
  const subtitleParts = [mileage, transmission, fuel, color].filter(Boolean)
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(" • ") : ""

  // Construire les caractéristiques
  const features: VehicleFeature[] = []
  if (mileage) features.push({ label: mileage, icon: <Gauge size={22} /> })
  if (transmission) features.push({ label: transmission, icon: <Cog size={22} /> })
  if (drive) features.push({ label: drive, icon: <Car size={22} /> })
  if (fuel) {
    const fuelIcon = fuel.toLowerCase().includes("électrique") || fuel.toLowerCase().includes("electric") ? (
      <BatteryCharging size={22} />
    ) : (
      <Fuel size={22} />
    )
    features.push({ label: fuel, icon: fuelIcon })
  }
  if (engine) features.push({ label: engine, icon: <GaugeCircle size={22} /> })
  if (brakes) features.push({ label: brakes, icon: <Disc3 size={22} /> })

  // Obtenir l'image du produit
  const productImage = product.thumbnail || product.images?.[0]?.url || "/images/placeholder-vehicle.jpg"

  // Formater le prix
  const priceDisplay = cheapestPrice?.calculated_price || "Prix sur demande"

  return (
    <article className="bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden">
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div className="relative h-80 w-full group overflow-hidden cursor-pointer">
          <Image
            src={productImage}
            alt={product.title || "Véhicule"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          {status && (
            <span className="absolute top-4 left-4 bg-primary-red text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full z-20">
              {status}
            </span>
          )}

          {/* Effet de gradient animé qui monte */}
          <div
            className="
              absolute inset-0 
              bg-gradient-to-t from-black/70 to-transparent 
              translate-y-full 
              group-hover:translate-y-0 
              transition-transform 
              duration-500 
              z-10
            "
          ></div>

          {/* Texte qui apparaît avec délai */}
          <div
            className="
              absolute inset-0 bg-primary-blue/65  
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-150 
              delay-100 text-center
              flex flex-col items-center justify-center 
              p-6 text-white z-20
            "
          >
            <h3 className="text-3xl font-bold leading-9">{product.title}</h3>
            <p className="text-3xl mt-4">{priceDisplay}</p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h3>

            {subtitle && (
              <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
            )}

            {features.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                {features.map((feature, index) => (
                  <p
                    className="text-sm flex items-center gap-2 text-gray-600"
                    key={`${product.id}-feature-${index}`}
                  >
                    <span className="font-bold text-primary-blue">{feature.icon}</span>
                    <span className="font-bold">{feature.label}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <span className="text-xs uppercase text-gray-400">Prix</span>
              <p className="text-2xl font-bold text-primary-red">
                {priceDisplay}
              </p>
            </div>
            <button className="text-sm font-semibold text-primary-red hover:text-primary-red/80">
              Voir détails →
            </button>
          </div>
        </div>
      </LocalizedClientLink>
    </article>
  )
}

export default VehicleCard

