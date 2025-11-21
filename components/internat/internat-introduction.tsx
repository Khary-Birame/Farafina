"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Heart, Award, Target, Users } from "lucide-react"
import Image from "next/image"

export function InternatIntroduction() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Heart className="h-4 w-4" />
              {t("internat.intro.badge", "Notre Vision")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("internat.intro.title", "Un Cadre d'Excellence")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("internat.intro.description", "L'internat de Farafina Foot Academy offre bien plus qu'un simple hébergement. C'est un environnement structuré où chaque jeune talent peut s'épanouir, progresser et se préparer à une carrière professionnelle.")}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/student-residence-dormitory.jpg"
                alt="Internat Farafina"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h3 className="font-sans font-black text-3xl md:text-4xl text-gray-900 mb-6">
                {t("internat.intro.subtitle", "Plus qu'un hébergement, un mode de vie")}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("internat.intro.text1", "Notre internat est conçu pour offrir un équilibre parfait entre discipline, confort et développement personnel. Chaque aspect de la vie quotidienne est pensé pour favoriser la réussite académique et sportive.")}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("internat.intro.text2", "Dans un cadre sécurisé et moderne, nos étudiants bénéficient d'un encadrement professionnel 24/7, d'un suivi personnalisé et d'installations de qualité supérieure.")}
              </p>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Award, label: t("internat.intro.values.excellence", "Excellence") },
                  { icon: Target, label: t("internat.intro.values.discipline", "Discipline") },
                  { icon: Heart, label: t("internat.intro.values.wellbeing", "Bien-être") },
                  { icon: Users, label: t("internat.intro.values.team", "Esprit d'équipe") },
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

