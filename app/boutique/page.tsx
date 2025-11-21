import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BoutiqueHero } from "@/components/boutique/boutique-hero"
import { BoutiqueProducts } from "@/components/boutique/boutique-products"
import { BoutiqueCTA } from "@/components/boutique/boutique-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boutique Officielle | Académie Farafina",
  description: "Découvrez la collection exclusive de l'académie Farafina. Maillots, survêtements et accessoires officiels pour soutenir nos talents.",
  keywords: "boutique, maillot, survêtement, accessoire, football, académie, farafina",
  openGraph: {
    title: "Boutique Officielle | Académie Farafina",
    description: "Collection exclusive de produits officiels de l'académie Farafina",
    type: "website",
  },
}

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#0f1012]">
      <Header variant="solid" />
      <main>
        <BoutiqueHero />
        <BoutiqueProducts />
        <BoutiqueCTA />
      </main>
      <Footer />
    </div>
  )
}
