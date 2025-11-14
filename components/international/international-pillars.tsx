"use client"

import { Compass, GraduationCap, Home, Handshake } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function InternationalPillars() {
  const { t } = useTranslation()

  const pillars = useMemo(() => [
    {
      icon: <Compass className="w-8 h-8" />,
      title: t("international.pillars.personalized.title"),
      description: t("international.pillars.personalized.description"),
      color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: t("international.pillars.educational.title"),
      description: t("international.pillars.educational.description"),
      color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: t("international.pillars.wellbeing.title"),
      description: t("international.pillars.wellbeing.description"),
      color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: t("international.pillars.career.title"),
      description: t("international.pillars.career.description"),
      color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
    },
  ], [t])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
                {t("international.pillars.badge")}
              </span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
              {t("international.pillars.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("international.pillars.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#D4AF37]/5 rounded-2xl p-8 border border-border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>

                <h3 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

