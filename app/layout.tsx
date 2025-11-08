import type React from "react"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { CartProvider } from "@/components/providers/cart-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Farafina Foot Academy | The Future of African Football",
  description:
    "Elite sport-study institution in Cayar, Senegal. Discovering, training, and promoting young football talents across Africa.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          {children}
          <ScrollToTop />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  )
}
