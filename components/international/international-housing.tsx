"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Bed, UtensilsCrossed, Users, Home } from "lucide-react"
import Image from "next/image"

export function InternationalHousing() {
  const { t } = useTranslation()

  const housingFeatures = [
    {
      icon: Bed,
      title: t("international.housing.rooms.title", "Chambres Confortables"),
      description: t("international.housing.rooms.description", "Chambres modernes et spacieuses, individuelles ou partagées (2-3 personnes), équipées de tout le confort nécessaire pour un séjour agréable."),
      image: "/student-residence-dormitory.jpg"
    },
    {
      icon: UtensilsCrossed,
      title: t("international.housing.nutrition.title", "Nutrition Adaptée"),
      description: t("international.housing.nutrition.description", "Réfectoire moderne proposant une alimentation équilibrée et variée, adaptée aux besoins nutritionnels des sportifs internationaux."),
      image: "/african-students-studying-in-modern-classroom.jpg"
    },
    {
      icon: Users,
      title: t("international.housing.staff.title", "Staff Dédié"),
      description: t("international.housing.staff.description", "Équipe d'éducateurs et de personnel disponible 24/7 pour assurer le bien-être, la sécurité et l'accompagnement de chaque résident."),
      image: "/student-residence-dormitory.jpg"
    },
    {
      icon: Home,
      title: t("international.housing.environment.title", "Environnement de Vie"),
      description: t("international.housing.environment.description", "Espaces communs modernes, zones de détente, bibliothèque et environnement sécurisé favorisant l'intégration et le bien-être."),
      image: "/african-football-academy-elite-training.jpg"
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Home className="h-4 w-4" />
            {t("international.housing.badge", "Hébergement Premium")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.housing.title", "Hébergement & Vie Quotidienne")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.housing.description", "Un cadre de vie exceptionnel pour les joueurs internationaux, alliant confort, sécurité et bien-être.")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {housingFeatures.map((feature, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-sans font-black text-2xl text-gray-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

