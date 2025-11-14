"use client"

import { Target, Eye, Heart, Award } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function MissionVision() {
  const { t } = useTranslation()
  return (
    <section data-section="mission" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1A1A1A]">{t("home.mission.vision")}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("home.mission.visionText")}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("home.mission.visionDescription")}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Award className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">{t("home.mission.excellence")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Target className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">{t("home.mission.innovation")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Heart className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">{t("home.mission.integrity")}</span>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1A1A1A]">{t("home.mission.title")}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("home.mission.missionText")}
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">{t("home.mission.discover")}</span> {t("home.mission.discoverText")}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">{t("home.mission.train")}</span> {t("home.mission.trainText")}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">{t("home.mission.empower")}</span> {t("home.mission.empowerText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
