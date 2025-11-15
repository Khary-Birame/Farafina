"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Award, Target } from "lucide-react"

export function AgeCategories() {
  const ageCategories = [
    {
      name: "U7 - U9",
      age: "7-9 ans",
      schedule: "Samedi 9h-11h",
      intensity: "Initiation ludique",
      focus: "Coordination, jeu collectif, plaisir",
      icon: Target,
    },
    {
      name: "U10 - U12",
      age: "10-12 ans",
      schedule: "Samedi 11h-13h + Mercredi 17h-18h30",
      intensity: "Développement technique",
      focus: "Techniques de base, tactique simple, esprit d'équipe",
      icon: Target,
    },
    {
      name: "U13 - U15",
      age: "13-15 ans",
      schedule: "Samedi 14h-16h + Mercredi 17h-18h30",
      intensity: "Perfectionnement",
      focus: "Tactique avancée, condition physique, compétition",
      icon: Award,
    },
    {
      name: "U16 - U18",
      age: "16-18 ans",
      schedule: "Samedi 16h-18h30 + Mercredi 18h30-20h",
      intensity: "Performance",
      focus: "Excellence technique, stratégie, préparation professionnelle",
      icon: Award,
    },
  ]

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Catégories d'Âge & Plans d'Entraînement
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Des programmes adaptés à chaque âge pour un développement optimal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:border-[#D4AF37] border-2 border-[#C0C0C0] rounded-xl bg-white"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-3">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="text-xl font-bold text-[#D4AF37]">{category.name}</h3>
                  </div>
                  <p className="text-sm text-[#1A1A1A]/70 font-medium">{category.age}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Horaires</p>
                      <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{category.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Intensité</p>
                      <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{category.intensity}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C0C0C0]">
                  <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Objectifs :</p>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{category.focus}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

