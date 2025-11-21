"use client"

import { Newspaper, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"

export function NewsHero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#D4AF37]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/african-youth-football-training-action-shot.jpg"
            alt="Actualités Farafina"
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/95 via-[#D4AF37]/90 to-[#D4AF37]/95" />
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B8941F]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold border border-white/30 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>{t("news.hero.badge", "Actualités Officielles")}</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight text-center">
            <span className="block drop-shadow-2xl">
              {t("news.hero.title", "Actualités & Nouvelles")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed text-center max-w-3xl mx-auto drop-shadow-lg">
            {t("news.hero.description", "Restez informé des dernières actualités, événements et développements à Farafina Foot Academy.")}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-white mb-2 drop-shadow-lg">50+</div>
              <div className="text-sm text-white/95 font-semibold uppercase tracking-wide">Articles</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-white mb-2 drop-shadow-lg">12K+</div>
              <div className="text-sm text-white/95 font-semibold uppercase tracking-wide">Lecteurs</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black text-white mb-2 drop-shadow-lg">2025</div>
              <div className="text-sm text-white/95 font-semibold uppercase tracking-wide">Année Active</div>
            </div>
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
