"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Users, Target, Trophy } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function ProgramsByAge() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const programs = useMemo(() => [
    {
      ageGroup: "U12 – U15",
      title: t("programs.byAge.fundamentals.title"),
      icon: <Users size={28} />,
      goals: [
        t("programs.byAge.fundamentals.goals.technical"),
        t("programs.byAge.fundamentals.goals.tactical"),
        t("programs.byAge.fundamentals.goals.physical"),
        t("programs.byAge.fundamentals.goals.academic"),
      ],
      trainingIntensity: t("programs.byAge.fundamentals.trainingIntensity"),
      competition: t("programs.byAge.fundamentals.competition"),
      description: t("programs.byAge.fundamentals.description"),
    },
    {
      ageGroup: "U16 – U18",
      title: t("programs.byAge.elite.title"),
      icon: <Target size={28} />,
      goals: [
        t("programs.byAge.elite.goals.technical"),
        t("programs.byAge.elite.goals.physical"),
        t("programs.byAge.elite.goals.exposure"),
        t("programs.byAge.elite.goals.career"),
      ],
      trainingIntensity: t("programs.byAge.elite.trainingIntensity"),
      competition: t("programs.byAge.elite.competition"),
      description: t("programs.byAge.elite.description"),
    },
    {
      ageGroup: t("programs.byAge.postAcademy.ageGroup"),
      title: t("programs.byAge.postAcademy.title"),
      icon: <Trophy size={28} />,
      goals: [
        t("programs.byAge.postAcademy.goals.placement"),
        t("programs.byAge.postAcademy.goals.continuing"),
        t("programs.byAge.postAcademy.goals.network"),
        t("programs.byAge.postAcademy.goals.transition"),
      ],
      trainingIntensity: t("programs.byAge.postAcademy.trainingIntensity"),
      competition: t("programs.byAge.postAcademy.competition"),
      description: t("programs.byAge.postAcademy.description"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
            {t("programs.byAge.title")} <span className="text-[#D4AF37]">{t("programs.byAge.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("programs.byAge.description")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {programs.map((program, index) => (
            <Button
              key={index}
              onClick={() => setActiveTab(index)}
              variant={activeTab === index ? "default" : "outline"}
              size="lg"
              className={`text-base h-12 px-6 ${
                activeTab === index
                  ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  : "bg-white hover:bg-muted text-[#1A1A1A]"
              }`}
            >
              {program.ageGroup}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border">
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="text-[#D4AF37]">{programs[activeTab].icon}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#D4AF37] mb-2">{programs[activeTab].ageGroup}</div>
                  <h3 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">{programs[activeTab].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{programs[activeTab].description}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">{t("programs.byAge.trainingIntensityLabel")}</div>
                  <div className="font-sans font-bold text-xl text-[#1A1A1A]">
                    {programs[activeTab].trainingIntensity}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-6 md:col-span-2">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">{t("programs.byAge.competitionLabel")}</div>
                  <div className="font-medium text-[#1A1A1A]">{programs[activeTab].competition}</div>
                </div>
              </div>

              {/* Goals */}
              <div>
                <h4 className="font-sans font-bold text-xl text-[#1A1A1A] mb-4">{t("programs.byAge.goalsTitle")}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {programs[activeTab].goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-muted-foreground">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
