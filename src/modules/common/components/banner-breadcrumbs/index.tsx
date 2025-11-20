import { BreadcrumbItem } from "@modules/common/components/breadcrumbs"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type BannerBreadcrumbsProps = {
  items: BreadcrumbItem[]
  "data-testid"?: string
}

const BannerBreadcrumbs = ({ items, "data-testid": dataTestId }: BannerBreadcrumbsProps) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pt-4">
      <div className="content-container">
        <nav
          className="py-2 px-4 bg-black/40 backdrop-blur-sm rounded-lg inline-block"
          aria-label="Breadcrumb"
          data-testid={dataTestId}
        >
          <ol className="flex items-center flex-wrap gap-x-2 text-sm">
            {items.map((item, index) => {
              const isLast = index === items.length - 1
              const hasLink = item.href && item.href !== ""

              return (
                <li key={`${item.label}-${index}`} className="flex items-center">
                  {hasLink ? (
                    <LocalizedClientLink
                      href={item.href!}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ) : (
                    <span
                      className={`${
                        isLast ? "text-white font-medium" : "text-white/90"
                      }`}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                  {!isLast && (
                    <span className="text-white/60 mx-2" aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default BannerBreadcrumbs

