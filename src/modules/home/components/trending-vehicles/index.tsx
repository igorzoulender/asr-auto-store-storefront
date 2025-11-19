"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Eye from "@modules/common/icons/eye"
import Image from "next/image"
import {
  Gauge,
  Fuel,
  Cog,
  Car,
  GaugeCircle,
  Disc3,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

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
    image: "/images/trending/audi-1.jpg",
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
    image: "/images/trending/tesla-1.jpg",
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
    image: "/images/trending/jeep-1.jpg",
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

  {
    id: "jeep-grand-rest",
    title: "Jeep Grand Cherokee 2021",
    subtitle: "1 500 km • Automatique • Diesel • Blanc",
    image: "/images/trending/audi-1.jpg",
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
  const [currentIndex, setCurrentIndex] = useState(vehicles.length) // Commencer au début des originaux
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Dupliquer les véhicules pour créer l'effet infini
  const duplicatedVehicles = [...vehicles, ...vehicles, ...vehicles]

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

  // Gérer la boucle infinie
  useEffect(() => {
    if (isTransitioning) {
      // Attendre la fin de la transition avant de vérifier
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        if (currentIndex >= vehicles.length * 2) {
          // Si on est à la fin des copies, sauter au début des originaux sans transition
          setCurrentIndex(vehicles.length)
        } else if (currentIndex < vehicles.length) {
          // Si on est avant les originaux, sauter à la fin des copies sans transition
          setCurrentIndex(vehicles.length * 2 - 1)
        }
      }, 500) // Durée de la transition

      return () => clearTimeout(timer)
    }
  }, [currentIndex, isTransitioning])

  // Auto-slide toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, 3000) // 3 secondes

    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const cardWidth = 100 / itemsPerView

  return (
    <section className="py-16 md:py-24">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Véhicules Tendance Du Moment
            </h2>
            <div className="h-1 w-24 bg-primary-red mt-4 rounded-full" />
          </div>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl">
            Explorez les véhicules actuellement les plus convoités pour leurs
            performances exceptionnelles et leur design résolument moderne.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}%)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-out"
                  : "none",
              }}
            >
              {duplicatedVehicles.map((vehicle, index) => (
                <article
                  key={`${vehicle.id}-${index}`}
                  className="bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden mx-3"
                  style={{ flex: `0 0 calc(${cardWidth}% - 1rem)` }}
                >
                  <div className="relative h-80 w-full group overflow-hidden cursor-pointer">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {vehicle.status && (
                      <span className="absolute top-4 left-4 bg-primary-red text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full z-20">
                        {vehicle.status}
                      </span>
                    )}

                    {/* 🔥 Effet de gradient animé qui monte */}
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
                      <h3 className="text-3xl font-bold leading-9">{vehicle.title}</h3>
                      <p className="text-3xl mt-4">{vehicle.price}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {vehicle.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                        {vehicle.features.map((feature, index) => (
                          <p
                            className="text-sm flex items-center gap-2 text-gray-600"
                            key={`${vehicle.id}-${index}`}
                          >
                            <span className="font-bold text-primary-blue">{feature.icon}</span>
                            <span className="font-bold">{feature.label}</span>
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <span className="text-xs uppercase text-gray-400">
                          Prix
                        </span>
                        <p className="text-2xl font-bold text-primary-red">
                          {vehicle.price}
                        </p>
                      </div>
                      <button className="text-sm font-semibold text-primary-red hover:text-primary-red/80">
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-50 transition-colors z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-50 transition-colors z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <LocalizedClientLink
            href={`/catalogue`}
            className="bg-primary-blue text-white px-8 py-4 text-lg font-semibold hover:bg-primary-red transition-colors shadow-lg"
          >
            <Eye size={20} className="inline-block mr-2" />
            Consulter le catalogue
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default TrendingVehicles
