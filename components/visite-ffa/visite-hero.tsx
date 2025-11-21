"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"

export function VisiteHero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1012] via-[#1a1a1a] to-[#0f1012]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/african-football-academy-elite-training.jpg"
            alt="Farafina Foot Academy"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] px-6 py-3 rounded-full text-sm font-bold border border-[#D4AF37]/30 shadow-lg">
              <Calendar className="w-4 h-4" />
              <span>{t("visite.hero.badge", "Demander une Visite")}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight text-center">
            <span className="block bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent animate-gradient">
              {t("visite.hero.title", "Demander une Visite")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed text-center max-w-3xl mx-auto drop-shadow-lg">
            {t("visite.hero.subtitle", "Découvrez nos infrastructures et rencontrez notre équipe. Une expérience immersive pour comprendre notre vision et nos valeurs.")}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a href="#formulaire">
              <Button
                size="lg"
                className="group h-14 px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300"
              >
                {t("visite.hero.cta", "Remplir le Formulaire")}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

