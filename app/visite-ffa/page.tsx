import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VisiteHero } from "@/components/visite-ffa/visite-hero"
import { VisiteIntroduction } from "@/components/visite-ffa/visite-introduction"
import { VisiteFormPremium } from "@/components/visite-ffa/visite-form-premium"
import { VisiteWhatYoullSee } from "@/components/visite-ffa/visite-what-youll-see"
import { VisiteWhyVisit } from "@/components/visite-ffa/visite-why-visit"
import { VisitePracticalInfo } from "@/components/visite-ffa/visite-practical-info"
import { RevealScript } from "@/components/reveal-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demander une Visite | Farafina Foot Academy",
  description: "Planifiez votre visite de Farafina Foot Academy. Découvrez nos infrastructures modernes, rencontrez notre équipe et comprenez notre vision d'excellence académique et sportive.",
  keywords: "visite académie, visite centre de formation, visite internat, farafina, football academy, visite école de foot",
  openGraph: {
    title: "Demander une Visite | Farafina Foot Academy",
    description: "Découvrez nos infrastructures et rencontrez notre équipe",
    type: "website",
  },
}

export default function VisiteFFAPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main>
        <VisiteHero />
        <VisiteIntroduction />
        <VisiteWhatYoullSee />
        <VisiteWhyVisit />
        <VisitePracticalInfo />
        
        {/* Form Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <VisiteFormPremium />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RevealScript />
    </div>
  )
}
