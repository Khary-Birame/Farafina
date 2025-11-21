"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Shield, Home, Dumbbell, GraduationCap, Heart, Users } from "lucide-react"

export function InternationalWhyChoose() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t("international.why.security.title", "Sécurité Totale"),
      description: t("international.why.security.description", "Environnement sécurisé 24/7 avec surveillance continue, personnel de sécurité qualifié et mesures de protection optimales pour la tranquillité des familles."),
    },
    {
      icon: Home,
      title: t("international.why.housing.title", "Hébergement Premium"),
      description: t("international.why.housing.description", "Chambres modernes et confortables, espaces de vie communs, internat sécurisé avec toutes les commodités pour un séjour agréable et rassurant."),
    },
    {
      icon: Dumbbell,
      title: t("international.why.training.title", "Encadrement Sportif Pro"),
      description: t("international.why.training.description", "Entraîneurs certifiés, programme d'entraînement personnalisé, installations de pointe et suivi technique pour maximiser le potentiel de chaque joueur."),
    },
    {
      icon: GraduationCap,
      title: t("international.why.academic.title", "Suivi Académique"),
      description: t("international.why.academic.description", "Programme scolaire structuré, tutorat individuel, aide aux devoirs et préparation aux examens pour garantir la réussite académique."),
    },
    {
      icon: Heart,
      title: t("international.why.health.title", "Santé & Médecine Sportive"),
      description: t("international.why.health.description", "Infirmerie 24/7, bilans de santé réguliers, nutritionniste sportif, kinésithérapie et suivi médical complet pour le bien-être optimal."),
    },
    {
      icon: Users,
      title: t("international.why.integration.title", "Intégration Culturelle"),
      description: t("international.why.integration.description", "Programme d'intégration personnalisé, cours de langue, activités culturelles et accompagnement pour faciliter l'adaptation et créer des liens durables."),
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Users className="h-4 w-4" />
            {t("international.why.badge", "International Players Welcome")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.why.title", "Pourquoi Choisir Notre Académie ?")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.why.description", "Un accompagnement complet et personnalisé pour chaque joueur international, de l'arrivée à la réussite professionnelle.")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

