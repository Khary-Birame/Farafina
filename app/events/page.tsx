import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsHero } from "@/components/events/events-hero"
import { EventsIntroduction } from "@/components/events/events-introduction"
import { EventsGrid } from "@/components/events/events-grid"
import { FeaturedEvent } from "@/components/events/featured-event"
import { EventsGallery } from "@/components/events/events-gallery"
import { EventsCTA } from "@/components/events/events-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Événements | Académie Farafina",
  description: "Découvrez tous nos événements : détections, stages, tournois, visites et bien plus encore. Rejoignez-nous pour des expériences uniques.",
  keywords: "événements, détection, stage, tournoi, football, académie, farafina",
  openGraph: {
    title: "Événements | Académie Farafina",
    description: "Calendrier complet des événements de l'académie Farafina",
    type: "website",
  },
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#0f1012]">
      <Header variant="solid" />
      <main>
        <EventsHero />
        <EventsIntroduction />
        <FeaturedEvent />
        <EventsGrid />
        <EventsGallery />
        <EventsCTA />
      </main>
      <Footer />
    </div>
  )
}
