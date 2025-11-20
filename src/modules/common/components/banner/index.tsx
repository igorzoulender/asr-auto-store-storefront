import Image from "next/image"

export type BannerProps = {
  image?: string
  title?: string
  subtitle?: string
  className?: string
  imageClassName?: string
  "data-testid"?: string
}

const DEFAULT_BANNER_IMAGE = "/images/banners/car-banner.jpg"

const Banner = ({
  image = DEFAULT_BANNER_IMAGE,
  title,
  subtitle,
  className,
  imageClassName,
  "data-testid": dataTestId,
}: BannerProps) => {
  return (
    <div
      className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-900 ${
        className || ""
      }`}
      data-testid={dataTestId}
    >
      <Image
        src={image}
        alt={title || "Bannière"}
        fill
        className={`object-cover ${imageClassName || ""}`}
        priority
        sizes="100vw"
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center justify-center">
          <div className="content-container w-full text-center">
            {title && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-200 mt-4">{subtitle}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner

