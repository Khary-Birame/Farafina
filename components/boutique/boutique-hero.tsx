"use client"

import { Button } from '@/components/ui/button'
import { ShoppingBag, Sparkles, ShieldCheck, Star } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from "@/lib/hooks/use-translation"

export function BoutiqueHero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-[#0f1012] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/boutique/complet.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span>{t("boutique.hero.badge")}</span>
              </div>

              <h1 className="mt-6 font-sans text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.5rem]">
                {t("boutique.hero.title")}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                {t("boutique.hero.description")}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="#catalogue" className="w-full sm:w-auto">
                  <Button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-8 font-semibold text-white transition-colors hover:bg-[#b98d2c]">
                    <ShoppingBag className="h-5 w-5" />
                    {t("boutique.hero.exploreButton")}
                  </Button>
                </Link>
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-white px-8 font-semibold text-white transition hover:bg-white/10"
                  >
                    {t("boutique.hero.supportButton")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <Star className="h-10 w-10 rounded-full bg-[#D4AF37]/20 p-2 text-[#D4AF37]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">{t("boutique.hero.features.officialGear.label")}</p>
                  <p className="text-base font-semibold text-white">{t("boutique.hero.features.officialGear.description")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <ShieldCheck className="h-10 w-10 rounded-full bg-[#D4AF37]/20 p-2 text-[#D4AF37]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">{t("boutique.hero.features.quality.label")}</p>
                  <p className="text-base font-semibold text-white">{t("boutique.hero.features.quality.description")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <Sparkles className="h-10 w-10 rounded-full bg-[#D4AF37]/20 p-2 text-[#D4AF37]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">{t("boutique.hero.features.impact.label")}</p>
                  <p className="text-base font-semibold text-white">
                    {t("boutique.hero.features.impact.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
