"use client"

import { useParams, usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

type NavLinkProps = {
  href: string
  label: string
  "data-testid"?: string
}

const NavLink = ({ href, label, "data-testid": dataTestId }: NavLinkProps) => {
  const pathname = usePathname()
  const { countryCode } = useParams() as { countryCode: string }
  
  // Extraire le chemin actuel sans le code pays
  const currentPath = pathname.split(`/${countryCode}`)[1] || "/"
  
  // Normaliser les chemins (enlever les trailing slashes sauf pour "/")
  const normalizePath = (path: string) => {
    if (path === "/" || path === "") return "/"
    return path.endsWith("/") ? path.slice(0, -1) : path
  }
  
  const normalizedCurrentPath = normalizePath(currentPath)
  const normalizedHref = normalizePath(href)
  
  // Pour la page d'accueil, vérifier si on est exactement sur "/"
  // Pour les autres pages, vérifier si le chemin commence par le href
  let isActive = false
  if (href === "/") {
    isActive = normalizedCurrentPath === "/"
  } else {
    isActive = normalizedCurrentPath === normalizedHref || 
               normalizedCurrentPath.startsWith(normalizedHref + "/")
  }

  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "transition-colors duration-200 font-medium text-xl whitespace-nowrap",
        {
          "text-red-600": isActive,
          "text-gray-800 hover:text-gray-600": !isActive,
        }
      )}
      data-testid={dataTestId}
    >
      {label}
    </LocalizedClientLink>
  )
}

export default NavLink

