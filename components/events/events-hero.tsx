"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Sparkles, TrendingUp, Users, MapPin } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { useEffect, useState } from "react"

export function EventsHero() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1012] via-[#1a1a1a] to-[#0f1012]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Parallax Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/african-youth-football-training-action-shot.jpg"
            alt="Événements Farafina"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
        
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
              <Sparkles className="w-4 h-4" />
              <span>{t("events.hero.badge") || "Calendrier des Événements"}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-8xl text-white mb-8 leading-tight text-center">
            <span className="block bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent animate-gradient">
              {t("events.hero.title") || "Nos Événements"}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
            {t("events.hero.description") || "Rejoignez-nous pour des expériences uniques : détections, stages, tournois et bien plus encore."}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-[#D4AF37] mb-2">8+</div>
              <div className="text-sm text-white/70 font-semibold uppercase tracking-wide">Événements</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-[#D4AF37] mb-2">500+</div>
              <div className="text-sm text-white/70 font-semibold uppercase tracking-wide">Participants</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-[#D4AF37] mb-2">100%</div>
              <div className="text-sm text-white/70 font-semibold uppercase tracking-wide">Satisfaction</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#calendar">
              <Button
                size="lg"
                className="group h-14 px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300"
              >
                {t("events.hero.calendarButton") || "Voir le Calendrier"}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg font-bold rounded-xl transition-all duration-300"
              >
                {t("events.hero.tryoutButton") || "Postuler"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
