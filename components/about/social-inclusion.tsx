"use client"

import { Heart, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"

export function SocialInclusion() {
  const { t } = useTranslation()
  return (
    <section data-section="inclusion" className="py-24 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6">{t("home.inclusion.title")}</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            {t("home.inclusion.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">{t("home.inclusion.scholarships")}</h3>
            <p className="text-white/80 leading-relaxed">
              {t("home.inclusion.scholarshipsText")}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">{t("home.inclusion.womenFootball")}</h3>
            <p className="text-white/80 leading-relaxed">
              {t("home.inclusion.womenFootballText")}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#ffffff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">{t("home.inclusion.equalAccess")}</h3>
            <p className="text-white/80 leading-relaxed">
              {t("home.inclusion.equalAccessText")}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="bg-[#000000] hover:bg-[#1A1A1A] text-[#ffffff] font-semibold text-lg px-8 h-14">
              {t("home.inclusion.supportButton")}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <p className="text-white/70 text-sm mt-4">{t("home.inclusion.supportText")}</p>
        </div>
      </div>
    </section>
  )
}
