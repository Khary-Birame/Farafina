import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { MapSection } from "@/components/contact/map-section"
import { NewsletterBanner } from "@/components/contact/newsletter-banner"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ContactHero />
        <ContactForm />
        <MapSection />
        <NewsletterBanner />
      </main>
      <Footer />
    </div>
  )
}
