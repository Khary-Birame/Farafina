"use client"

import { Button } from "@/components/ui/button"
import { Globe, ArrowRight, Sparkles, Play } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"

export function InternationalHeroPremium() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1012] via-[#1a1a1a] to-[#0f1012]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/african-football-academy-elite-training.jpg"
            alt="International Players at Farafina"
            fill
            className="object-cover opacity-20"
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
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] px-6 py-3 rounded-full text-sm font-bold border border-[#D4AF37]/30 shadow-lg">
              <Globe className="w-4 h-4" />
              <span>{t("international.hero.badge", "Programme International")}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 leading-tight text-center">
            <span className="block bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent animate-gradient">
              {t("international.hero.title", "Rejoignez l'Excellence Internationale")}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-[#D4AF37] font-bold mb-6 text-center">
            {t("international.hero.tagline", "Où les talents du monde entier se rencontrent")}
          </p>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed text-center max-w-4xl mx-auto drop-shadow-lg">
            {t("international.hero.description", "Accueillons des joueurs internationaux avec un encadrement complet : sécurité, hébergement, développement sportif et académique, intégration culturelle. Votre avenir professionnel commence ici.")}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            {[
              { value: "50+", label: t("international.hero.stats.countries", "Pays") },
              { value: "200+", label: t("international.hero.stats.players", "Joueurs") },
              { value: "24/7", label: t("international.hero.stats.support", "Support") },
              { value: "100%", label: t("international.hero.stats.success", "Réussite") },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#application">
              <Button
                size="lg"
                className="group h-16 px-12 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300"
              >
                {t("international.hero.ctaPrimary", "Demander un Dossier")}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg rounded-xl transition-all duration-300"
              >
                {t("international.hero.ctaSecondary", "Réserver un Appel")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
            {t("international.hero.scroll", "Découvrir")}
          </span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

