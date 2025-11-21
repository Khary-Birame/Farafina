"use client"

import { Check, X, Info } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export function InternatPricing() {
  const { t } = useTranslation()

  const included = [
    t("internat.pricing.included.item1", "Hébergement en chambre confortable"),
    t("internat.pricing.included.item2", "3 repas par jour + collations"),
    t("internat.pricing.included.item3", "Encadrement éducatif 24/7"),
    t("internat.pricing.included.item4", "Suivi scolaire personnalisé"),
    t("internat.pricing.included.item5", "Accès aux installations sportives"),
    t("internat.pricing.included.item6", "Suivi médical et nutritionnel"),
    t("internat.pricing.included.item7", "Wi-Fi et équipements de base"),
    t("internat.pricing.included.item8", "Activités et sorties organisées"),
  ]

  const notIncluded = [
    t("internat.pricing.notIncluded.item1", "Frais de scolarité"),
    t("internat.pricing.notIncluded.item2", "Frais d'inscription"),
    t("internat.pricing.notIncluded.item3", "Transport personnel"),
    t("internat.pricing.notIncluded.item4", "Dépenses personnelles"),
  ]

  const requirements = [
    t("internat.pricing.requirements.item1", "Formulaire d'inscription complété"),
    t("internat.pricing.requirements.item2", "Dossier académique complet"),
    t("internat.pricing.requirements.item3", "Certificat médical"),
    t("internat.pricing.requirements.item4", "Autorisation parentale"),
    t("internat.pricing.requirements.item5", "Photocopie de la carte d'identité"),
    t("internat.pricing.requirements.item6", "Photos d'identité"),
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Info className="h-4 w-4" />
            {t("internat.pricing.badge", "Tarifs & Modalités")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.pricing.title", "Tarifs & Modalités d'Inscription")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.pricing.description", "Des tarifs transparents et compétitifs pour un service premium.")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pricing Card */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-[#D4AF37] shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-4">
                  <span className="text-sm font-bold text-[#D4AF37]">
                    {t("internat.pricing.period", "Par mois")}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-5xl font-black text-gray-900">
                    {formatCurrency(150000)}
                  </span>
                  <span className="text-xl text-gray-600 ml-2">
                    {t("internat.pricing.perMonth", "/mois")}
                  </span>
                </div>
                <p className="text-gray-600">
                  {t("internat.pricing.note", "Tarif pour l'année académique complète")}
                </p>
              </div>

              <div className="space-y-6">
                {/* Included */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    {t("internat.pricing.included.title", "Inclus dans le tarif")}
                  </h3>
                  <ul className="space-y-3">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    {t("internat.pricing.notIncluded.title", "Non inclus")}
                  </h3>
                  <ul className="space-y-3">
                    {notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link href="/admissions">
                  <Button className="w-full h-14 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    {t("internat.pricing.applyButton", "Demander une Inscription")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-gray-200 shadow-xl">
              <h3 className="font-black text-3xl text-gray-900 mb-6">
                {t("internat.pricing.requirements.title", "Conditions d'Admission")}
              </h3>
              
              <div className="mb-8">
                <h4 className="font-bold text-lg text-gray-900 mb-4">
                  {t("internat.pricing.requirements.subtitle", "Documents nécessaires")}
                </h4>
                <ul className="space-y-3">
                  {requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#D4AF37]/10 rounded-2xl p-6 border border-[#D4AF37]/20">
                <h4 className="font-bold text-lg text-gray-900 mb-3">
                  {t("internat.pricing.conditions.title", "Conditions")}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <span>{t("internat.pricing.conditions.item1", "Âge : 12 à 18 ans")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <span>{t("internat.pricing.conditions.item2", "Niveau scolaire : minimum requis")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <span>{t("internat.pricing.conditions.item3", "Engagement sportif et académique")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

