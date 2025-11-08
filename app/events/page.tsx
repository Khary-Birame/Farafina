import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsHero } from "@/components/events/events-hero"
import { EventsIntroduction } from "@/components/events/events-introduction"
import { EventsGrid } from "@/components/events/events-grid"
import { FeaturedEvent } from "@/components/events/featured-event"
import { EventsGallery } from "@/components/events/events-gallery"
import { EventsCTA } from "@/components/events/events-cta"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
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

