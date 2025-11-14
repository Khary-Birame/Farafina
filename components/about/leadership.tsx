"use client"

import { Quote } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function Leadership() {
  const { t } = useTranslation()

  // Charger l'équipe depuis les traductions
  const team = useMemo(() => [
    {
      name: "Amadou Diallo",
      role: t("home.leadership.team.coach.role"),
      bio: t("home.leadership.team.coach.bio"),
      image: "/african-football-coach-portrait.jpg",
    },
    {
      name: "Dr. Fatou Sow",
      role: t("home.leadership.team.academic.role"),
      bio: t("home.leadership.team.academic.bio"),
      image: "/african-female-educator-portrait.jpg",
    },
    {
      name: "Ibrahim Kane",
      role: t("home.leadership.team.technical.role"),
      bio: t("home.leadership.team.technical.bio"),
      image: "/african-technical-director-portrait.jpg",
    },
  ], [t])

  return (
    <section data-section="leadership" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* CEO Quote */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Quote className="text-[#ffffff] mb-6" size={48} />
              <blockquote className="text-2xl md:text-3xl font-sans font-semibold text-white mb-6 leading-relaxed text-balance">
                "{t("home.leadership.quote")}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden">
                  <img src="/african-ceo-portrait.jpg" alt={t("home.leadership.ceo.alt")} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-lg text-white">{t("home.leadership.ceo.name")}</p>
                  <p className="text-sm text-white/80">{t("home.leadership.ceo.title")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A1A1A] mb-4">{t("home.leadership.title")}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("home.leadership.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans font-semibold text-xl text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[#D4AF37] mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
