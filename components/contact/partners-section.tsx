"use client"

import { Button } from "@/components/ui/button"
import { Handshake, Award, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function PartnersSection() {
  const { t } = useTranslation()

  const partners = [
    { name: "FIFA", logo: "/fifa-logo.jpg" },
    { name: "CAF", logo: "/caf-logo.jpg" },
    { name: "Nike", logo: "/nike-swoosh.png" },
    { name: "Adidas", logo: "/adidas-logo.png" },
    { name: "Puma", logo: "/puma-logo.jpg" },
    { name: "UEFA", logo: "/uefa-logo.jpg" },
  ]

  const benefits = useMemo(() => [
    {
      icon: Globe,
      title: t("contact.partners.benefits.global.title"),
      description: t("contact.partners.benefits.global.description"),
    },
    {
      icon: TrendingUp,
      title: t("contact.partners.benefits.brand.title"),
      description: t("contact.partners.benefits.brand.description"),
    },
    {
      icon: Award,
      title: t("contact.partners.benefits.social.title"),
      description: t("contact.partners.benefits.social.description"),
    },
    {
      icon: Handshake,
      title: t("contact.partners.benefits.strategic.title"),
      description: t("contact.partners.benefits.strategic.description"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full mb-4">
              <Handshake className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wide">Partenariats</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#1A1A1A]">{t("contact.partners.title", "Nos Partenaires")}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("contact.partners.description", "Rejoignez notre réseau de partenaires visionnaires soutenant la jeunesse et l'excellence en Afrique.")}
            </p>
          </div>

          {/* Partners Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-gray-200/80 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="w-full h-24 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/80 flex items-center justify-center p-4 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-12">
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-center mb-12 text-[#1A1A1A]">{t("contact.partners.whyPartner.title", "Pourquoi Partenarier avec Nous ?")}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div 
                    key={index} 
                    className="group bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 text-center hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37]/30 group-hover:to-[#D4AF37]/20 transition-all duration-300 shadow-sm">
                      <Icon className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" size={32} />
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#D4AF37] via-[#B8941F] to-[#D4AF37] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h3 className="font-sans font-bold text-2xl md:text-3xl mb-4">{t("contact.partners.cta.title", "Devenez Partenaire")}</h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("contact.partners.cta.description", "Ensemble, nous pouvons créer des opportunités pour les jeunes talents africains et construire l'avenir du football.")}
              </p>
              <Link href="/partners">
                <Button className="bg-white hover:bg-gray-100 text-[#D4AF37] font-semibold px-8 h-14 text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {t("contact.partners.cta.button", "Devenir Partenaire")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
