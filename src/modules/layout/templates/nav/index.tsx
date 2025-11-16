import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSelect from "@modules/layout/components/language-select"
import NavLink from "@modules/layout/components/nav-link"
import Search from "@modules/common/icons/search"
import User from "@modules/common/icons/user"

const menuItems = [
  { label: "Accueil", href: "/" },
  { label: "Acheter", href: "/store" },
  { label: "Vendre", href: "/sell" },
  { label: "A-propos", href: "/about" },
  { label: "Garanties", href: "/guarantees" },
  { label: "Contact", href: "/contact" },
]

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-28 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-lg-regular">
          {/* Left side - Hamburger menu (visible on MD/SM) and Logo (centered on MD/SM) */}
          <div className="flex-1 basis-0 h-full flex items-center lg:hidden">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Logo - Centered on MD/SM, Left on LG */}
          <div className="flex items-center h-full lg:flex-1 lg:basis-0">
            <LocalizedClientLink
              href="/"
              className="flex items-center h-full"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/asr-auto-logo.png"
                alt="ASR AUTO"
                width={180}
                height={60}
                className="h-24 w-auto object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Desktop Menu - Visible on LG screens */}
          <div className="hidden lg:flex items-center gap-x-8 h-full flex-1 basis-0">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                data-testid={`nav-${item.label.toLowerCase()}-link`}
              />
            ))}
          </div>

          {/* Right side - Icons (Search, Account, Cart, Language) */}
          <div className="flex items-center gap-x-5 lg:gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Search Icon */}
            <LocalizedClientLink
              href="/search"
              className="hover:text-gray-600 text-gray-800 transition-colors flex items-center"
              data-testid="nav-search-link"
            >
              <Search size={24} />
            </LocalizedClientLink>

            {/* Language Selector - Visible on MD and larger screens */}
            {regions && (
              <div className="hidden md:block">
                <LanguageSelect regions={regions} />
              </div>
            )}

            {/* Account Icon */}
            <LocalizedClientLink
              className="hover:text-gray-600 text-gray-800 transition-colors flex items-center"
              href="/account"
              data-testid="nav-account-link"
            >
              <User size={24} />
            </LocalizedClientLink>

            {/* Cart Icon */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-gray-600 text-gray-800 transition-colors flex gap-2 items-center"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <span className="sr-only">Cart</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
