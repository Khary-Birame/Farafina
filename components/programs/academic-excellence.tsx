"use client"

import { BookOpen, Globe, Laptop, Users } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function AcademicExcellence() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-32 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="/modern-classroom-african-students.jpg" alt="Modern classroom" className="w-full h-auto" />
            </div>
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
              <div className="text-[#1A1A1A]">
                <div className="font-sans font-bold text-3xl mb-1 text-[#D4AF37]">98%</div>
                <div className="text-sm text-muted-foreground">{t("programs.academic.successRate")}</div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-white mb-6 text-balance">
              {t("programs.academic.title")} <span className="text-[#D4AF37]">{t("programs.academic.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              {t("programs.academic.description")}
            </p>

            {/* Key Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{t("programs.academic.features.classrooms.title")}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("programs.academic.features.classrooms.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{t("programs.academic.features.bilingual.title")}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("programs.academic.features.bilingual.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Laptop size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{t("programs.academic.features.digital.title")}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("programs.academic.features.digital.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{t("programs.academic.features.personal.title")}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("programs.academic.features.personal.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <p className="text-lg font-medium text-white italic mb-2">
                "{t("programs.academic.quote")}"
              </p>
              <p className="text-sm text-white/60">— {t("programs.academic.quoteAuthor")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
