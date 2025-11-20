import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type VehicleFeature = {
  label: string
  icon: React.ReactNode
}

export type VehicleCardProps = {
  id: string
  title: string
  subtitle?: string
  image: string
  price: string
  status?: string
  features: VehicleFeature[]
  cardWidth?: number
  href?: string
  onViewDetails?: () => void
}

const VehicleCard = ({
  id,
  title,
  subtitle,
  image,
  price,
  status,
  features,
  cardWidth,
  href,
  onViewDetails,
}: VehicleCardProps) => {
  const cardStyle = cardWidth
    ? { flex: `0 0 calc(${cardWidth}% - 1rem)` }
    : undefined

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails()
    }
  }

  const cardContent = (
    <article
      className="bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden mx-3"
      {...(cardStyle && { style: cardStyle })}
    >
      <div className="relative h-80 w-full group overflow-hidden cursor-pointer">
        <Image
          src={image}
          alt={title}
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
          <h3 className="text-3xl font-bold leading-9">{title}</h3>
          <p className="text-3xl mt-4">{price}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {features.map((feature, index) => (
              <p
                className="text-sm flex items-center gap-2 text-gray-600"
                key={`${id}-feature-${index}`}
              >
                <span className="font-bold text-primary-blue">{feature.icon}</span>
                <span className="font-bold">{feature.label}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xs uppercase text-gray-400">Prix</span>
            <p className="text-2xl font-bold text-primary-red">{price}</p>
          </div>
          {href ? (
            <LocalizedClientLink
              href={href}
              className="text-sm font-semibold text-primary-red hover:text-primary-red/80"
            >
              Voir détails →
            </LocalizedClientLink>
          ) : (
            <button
              onClick={handleViewDetails}
              className="text-sm font-semibold text-primary-red hover:text-primary-red/80"
            >
              Voir détails →
            </button>
          )}
        </div>
      </div>
    </article>
  )

  if (href) {
    return (
      <LocalizedClientLink href={href} className="block">
        {cardContent}
      </LocalizedClientLink>
    )
  }

  return cardContent
}

export default VehicleCard

