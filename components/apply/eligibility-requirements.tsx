"use client"

import { CheckCircle2, FileText, ImageIcon, FileCheck, Heart } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function EligibilityRequirements() {
  const { t } = useTranslation()

  const eligibilityCriteria = useMemo(() => [
    t("apply.eligibility.criteria.age"),
    t("apply.eligibility.criteria.passion"),
    t("apply.eligibility.criteria.academic"),
    t("apply.eligibility.criteria.physical"),
    t("apply.eligibility.criteria.consent"),
    t("apply.eligibility.criteria.open"),
  ], [t])

  const requiredDocuments = useMemo(() => [
    {
      icon: ImageIcon,
      title: t("apply.eligibility.documents.photo.title"),
      description: t("apply.eligibility.documents.photo.description"),
    },
    {
      icon: FileText,
      title: t("apply.eligibility.documents.transcript.title"),
      description: t("apply.eligibility.documents.transcript.description"),
    },
    {
      icon: FileCheck,
      title: t("apply.eligibility.documents.consent.title"),
      description: t("apply.eligibility.documents.consent.description"),
    },
    {
      icon: Heart,
      title: t("apply.eligibility.documents.medical.title"),
      description: t("apply.eligibility.documents.medical.description"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#1A1A1A] mb-4">{t("apply.eligibility.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("apply.eligibility.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Eligibility Criteria */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] mb-6">{t("apply.eligibility.whoCanApply.title")}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("apply.eligibility.whoCanApply.description")}
            </p>
            <div className="space-y-3">
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Required Documents */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] mb-6">{t("apply.eligibility.documents.title")}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("apply.eligibility.documents.description")}
            </p>
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <doc.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
