"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Video, BarChart3, Dumbbell, Target, PlayCircle, Award } from "lucide-react"
import Image from "next/image"

export function InternationalTrainingCenter() {
  const { t } = useTranslation()

  const facilities = [
    {
      icon: Target,
      title: t("international.training.technical.title", "Installations Techniques"),
      description: t("international.training.technical.description", "Terrains de football professionnels aux normes FIFA, surfaces synthétiques et naturelles, éclairage professionnel pour entraînements nocturnes."),
      image: "/african-football-academy-elite-training.jpg"
    },
    {
      icon: Award,
      title: t("international.training.performance.title", "Haute Performance"),
      description: t("international.training.performance.description", "Centre de performance avec équipements de pointe pour le développement physique, la récupération et l'optimisation des performances."),
      image: "/african-football-academy-elite-training.jpg"
    },
    {
      icon: Video,
      title: t("international.training.analysis.title", "Salles Vidéo / Analyses"),
      description: t("international.training.analysis.description", "Salles d'analyse vidéo équipées de technologies avancées pour l'étude tactique, l'amélioration technique et le développement du jeu."),
      image: "/african-students-studying-in-modern-classroom.jpg"
    },
    {
      icon: Dumbbell,
      title: t("international.training.gym.title", "Gym & Musculation"),
      description: t("international.training.gym.description", "Salle de musculation moderne avec équipements professionnels, suivi par des préparateurs physiques certifiés."),
      image: "/african-football-academy-elite-training.jpg"
    },
    {
      icon: PlayCircle,
      title: t("international.training.field.title", "Terrain Pro"),
      description: t("international.training.field.description", "Terrain principal aux dimensions professionnelles, système d'irrigation automatique et tribunes pour les matchs."),
      image: "/african-football-academy-elite-training.jpg"
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Award className="h-4 w-4" />
            {t("international.training.badge", "Centre d'Excellence")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.training.title", "Centre d'Entraînement Professionnel")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.training.description", "Des installations de niveau professionnel pour développer le potentiel de chaque joueur international.")}
          </p>
        </div>

        {/* Main Image */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src="/african-football-academy-elite-training.jpg"
            alt="Training Center"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h3 className="font-sans font-black text-3xl md:text-4xl mb-4">
                {t("international.training.hero.title", "Installations de Niveau Professionnel")}
              </h3>
              <p className="text-xl max-w-2xl mx-auto">
                {t("international.training.hero.description", "Un environnement d'entraînement exceptionnel pour atteindre l'excellence.")}
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <facility.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                {facility.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

