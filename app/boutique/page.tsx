import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BoutiqueHero } from "@/components/boutique/boutique-hero"
import { BoutiqueProducts } from "@/components/boutique/boutique-products"
import { BoutiqueCTA } from "@/components/boutique/boutique-cta"

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-white">
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
