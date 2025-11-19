import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
  HelpCircle,
  Info,
} from "lucide-react"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Vendre votre véhicule", href: "/sell" },
    { label: "Garanties", href: "/guarantees" },
    { label: "FAQ", href: "/faq" },
  ]

  const legalLinks = [
    { label: "Conditions Générales de Vente", href: "/cgv" },
    { label: "Conditions Générales d'Utilisation", href: "/cgu" },
    { label: "Mentions Légales", href: "/legal" },
    { label: "Politique de Confidentialité", href: "/privacy" },
    { label: "Politique des Cookies", href: "/cookies" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: Youtube,
    },
  ]

  return (
    <footer className="border-t border-ui-border-base w-full bg-gray-900 text-white">
      <div className="content-container flex flex-col w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 lg:py-16">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <LocalizedClientLink href="/" className="flex items-center gap-2">
              <Image
                src="/images/asr-auto-logo.png"
                alt="ASR Auto Logo"
                width={140}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </LocalizedClientLink>
            <p className="text-base text-gray-300 leading-relaxed">
              Votre partenaire de confiance pour l'achat de voitures en toute
              transparence. Inspection rigoureuse, garantie écrite, livraison
              suivie.
            </p>
            {/* Social Media */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-blue hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">
              Liens Rapides
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories & Collections */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <div className="flex flex-col gap-4">
              {productCategories && productCategories?.length > 0 && (
                <div>
                  <span className="text-base font-medium text-gray-300 mb-2 block">
                    Catégories
                  </span>
                  <ul
                    className="flex flex-col gap-2"
                    data-testid="footer-categories"
                  >
                    {productCategories?.slice(0, 5).map((c) => {
                      if (c.parent_category) {
                        return null
                      }
                      return (
                        <li key={c.id}>
                          <LocalizedClientLink
                            className="text-base text-gray-300 hover:text-white transition-colors"
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {collections && collections.length > 0 && (
                <div>
                  <span className="text-base font-medium text-gray-300 mb-2 block">
                    Collections
                  </span>
                  <ul className="flex flex-col gap-2">
                    {collections?.slice(0, 5).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-base text-gray-300 hover:text-white transition-colors"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">
              Contact & Informations
            </h3>
            <div className="flex flex-col gap-3 text-base text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-blue flex-shrink-0 mt-0.5" />
                <p>
                  123 Avenue de l'Automobile
                  <br />
                  75000 Paris, France
                </p>
              </div>
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 text-primary-blue flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </a>
              <a
                href="mailto:contact@asr-auto.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-primary-blue flex-shrink-0" />
                <span>contact@asr-auto.com</span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <h4 className="text-base font-medium text-gray-300 mb-3">
                Informations Légales
              </h4>
              <ul className="flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-base text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label === "Conditions Générales de Vente" && (
                        <FileText className="h-4 w-4" />
                      )}
                      {link.label === "Mentions Légales" && (
                        <Info className="h-4 w-4" />
                      )}
                      {link.label === "Politique de Confidentialité" && (
                        <Shield className="h-4 w-4" />
                      )}
                      {link.label === "FAQ" && (
                        <HelpCircle className="h-4 w-4" />
                      )}
                      <span>{link.label}</span>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-base text-gray-300">
              © {currentYear} ASR Auto. Tous droits réservés.
            </Text>
            <div className="flex items-center gap-6 text-base text-gray-300">
              <LocalizedClientLink
                href="/legal"
                className="hover:text-white transition-colors"
              >
                Mentions légales
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Confidentialité
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookies
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
