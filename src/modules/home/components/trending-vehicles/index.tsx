"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Gauge, Fuel, Cog, Car, GaugeCircle, Disc3, BatteryCharging, ChevronLeft, ChevronRight } from "lucide-react"

type VehicleFeature = {
  label: string
  icon: React.ReactNode
}

type VehicleCard = {
  id: string
  title: string
  subtitle: string
  image: string
  price: string
  status?: string
  features: VehicleFeature[]
}

const vehicles: VehicleCard[] = [
  {
    id: "audi-s4",
    title: "Audi S4 2020",
    subtitle: "18 360 km • Manuelle • Essence • Noir",
    image: "/images/trending/audi-s4.jpg",
    price: "49 950 €",
    status: "Sale",
    features: [
      { label: "18 360 km", icon: <Gauge size={22} /> },
      { label: "Manuelle", icon: <Cog size={22} /> },
      { label: "Quattro", icon: <Car size={22} /> },
      { label: "Essence", icon: <Fuel size={22} /> },
      { label: "V6 3.0L", icon: <GaugeCircle size={22} /> },
      { label: "Freins Disque", icon: <Disc3 size={22} /> },
    ],
  },
  {
    id: "tesla-model-3",
    title: "Tesla Model 3",
    subtitle: "975 km • Automatique • Électrique • Gris",
    image: "/images/trending/tesla-model-3.jpg",
    price: "42 800 €",
    features: [
      { label: "975 km", icon: <Gauge size={22} /> },
      { label: "Automatique", icon: <Cog size={22} /> },
      { label: "Propulsion", icon: <Car size={22} /> },
      { label: "Électrique", icon: <BatteryCharging size={22} /> },
      { label: "Dual Motor", icon: <GaugeCircle size={22} /> },
      { label: "Freins Régén.", icon: <Disc3 size={22} /> },
    ],
  },
  {
    id: "jeep-grand-cherokee",
    title: "Jeep Grand Cherokee 2021",
    subtitle: "1 500 km • Automatique • Diesel • Blanc",
    image: "/images/trending/jeep-grand-cherokee.jpg",
    price: "35 460 €",
    status: "Nouveau",
    features: [
      { label: "1 500 km", icon: <Gauge size={22} /> },
      { label: "Automatique", icon: <Cog size={22} /> },
      { label: "4x4", icon: <Car size={22} /> },
      { label: "Diesel", icon: <Fuel size={22} /> },
      { label: "V6 3.6L", icon: <GaugeCircle size={22} /> },
      { label: "Freins Disque", icon: <Disc3 size={22} /> },
    ],
  },
]

const TrendingVehicles = () => {
  const [itemsPerView, setItemsPerView] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)

    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, vehicles.length - itemsPerView)

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const cardWidth = 100 / itemsPerView

  return (
    <section className="bg-[#fbfbfc] py-16 md:py-24">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Véhicules Tendance Du Moment
            </h2>
            <div className="h-1 w-24 bg-red-600 mt-4 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl">
            Explorez les véhicules actuellement les plus convoités pour leurs performances
            exceptionnelles et leur design résolument moderne.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[32px]">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}%)`,
              }}
            >
              {vehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden"
                  style={{ flex: `0 0 calc(${cardWidth}% - 1rem)` }}
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {vehicle.status && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                        {vehicle.status}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{vehicle.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{vehicle.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      {vehicle.features.map((feature, index) => (
                        <div
                          key={`${vehicle.id}-${index}`}
                          className="flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3 text-gray-600 bg-gray-50/30"
                        >
                          <span className="text-red-500">{feature.icon}</span>
                          <p className="text-xs font-medium">{feature.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <span className="text-xs uppercase text-gray-400">Prix</span>
                        <p className="text-2xl font-bold text-red-600">{vehicle.price}</p>
                      </div>
                      <button className="text-sm font-semibold text-red-600 hover:text-red-700">
                        Voir détails →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TrendingVehicles

