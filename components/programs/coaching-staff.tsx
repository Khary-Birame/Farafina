"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function CoachingStaff() {
  const { t } = useTranslation()

  const staff = useMemo(() => [
    {
      name: "Mamadou Dieng",
      role: t("programs.coaching.staff.headCoach.role"),
      qualifications: t("programs.coaching.staff.headCoach.qualifications"),
      image: "/coach-mamadou-dieng.jpg",
      philosophy: t("programs.coaching.staff.headCoach.philosophy"),
    },
    {
      name: "Dr. Aminata Sow",
      role: t("programs.coaching.staff.academic.role"),
      qualifications: t("programs.coaching.staff.academic.qualifications"),
      image: "/dr-aminata-sow.jpg",
      philosophy: t("programs.coaching.staff.academic.philosophy"),
    },
    {
      name: "Ibrahim Koné",
      role: t("programs.coaching.staff.performance.role"),
      qualifications: t("programs.coaching.staff.performance.qualifications"),
      image: "/coach-ibrahim-kone.jpg",
      philosophy: t("programs.coaching.staff.performance.philosophy"),
    },
    {
      name: "Fatou Diallo",
      role: t("programs.coaching.staff.psychologist.role"),
      qualifications: t("programs.coaching.staff.psychologist.qualifications"),
      image: "/dr-fatou-diallo.jpg",
      philosophy: t("programs.coaching.staff.psychologist.philosophy"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
            {t("programs.coaching.title")} <span className="text-[#D4AF37]">{t("programs.coaching.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("programs.coaching.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-border hover:border-[#D4AF37] transition-all hover:shadow-lg group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans font-bold text-xl text-[#1A1A1A] mb-1">{member.name}</h3>
                <div className="text-sm font-semibold text-[#D4AF37] mb-2">{member.role}</div>
                <div className="text-xs text-muted-foreground mb-4">{member.qualifications}</div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{member.philosophy}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
