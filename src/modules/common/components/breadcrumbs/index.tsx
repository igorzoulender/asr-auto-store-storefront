import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export { BreadcrumbItem }

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
  "data-testid"?: string
}

const Breadcrumbs = ({ items, className, "data-testid": dataTestId }: BreadcrumbsProps) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav
      className={`content-container py-4 ${className || ""}`}
      aria-label="Breadcrumb"
      data-testid={dataTestId}
    >
      <ol className="flex items-center flex-wrap gap-x-2 text-sm text-gray-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const hasLink = item.href && item.href !== ""

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {hasLink ? (
                <LocalizedClientLink
                  href={item.href!}
                  className={`transition-colors ${
                    isLast
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </LocalizedClientLink>
              ) : (
                <span
                  className={isLast ? "text-gray-900 font-medium" : "text-gray-600"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-gray-400 ml-2" aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

