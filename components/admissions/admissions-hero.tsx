"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Award, Users } from "lucide-react"

export function AdmissionsHero() {
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-[#f29200] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Candidatures ouvertes pour 2025/2026</span>
          </div>

          {/* Heading */}
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Rejoignez l'Académie — Postulez Maintenant
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Franchissez la première étape vers l'excellence sportive. Notre processus d'admission est conçu pour être
            transparent, inclusif et accessible aux jeunes talents à travers l'Afrique.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-white text-[#f29200] hover:bg-gray-100 font-semibold group"
            >
              Commencez votre inscription
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Télécharger la brochure
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="font-semibold text-sm">Processus sécurisé</div>
                <div className="text-xs text-white/80">Cryptage SSL</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="font-semibold text-sm">500+ Étudiants</div>
                <div className="text-xs text-white/80">Depuis 2020</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="font-semibold text-sm">Bourses</div>
                <div className="text-xs text-white/80">Disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
