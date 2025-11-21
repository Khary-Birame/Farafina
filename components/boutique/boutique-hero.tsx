"use client"

import { Button } from '@/components/ui/button'
import { ShoppingBag, Sparkles, ShieldCheck, Star, ArrowRight, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

export function BoutiqueHero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A] text-white min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/boutique/complet.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#D4AF37]">
                  {t("boutique.hero.badge") || "Collection Officielle"}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block">{t("boutique.hero.title")?.split(" ")[0] || "Boutique"}</span>
                <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent animate-gradient">
                  {t("boutique.hero.title")?.split(" ").slice(1).join(" ") || "Officielle"}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl leading-relaxed text-white/85 max-w-2xl">
                {t("boutique.hero.description") || "Découvrez la collection exclusive de l'académie Farafina. Maillots, survêtements et accessoires officiels pour soutenir nos talents."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#catalogue" className="w-full sm:w-auto">
                  <Button className="group h-14 px-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    <ShoppingBag className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t("boutique.hero.exploreButton") || "Explorer la Collection"}
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg transition-all duration-300"
                  >
                    {t("boutique.hero.supportButton") || "Soutenir l'Académie"}
                  </Button>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-black text-[#D4AF37] mb-1">100%</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Officiel</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-black text-[#D4AF37] mb-1">24/7</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Disponible</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-black text-[#D4AF37] mb-1">★ 4.9</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features Cards */}
            <div className="space-y-4">
              <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/5 p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Star className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-1">
                      {t("boutique.hero.features.officialGear.label") || "Équipement Officiel"}
                    </p>
                    <p className="text-base font-bold text-white">
                      {t("boutique.hero.features.officialGear.description") || "Collection authentique"}
                    </p>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/5 p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-1">
                      {t("boutique.hero.features.quality.label") || "Qualité Premium"}
                    </p>
                    <p className="text-base font-bold text-white">
                      {t("boutique.hero.features.quality.description") || "Matériaux de qualité"}
                    </p>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/5 p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-1">
                      {t("boutique.hero.features.impact.label") || "Impact Social"}
                    </p>
                    <p className="text-base font-bold text-white">
                      {t("boutique.hero.features.impact.description") || "Soutien aux talents"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
