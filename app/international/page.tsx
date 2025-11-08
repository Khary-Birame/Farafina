import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InternationalHero } from "@/components/international/international-hero"
import { InternationalVision } from "@/components/international/international-vision"
import { InternationalPillars } from "@/components/international/international-pillars"
import { InternationalTestimonials } from "@/components/international/international-testimonials"
import { InternationalMap } from "@/components/international/international-map"
import { InternationalCTA } from "@/components/international/international-cta"

export default function InternationalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main>
        <InternationalHero />
        <InternationalVision />
        <InternationalPillars />
        <InternationalTestimonials />
        <InternationalMap />
        <InternationalCTA />
      </main>
      <Footer />
    </div>
  )
}

