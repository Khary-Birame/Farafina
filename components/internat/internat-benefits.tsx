"use client"

import { Shield, TrendingUp, Users, Clock, Award, Heart } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function InternatBenefits() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t("internat.benefits.discipline.title", "Discipline & Structure"),
      description: t("internat.benefits.discipline.description", "Un cadre structuré qui favorise l'autodiscipline et la responsabilisation, essentiels pour la réussite sportive et académique."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: TrendingUp,
      title: t("internat.benefits.progress.title", "Progression Accélérée"),
      description: t("internat.benefits.progress.description", "L'environnement d'internat permet une progression plus rapide grâce à un encadrement constant et des conditions optimales."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Users,
      title: t("internat.benefits.team.title", "Esprit d'Équipe"),
      description: t("internat.benefits.team.description", "Vivre ensemble renforce les liens, développe l'esprit d'équipe et crée des amitiés durables entre les joueurs."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Clock,
      title: t("internat.benefits.time.title", "Gain de Temps"),
      description: t("internat.benefits.time.description", "Plus de temps pour l'entraînement et les études, sans perte de temps dans les transports quotidiens."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Award,
      title: t("internat.benefits.excellence.title", "Excellence Académique"),
      description: t("internat.benefits.excellence.description", "Suivi scolaire renforcé et environnement propice aux études garantissent de meilleurs résultats académiques."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
    {
      icon: Heart,
      title: t("internat.benefits.wellbeing.title", "Bien-être Garanti"),
      description: t("internat.benefits.wellbeing.description", "Cadre sécurisé, nutrition adaptée et suivi médical pour garantir le bien-être physique et mental de chaque étudiant."),
      color: "from-[#D4AF37] to-[#B8941F]"
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Award className="h-4 w-4" />
            {t("internat.benefits.badge", "Avantages Clés")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.benefits.title", "Avantages de l'Internat")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.benefits.description", "Découvrez pourquoi choisir l'internat pour le développement optimal de votre enfant.")}
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
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
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

