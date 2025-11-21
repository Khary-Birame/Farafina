"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Target, Heart, Globe, Award } from "lucide-react"
import Image from "next/image"

export function InternationalMission() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Target className="h-4 w-4" />
              {t("international.mission.badge", "Notre Mission")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("international.mission.title", "Notre Mission Internationale")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("international.mission.description", "Accueillir, accompagner et développer les talents internationaux dans un environnement d'excellence, de sécurité et d'intégration culturelle.")}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="/african-football-academy-elite-training.jpg"
                alt="International Mission"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("international.mission.text1", "Farafina Foot Academy s'engage à offrir aux joueurs internationaux un environnement exceptionnel où l'excellence sportive rencontre l'épanouissement personnel et académique.")}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("international.mission.text2", "Notre mission est de créer un pont entre les cultures, de développer les talents du monde entier et de préparer chaque joueur à une carrière professionnelle réussie.")}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("international.mission.text3", "Avec un encadrement 24/7, un suivi personnalisé et des infrastructures de niveau professionnel, nous garantissons à chaque joueur international une expérience transformatrice.")}
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Globe, label: t("international.mission.values.global", "Vision Globale") },
                  { icon: Heart, label: t("international.mission.values.care", "Bienveillance") },
                  { icon: Award, label: t("international.mission.values.excellence", "Excellence") },
                  { icon: Target, label: t("international.mission.values.success", "Réussite") },
                ].map((value, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">{value.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

