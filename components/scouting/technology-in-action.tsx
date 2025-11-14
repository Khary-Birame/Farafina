"use client"

import { Card } from "@/components/ui/card"
import { Bell, BarChart3, Users } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function TechnologyInAction() {
  const { t } = useTranslation()

  const features = useMemo(() => [
    {
      icon: Bell,
      title: t("scouting.technology.features.predictive.title"),
      description: t("scouting.technology.features.predictive.description"),
    },
    {
      icon: BarChart3,
      title: t("scouting.technology.features.matchAnalysis.title"),
      description: t("scouting.technology.features.matchAnalysis.description"),
    },
    {
      icon: Users,
      title: t("scouting.technology.features.fairEvaluation.title"),
      description: t("scouting.technology.features.fairEvaluation.description"),
    },
  ], [t])

  return (
    <section id="technology-in-action" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">{t("scouting.technology.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("scouting.technology.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/ai-football-analysis-dashboard.jpg"
              alt="AI Football Analysis Dashboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37] text-white text-sm font-medium mb-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {t("scouting.technology.liveAnalysis.badge")}
              </div>
              <p className="text-white text-lg font-medium">
                {t("scouting.technology.liveAnalysis.description")}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-[#D4AF37]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#D4AF37]/10 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-[#D4AF37]/5 to-transparent border-[#D4AF37]/20">
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">50+</div>
            <div className="text-sm text-muted-foreground">{t("scouting.technology.stats.dataPoints")}</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-[#D4AF37]/5 to-transparent border-[#D4AF37]/20">
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">{t("scouting.technology.stats.continuous")}</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-[#D4AF37]/5 to-transparent border-[#D4AF37]/20">
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">100%</div>
            <div className="text-sm text-muted-foreground">{t("scouting.technology.stats.objective")}</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
