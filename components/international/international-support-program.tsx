"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Plane, FileText, Calendar, Apple, BookOpen, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function InternationalSupportProgram() {
  const { t } = useTranslation()

  const supportItems = [
    {
      icon: Plane,
      title: t("international.support.transport.title", "Transport & Prise en Charge"),
      description: t("international.support.transport.description", "Accueil à l'aéroport, transfert vers l'académie et assistance complète pour tous les déplacements."),
      features: [
        t("international.support.transport.feature1", "Accueil à l'aéroport"),
        t("international.support.transport.feature2", "Transfert vers l'académie"),
        t("international.support.transport.feature3", "Assistance aux déplacements"),
        t("international.support.transport.feature4", "Support logistique 24/7"),
      ]
    },
    {
      icon: FileText,
      title: t("international.support.visa.title", "Visa & Administratif"),
      description: t("international.support.visa.description", "Assistance complète pour les démarches de visa, documents administratifs et formalités légales."),
      features: [
        t("international.support.visa.feature1", "Assistance visa"),
        t("international.support.visa.feature2", "Documents administratifs"),
        t("international.support.visa.feature3", "Formalités légales"),
        t("international.support.visa.feature4", "Suivi personnalisé"),
      ]
    },
    {
      icon: Calendar,
      title: t("international.support.schedule.title", "Planning d'Entraînements"),
      description: t("international.support.schedule.description", "Programme d'entraînement structuré et personnalisé adapté aux objectifs et au niveau de chaque joueur."),
      features: [
        t("international.support.schedule.feature1", "Planning personnalisé"),
        t("international.support.schedule.feature2", "Entraînements quotidiens"),
        t("international.support.schedule.feature3", "Suivi technique"),
        t("international.support.schedule.feature4", "Analyses vidéo"),
      ]
    },
    {
      icon: Apple,
      title: t("international.support.nutrition.title", "Nutrition Sportive"),
      description: t("international.support.nutrition.description", "Programme nutritionnel adapté aux besoins des sportifs avec menus équilibrés et conseils personnalisés."),
      features: [
        t("international.support.nutrition.feature1", "Nutritionniste sportif"),
        t("international.support.nutrition.feature2", "Menus adaptés"),
        t("international.support.nutrition.feature3", "Suivi nutritionnel"),
        t("international.support.nutrition.feature4", "Éducation alimentaire"),
      ]
    },
    {
      icon: BookOpen,
      title: t("international.support.school.title", "School & Study Follow-up"),
      description: t("international.support.school.description", "Suivi scolaire renforcé avec tutorat, aide aux devoirs et préparation aux examens pour garantir la réussite académique."),
      features: [
        t("international.support.school.feature1", "Tutorat individuel"),
        t("international.support.school.feature2", "Aide aux devoirs"),
        t("international.support.school.feature3", "Suivi des résultats"),
        t("international.support.school.feature4", "Préparation examens"),
      ]
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <CheckCircle2 className="h-4 w-4" />
            {t("international.support.badge", "Accompagnement Complet")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.support.title", "Programme d'Accompagnement Complet")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.support.description", "De votre arrivée à votre réussite, nous vous accompagnons à chaque étape avec un support professionnel et personnalisé.")}
          </p>
        </div>

        {/* Support Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {supportItems.map((item, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="space-y-3">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/african-football-academy-elite-training.jpg"
            alt="Support Program"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h3 className="font-sans font-black text-3xl md:text-4xl mb-4">
                {t("international.support.cta.title", "Un Accompagnement Sur Mesure")}
              </h3>
              <p className="text-xl max-w-2xl mx-auto">
                {t("international.support.cta.description", "Chaque joueur international bénéficie d'un programme personnalisé adapté à ses besoins spécifiques.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

