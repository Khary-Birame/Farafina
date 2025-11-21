"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Award, Target, Heart, Users } from "lucide-react"

export function VisiteIntroduction() {
  const { t } = useTranslation()

  const reasons = [
    {
      icon: Award,
      title: t("visite.intro.reason1.title", "Excellence Académique & Sportive"),
      description: t("visite.intro.reason1.description", "Découvrez notre programme éducatif complet alliant réussite scolaire et développement sportif de haut niveau."),
    },
    {
      icon: Target,
      title: t("visite.intro.reason2.title", "Infrastructures Modernes"),
      description: t("visite.intro.reason2.description", "Visitez nos installations de pointe : terrains, salles d'étude, internat et équipements sportifs professionnels."),
    },
    {
      icon: Heart,
      title: t("visite.intro.reason3.title", "Encadrement Professionnel"),
      description: t("visite.intro.reason3.description", "Rencontrez notre équipe d'éducateurs, entraîneurs et personnel médical dédiés à l'épanouissement de chaque jeune."),
    },
    {
      icon: Users,
      title: t("visite.intro.reason4.title", "Valeurs & Vision"),
      description: t("visite.intro.reason4.description", "Comprenez notre philosophie : discipline, respect, excellence et développement du caractère."),
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Heart className="h-4 w-4" />
              {t("visite.intro.badge", "Pourquoi Visiter ?")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("visite.intro.title", "Une Visite Immersive")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("visite.intro.description", "Une visite de Farafina Foot Academy, c'est bien plus qu'une simple découverte. C'est l'opportunité de comprendre notre vision, de rencontrer notre équipe et de découvrir un environnement où l'excellence académique et sportive se rencontrent.")}
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 100}ms` }}
                className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-sans font-black text-xl text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

