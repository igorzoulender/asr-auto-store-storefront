import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} bg-[#fbfbfc]`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
