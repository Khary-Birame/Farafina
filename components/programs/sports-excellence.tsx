"use client"

import { Dumbbell, Video, Trophy, Target } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function SportsExcellence() {
  const { t } = useTranslation()

  const facilities = useMemo(() => [
    { icon: <Target size={20} />, label: t("programs.sports.facilities.fifa") },
    { icon: <Dumbbell size={20} />, label: t("programs.sports.facilities.gym") },
    { icon: <Trophy size={20} />, label: t("programs.sports.facilities.competition") },
    { icon: <Video size={20} />, label: t("programs.sports.facilities.video") },
  ], [t])

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
              {t("programs.sports.title")} <span className="text-[#D4AF37]">{t("programs.sports.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("programs.sports.description")}
            </p>

            {/* Program Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{t("programs.sports.highlights.technical.title")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("programs.sports.highlights.technical.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{t("programs.sports.highlights.physical.title")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("programs.sports.highlights.physical.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{t("programs.sports.highlights.analysis.title")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("programs.sports.highlights.analysis.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{t("programs.sports.highlights.competition.title")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("programs.sports.highlights.competition.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities Icons */}
            <div className="grid grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-[#D4AF37]/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                    <div className="text-[#D4AF37] group-hover:text-white transition-colors">{facility.icon}</div>
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">{facility.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image/Video */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/football-training-intensive-session.jpg"
                alt="Football training session"
                className="w-full h-auto"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] rounded-2xl shadow-xl p-6">
              <div className="text-white">
                <div className="font-sans font-bold text-3xl mb-1">20+</div>
                <div className="text-sm text-white/90">{t("programs.sports.trainingHours")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
