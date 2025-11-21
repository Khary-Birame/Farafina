"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Trophy, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"

export function EventsCTA() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full mb-6">
            <Heart className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">Rejoignez-nous</span>
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/20 rounded-full mb-6 backdrop-blur-sm border border-[#D4AF37]/30">
            <Trophy className="w-10 h-10 text-[#D4AF37]" />
          </div>

          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent animate-gradient">
              {t("events.cta.title") || "Prêt à Relever le Défi ?"}
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            {t("events.cta.description") || "Ne manquez pas nos prochains événements. Inscrivez-vous dès maintenant et vivez une expérience unique avec l'académie Farafina."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#calendar">
              <Button
                size="lg"
                className="group h-16 px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("events.cta.calendarButton") || "Voir le Calendrier"}
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg rounded-xl transition-all duration-300"
              >
                {t("events.cta.registerButton") || "S'inscrire"}
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
