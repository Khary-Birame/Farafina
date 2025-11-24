"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Shield, UserCheck, Award, GraduationCap, CheckCircle2, Heart } from "lucide-react"
import Image from "next/image"

export function VisiteWhyVisit() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t("visite.why.security.title", "Sécurité & Qualité de Vie"),
      description: t("visite.why.security.description", "Un environnement sécurisé 24/7 avec surveillance continue et mesures de sécurité optimales pour la tranquillité des familles."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: UserCheck,
      title: t("visite.why.personalized.title", "Suivi Personnalisé"),
      description: t("visite.why.personalized.description", "Chaque étudiant bénéficie d'un accompagnement sur mesure avec tutorat individuel et suivi académique renforcé."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Award,
      title: t("visite.why.training.title", "Entraînement Professionnel"),
      description: t("visite.why.training.description", "Programme d'entraînement de niveau professionnel avec encadrement par des coaches certifiés et expérimentés."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: GraduationCap,
      title: t("visite.why.academic.title", "Programme Scolaire Structuré"),
      description: t("visite.why.academic.description", "Équilibre parfait entre études et sport avec un programme académique complet et reconnu."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: CheckCircle2,
      title: t("visite.why.certified.title", "Encadrement Certifié"),
      description: t("visite.why.certified.description", "Équipe d'éducateurs diplômés, psychologues et nutritionnistes spécialisés dans l'accompagnement des jeunes sportifs."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Heart,
      title: t("visite.why.values.title", "Valeurs & Excellence"),
      description: t("visite.why.values.description", "Transmission de valeurs essentielles : discipline, respect, travail d'équipe et développement du caractère."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Heart className="h-4 w-4" />
              {t("visite.why.badge", "Pourquoi Nous Choisir")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("visite.why.title", "Pourquoi Visiter Notre Académie ?")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("visite.why.description", "Découvrez les avantages qui font de Farafina Foot Academy un choix d'excellence pour le développement de votre enfant.")}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/african-football-academy-elite-training.jpg"
                alt="Farafina Foot Academy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="reveal group flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-black text-xl text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
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

