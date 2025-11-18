"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import VehicleSearchForm from "@modules/home/components/vehicle-search-form"

type SlideContent = {
  title: string
  subtitle?: string
  description?: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  titleAnimation?: "fadeIn" | "slideUp" | "slideLeft" | "zoomIn"
  subtitleAnimation?: "fadeIn" | "slideUp" | "slideLeft" | "zoomIn"
  descriptionAnimation?: "fadeIn" | "slideUp" | "slideLeft" | "zoomIn"
  buttonAnimation?: "fadeIn" | "slideUp" | "slideLeft" | "zoomIn"
}

type Slide = {
  id: number
  image: string
  alt: string
  content: SlideContent
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/heros/hero-slide-1.jpg",
    alt: "Véhicules de luxe",
    content: {
      title: "Découvrez Notre Collection",
      subtitle: "Véhicules d'Exception",
      description: "Explorez notre sélection de véhicules premium et trouvez celui qui vous correspond",
      primaryButton: {
        text: "Voir les véhicules",
        href: "/store",
      },
      secondaryButton: {
        text: "En savoir plus",
        href: "/about",
      },
      titleAnimation: "slideUp",
      subtitleAnimation: "fadeIn",
      descriptionAnimation: "slideLeft",
      buttonAnimation: "zoomIn",
    },
  },
  {
    id: 2,
    image: "/images/heros/hero-slide-2.jpg",
    alt: "Service client premium",
    content: {
      title: "Service Premium",
      subtitle: "Votre Satisfaction, Notre Priorité",
      description: "Bénéficiez d'un accompagnement personnalisé et de garanties étendues",
      primaryButton: {
        text: "Nos garanties",
        href: "/guarantees",
      },
      titleAnimation: "fadeIn",
      subtitleAnimation: "slideUp",
      descriptionAnimation: "fadeIn",
      buttonAnimation: "slideUp",
    },
  },
  {
    id: 3,
    image: "/images/heros/hero-slide-3.jpg",
    alt: "Vendez votre véhicule",
    content: {
      title: "Vendez Votre Véhicule",
      subtitle: "Estimation Gratuite",
      description: "Obtenez une estimation rapide et vendez votre véhicule au meilleur prix",
      primaryButton: {
        text: "Vendre mon véhicule",
        href: "/sell",
      },
      titleAnimation: "zoomIn",
      subtitleAnimation: "slideLeft",
      descriptionAnimation: "slideUp",
      buttonAnimation: "fadeIn",
    },
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating, currentSlide]
  )

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const getAnimationClass = (animationType?: string, delay: number = 0) => {
    const baseClass = "opacity-0"
    const delayMs = delay * 200
    
    const animationClasses: Record<string, string> = {
      fadeIn: "animate-fade-in",
      slideUp: "animate-slide-up",
      slideLeft: "animate-slide-left",
      zoomIn: "animate-zoom-in",
    }
    
    const animation = animationClasses[animationType || "fadeIn"] || "animate-fade-in"
    
    return `${baseClass} ${animation}`
  }

  return (
    <div
      className="relative h-[75vh] w-full overflow-visible bg-gray-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="content-container w-full">
          <div className="max-w-2xl px-6">
            {slides.map((slide, index) => {
              if (index !== currentSlide) return null

              const { content } = slide

              return (
                <div key={slide.id} className="space-y-6 text-white">
                  {/* Title */}
                  {content.title && (
                    <h1
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${getAnimationClass(
                        content.titleAnimation,
                        0
                      )}`}
                      style={{ animationDelay: "0ms" }}
                    >
                      {content.title}
                    </h1>
                  )}

                  {/* Subtitle */}
                  {content.subtitle && (
                    <h2
                      className={`text-xl md:text-2xl lg:text-3xl font-medium text-gray-200 ${getAnimationClass(
                        content.subtitleAnimation,
                        2
                      )}`}
                      style={{ animationDelay: "200ms" }}
                    >
                      {content.subtitle}
                    </h2>
                  )}

                  {/* Description */}
                  {content.description && (
                    <p
                      className={`text-base md:text-lg text-gray-300 max-w-xl ${getAnimationClass(
                        content.descriptionAnimation,
                        4
                      )}`}
                      style={{ animationDelay: "400ms" }}
                    >
                      {content.description}
                    </p>
                  )}

                  {/* Buttons */}
                  {(content.primaryButton || content.secondaryButton) && (
                    <div
                      className={`flex flex-wrap gap-4 pt-4 ${getAnimationClass(
                        content.buttonAnimation,
                        6
                      )}`}
                      style={{ animationDelay: "600ms" }}
                    >
                      {content.primaryButton && (
                        <LocalizedClientLink href={content.primaryButton.href}>
                          <Button
                            size="large"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                          >
                            {content.primaryButton.text}
                          </Button>
                        </LocalizedClientLink>
                      )}
                      {content.secondaryButton && (
                        <LocalizedClientLink href={content.secondaryButton.href}>
                          <Button
                            variant="secondary"
                            size="large"
                            className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                          >
                            {content.secondaryButton.text}
                          </Button>
                        </LocalizedClientLink>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Search Form Overlay */}
      <div className="absolute lg:-bottom-80 md:-bottom-[340px] sm:-bottom-[700px] -bottom-[730px] left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-[88rem] px-6">
          <VehicleSearchForm />
        </div>
      </div>
    </div>
  )
}

export default Hero
