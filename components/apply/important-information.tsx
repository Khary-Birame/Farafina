"use client"

import { GraduationCap, DollarSign, FileCheck, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function ImportantInformation() {
  const { t } = useTranslation()

  const infoCards = useMemo(() => [
    {
      icon: GraduationCap,
      title: t("apply.important.scholarships.title"),
      description: t("apply.important.scholarships.description"),
      link: "/admissions#scholarship",
      linkText: t("apply.important.scholarships.linkText"),
    },
    {
      icon: DollarSign,
      title: t("apply.important.tuition.title"),
      description: t("apply.important.tuition.description"),
      link: "/admissions#tuition",
      linkText: t("apply.important.tuition.linkText"),
    },
    {
      icon: FileCheck,
      title: t("apply.important.consent.title"),
      description: t("apply.important.consent.description"),
      link: "/admissions#faq",
      linkText: t("apply.important.consent.linkText"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#1A1A1A] mb-4">{t("apply.important.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("apply.important.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-6 hover:border-[#D4AF37] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37] group-hover:to-[#d17e00] transition-transform duration-300">
                <card.icon className="w-7 h-7 text-[#D4AF37] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">{card.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{card.description}</p>
              <Link
                href={card.link}
                className="text-sm font-semibold text-[#D4AF37] hover:text-[#B8941F] inline-flex items-center gap-1 group/link"
              >
                {card.linkText}
                <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="bg-muted rounded-xl p-8 text-center border border-border">
          <HelpCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{t("apply.important.faq.title")}</h3>
          <p className="text-muted-foreground mb-4">
            {t("apply.important.faq.description")}
          </p>
          <Link href="/faq">
            <Button variant="outline">{t("apply.important.faq.button")}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
