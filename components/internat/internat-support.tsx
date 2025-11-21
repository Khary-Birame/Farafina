"use client"

import { GraduationCap, Brain, Apple, Calendar, Heart, Users } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

interface SupportItem {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
}

export function InternatSupport() {
  const { t } = useTranslation()

  const supportItems: SupportItem[] = [
    {
      icon: Users,
      title: t("internat.support.staff.title", "Personnel Éducatif"),
      description: t("internat.support.staff.description", "Équipe d'éducateurs qualifiés et dévoués, disponibles 24/7 pour accompagner chaque étudiant dans son développement personnel et académique."),
      features: [
        t("internat.support.staff.feature1", "Éducateurs diplômés et expérimentés"),
        t("internat.support.staff.feature2", "Disponibilité 24/7"),
        t("internat.support.staff.feature3", "Ratio encadrant/étudiant optimal"),
        t("internat.support.staff.feature4", "Formation continue du personnel"),
      ]
    },
    {
      icon: GraduationCap,
      title: t("internat.support.academic.title", "Suivi Scolaire"),
      description: t("internat.support.academic.description", "Accompagnement personnalisé dans les études avec des séances de tutorat, aide aux devoirs et préparation aux examens."),
      features: [
        t("internat.support.academic.feature1", "Séances de tutorat individuelles"),
        t("internat.support.academic.feature2", "Aide aux devoirs quotidienne"),
        t("internat.support.academic.feature3", "Suivi des résultats scolaires"),
        t("internat.support.academic.feature4", "Préparation aux examens"),
      ]
    },
    {
      icon: Brain,
      title: t("internat.support.psychological.title", "Suivi Psychologique"),
      description: t("internat.support.psychological.description", "Accompagnement psychologique pour gérer le stress, la motivation et le développement personnel de chaque jeune."),
      features: [
        t("internat.support.psychological.feature1", "Psychologues spécialisés"),
        t("internat.support.psychological.feature2", "Entretiens individuels réguliers"),
        t("internat.support.psychological.feature3", "Gestion du stress et de la pression"),
        t("internat.support.psychological.feature4", "Développement de la confiance en soi"),
      ]
    },
    {
      icon: Apple,
      title: t("internat.support.nutrition.title", "Nutrition Sportive"),
      description: t("internat.support.nutrition.description", "Programme nutritionnel adapté aux besoins des sportifs avec des repas équilibrés et des conseils personnalisés."),
      features: [
        t("internat.support.nutrition.feature1", "Nutritionniste sportif"),
        t("internat.support.nutrition.feature2", "Menus adaptés aux entraînements"),
        t("internat.support.nutrition.feature3", "Suivi des besoins nutritionnels"),
        t("internat.support.nutrition.feature4", "Éducation alimentaire"),
      ]
    },
    {
      icon: Calendar,
      title: t("internat.support.schedule.title", "Emploi du Temps Structuré"),
      description: t("internat.support.schedule.description", "Planning équilibré entre études, entraînements, repos et activités, optimisé pour la performance et le bien-être."),
      features: [
        t("internat.support.schedule.feature1", "Planning hebdomadaire personnalisé"),
        t("internat.support.schedule.feature2", "Équilibre études/sport/repos"),
        t("internat.support.schedule.feature3", "Horaires fixes et réguliers"),
        t("internat.support.schedule.feature4", "Adaptation selon les besoins"),
      ]
    },
    {
      icon: Heart,
      title: t("internat.support.values.title", "Valeurs & Accompagnement"),
      description: t("internat.support.values.description", "Transmission de valeurs essentielles : respect, discipline, travail d'équipe, et développement du caractère."),
      features: [
        t("internat.support.values.feature1", "Programme de développement personnel"),
        t("internat.support.values.feature2", "Activités de team building"),
        t("internat.support.values.feature3", "Cérémonies et rituels positifs"),
        t("internat.support.values.feature4", "Mentorat par les anciens"),
      ]
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Heart className="h-4 w-4" />
            {t("internat.support.badge", "Accompagnement Complet")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.support.title", "Encadrement & Suivi du Joueur")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.support.description", "Un accompagnement personnalisé et professionnel à chaque étape du parcours de nos étudiants.")}
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportItems.map((item, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
      </div>
    </section>
  )
}

