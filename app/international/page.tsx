import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InternationalHeroPremium } from "@/components/international/international-hero-premium"
import { InternationalMission } from "@/components/international/international-mission"
import { InternationalWhyChoose } from "@/components/international/international-why-choose"
import { InternationalSupportProgram } from "@/components/international/international-support-program"
import { InternationalHousing } from "@/components/international/international-housing"
import { InternationalTrainingCenter } from "@/components/international/international-training-center"
import { InternationalNetwork } from "@/components/international/international-network"
import { InternationalTestimonialsPremium } from "@/components/international/international-testimonials-premium"
import { InternationalGallery } from "@/components/international/international-gallery"
import { InternationalCTAPremium } from "@/components/international/international-cta-premium"
import { RevealScript } from "@/components/reveal-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programme International | Farafina Foot Academy",
  description: "Rejoignez l'excellence internationale. Accueil, encadrement complet, hébergement premium et développement professionnel pour les joueurs internationaux à Farafina Foot Academy.",
  keywords: "académie football internationale, programme international, joueurs étrangers, centre formation international, football academy international",
  openGraph: {
    title: "Programme International | Farafina Foot Academy",
    description: "Où les talents du monde entier se rencontrent",
    type: "website",
  },
}

export default function InternationalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main>
        <InternationalHeroPremium />
        <InternationalMission />
        <InternationalWhyChoose />
        <InternationalSupportProgram />
        <InternationalHousing />
        <InternationalTrainingCenter />
        <InternationalNetwork />
        <InternationalTestimonialsPremium />
        <InternationalGallery />
        <InternationalCTAPremium />
      </main>
      <Footer />
      <RevealScript />
    </div>
  )
}
