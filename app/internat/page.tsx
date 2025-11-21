import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InternatHero } from "@/components/internat/internat-hero"
import { InternatIntroduction } from "@/components/internat/internat-introduction"
import { InternatFacilities } from "@/components/internat/internat-facilities"
import { InternatSupport } from "@/components/internat/internat-support"
import { InternatBenefits } from "@/components/internat/internat-benefits"
import { InternatDailySchedule } from "@/components/internat/internat-daily-schedule"
import { InternatPricing } from "@/components/internat/internat-pricing"
import { InternatFAQ } from "@/components/internat/internat-faq"
import { InternatTestimonials } from "@/components/internat/internat-testimonials"
import { InternatGallery } from "@/components/internat/internat-gallery"
import { InternatCTA } from "@/components/internat/internat-cta"
import { RevealScript } from "@/components/reveal-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Espace Internat | Académie Farafina",
  description: "Découvrez notre internat premium : hébergement confortable, encadrement professionnel 24/7, installations modernes et suivi personnalisé pour l'épanouissement de nos jeunes talents.",
  keywords: "internat, résidence, hébergement, académie, football, farafina, internat sportif",
  openGraph: {
    title: "Espace Internat | Académie Farafina",
    description: "Un environnement sécurisé et moderne pour l'épanouissement de nos jeunes talents",
    type: "website",
  },
}

export default function InternatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main>
        <InternatHero />
        <InternatIntroduction />
        <InternatFacilities />
        <InternatSupport />
        <InternatBenefits />
        <InternatDailySchedule />
        <InternatPricing />
        <InternatFAQ />
        <InternatTestimonials />
        <InternatGallery />
        <InternatCTA />
      </main>
      <Footer />
      <RevealScript />
    </div>
  )
}
