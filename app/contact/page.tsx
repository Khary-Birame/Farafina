import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { MapSection } from "@/components/contact/map-section"
import { PartnersSection } from "@/components/contact/partners-section"
import { NewsletterBanner } from "@/components/contact/newsletter-banner"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactHero />
      <ContactForm />
      <MapSection />
      <PartnersSection />
      <NewsletterBanner />
      <Footer />
    </div>
  )
}
