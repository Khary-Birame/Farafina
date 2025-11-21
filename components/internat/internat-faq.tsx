"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

export function InternatFAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: t("internat.faq.q1.question", "Quel est l'âge minimum pour intégrer l'internat ?"),
      answer: t("internat.faq.q1.answer", "L'internat accueille les jeunes de 12 à 18 ans. Pour les plus jeunes, nous proposons un accompagnement spécialisé adapté à leur âge.")
    },
    {
      question: t("internat.faq.q2.question", "Comment se déroule la vie quotidienne à l'internat ?"),
      answer: t("internat.faq.q2.answer", "La journée est structurée entre cours académiques, entraînements, études surveillées et temps de repos. Un emploi du temps équilibré est établi pour chaque étudiant.")
    },
    {
      question: t("internat.faq.q3.question", "Les parents peuvent-ils visiter leurs enfants ?"),
      answer: t("internat.faq.q3.answer", "Oui, les visites sont autorisées les weekends et jours fériés. Des créneaux de visites sont prévus pour maintenir le lien familial tout en préservant la structure de l'internat.")
    },
    {
      question: t("internat.faq.q4.question", "Quel est le ratio encadrant/étudiant ?"),
      answer: t("internat.faq.q4.answer", "Nous maintenons un ratio optimal de 1 encadrant pour 8 étudiants, garantissant un suivi personnalisé et une attention particulière à chaque jeune.")
    },
    {
      question: t("internat.faq.q5.question", "Les repas sont-ils adaptés aux sportifs ?"),
      answer: t("internat.faq.q5.answer", "Absolument. Nos menus sont conçus par un nutritionniste sportif et adaptés aux besoins énergétiques et nutritionnels des jeunes athlètes en développement.")
    },
    {
      question: t("internat.faq.q6.question", "Y a-t-il un suivi médical ?"),
      answer: t("internat.faq.q6.answer", "Oui, une infirmerie est disponible 24/7 avec du personnel médical qualifié. Des bilans de santé réguliers sont effectués pour tous les étudiants.")
    },
    {
      question: t("internat.faq.q7.question", "Comment se passe l'intégration des nouveaux étudiants ?"),
      answer: t("internat.faq.q7.answer", "Un programme d'intégration personnalisé est mis en place avec un tuteur dédié. Les nouveaux arrivants sont accompagnés par des étudiants plus anciens pour faciliter leur adaptation.")
    },
    {
      question: t("internat.faq.q8.question", "Les étudiants peuvent-ils sortir de l'internat ?"),
      answer: t("internat.faq.q8.answer", "Les sorties sont autorisées selon un planning établi et avec autorisation parentale. La sécurité et le bien-être des étudiants sont notre priorité absolue.")
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <HelpCircle className="h-4 w-4" />
            {t("internat.faq.badge", "Questions Fréquentes")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.faq.title", "Questions Fréquentes")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.faq.description", "Trouvez les réponses aux questions que se posent le plus souvent les parents et les étudiants.")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 50}ms` }}
              className="reveal bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#D4AF37] transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left group"
                aria-expanded={openIndex === index}
              >
                <h3 className="font-sans font-black text-lg md:text-xl text-gray-900 pr-8 group-hover:text-[#D4AF37] transition-colors">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "transform rotate-180 text-[#D4AF37]"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

