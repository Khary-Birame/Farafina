"use client"

import { Card } from "@/components/ui/card"
import { Shield, Lock, Heart, CheckCircle } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function EthicsSection() {
  const { t } = useTranslation()

  const principles = useMemo(() => [
    {
      icon: Shield,
      title: t("scouting.ethics.principles.gdpr.title"),
      description: t("scouting.ethics.principles.gdpr.description"),
    },
    {
      icon: Lock,
      title: t("scouting.ethics.principles.parental.title"),
      description: t("scouting.ethics.principles.parental.description"),
    },
    {
      icon: Heart,
      title: t("scouting.ethics.principles.inclusion.title"),
      description: t("scouting.ethics.principles.inclusion.description"),
    },
  ], [t])

  const commitments = useMemo(() => [
    t("scouting.ethics.commitments.encrypted"),
    t("scouting.ethics.commitments.deletion"),
    t("scouting.ethics.commitments.sharing"),
    t("scouting.ethics.commitments.audit"),
    t("scouting.ethics.commitments.transparency"),
  ], [t])

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">{t("scouting.ethics.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">{t("scouting.ethics.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("scouting.ethics.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-[#D4AF37]/20"
            >
              <div className="inline-flex p-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
                <principle.icon className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
            </Card>
          ))}
        </div>

        {/* Commitments Card */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/15 border-2 border-[#D4AF37]/30">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t("scouting.ethics.commitmentsTitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commitments.map((commitment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{commitment}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Lock className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm font-medium text-foreground">{t("scouting.ethics.badges.ssl")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm font-medium text-foreground">{t("scouting.ethics.badges.gdpr")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Heart className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm font-medium text-foreground">{t("scouting.ethics.badges.ethical")}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
