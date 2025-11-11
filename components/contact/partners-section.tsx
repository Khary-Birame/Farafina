import { Button } from "@/components/ui/button"
import { Handshake, Award, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PartnersSection() {
  const partners = [
    { name: "FIFA", logo: "/fifa-logo.jpg" },
    { name: "CAF", logo: "/caf-logo.jpg" },
    { name: "Nike", logo: "/nike-swoosh.png" },
    { name: "Adidas", logo: "/adidas-logo.png" },
    { name: "Puma", logo: "/puma-logo.jpg" },
    { name: "UEFA", logo: "/uefa-logo.jpg" },
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Visibilité Mondiale",
      description: "Atteignez des audiences à travers l'Afrique et au-delà",
    },
    {
      icon: TrendingUp,
      title: "Croissance de la Marque",
      description: "Alignez-vous avec l'excellence et le développement des jeunes",
    },
    {
      icon: Award,
      title: "Impact Social",
      description: "Soutenez la prochaine génération de talents africains",
    },
    {
      icon: Handshake,
      title: "Alliance Stratégique",
      description: "Rejoignez un réseau de partenaires visionnaires",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#1A1A1A]">Nos Partenaires</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Rejoignez notre réseau de partenaires visionnaires soutenant la jeunesse et l'excellence en Afrique.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16 border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="w-full h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-12">
            <h3 className="font-sans font-bold text-2xl text-center mb-8 text-[#1A1A1A]">Pourquoi Partenarier avec Nous ?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-[#D4AF37]" size={32} />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 text-[#1A1A1A]">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="font-sans font-bold text-2xl md:text-3xl mb-4">Devenez Partenaire</h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Ensemble, nous pouvons créer des opportunités pour les jeunes talents africains et construire l'avenir du football.
            </p>
            <Link href="/partners">
              <Button className="bg-[#ffffff] hover:bg-gray-100 text-[#D4AF37] font-semibold px-8 h-12 text-base">
                Devenir Partenaire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
