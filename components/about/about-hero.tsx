"use client"

import { useTranslation } from "@/lib/hooks/use-translation"

export function AboutHero() {
  const { t } = useTranslation()

  return (
    <section data-section="hero" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/farafina-academy-campus-aerial-view.jpg"
          alt="Farafina Foot Academy Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-[#1A1A1A]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        <h1 className="font-sans font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 xs:mb-5 sm:mb-6 animate-fade-in-up text-balance">
          {t("home.hero.title")}
        </h1>
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms] text-pretty px-2">
          {t("home.hero.subtitle")}
        </p>
      </div>
    </section>
  )
}
