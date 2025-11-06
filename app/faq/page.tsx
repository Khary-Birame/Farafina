import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown, HelpCircle } from "lucide-react"
import Link from "next/link"
import { AdmissionsFAQ } from "@/components/admissions/admissions-faq"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#16A34A] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Questions Fréquemment Posées</span>
              </div>

              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Questions Fréquemment Posées
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Trouvez des réponses aux questions les plus courantes sur Farafina Foot Academy, nos programmes, le processus d'admission et bien plus encore.
              </p>
            </div>
          </div>
        </section>

        {/* Admissions FAQ Section */}
        <AdmissionsFAQ />

        {/* Additional Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#2E2E2E]">
                Vous avez encore des questions ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#16A34A] hover:bg-[#d17e00] text-white">
                    Nous Contacter
                  </Button>
                </Link>
                <Link href="/apply">
                  <Button size="lg" variant="outline">
                    Postuler Maintenant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

