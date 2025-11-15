"use client"

import { Card } from "@/components/ui/card"
import { Shield, Heart, Users, Target, Sparkles } from "lucide-react"

export function CoachingPhilosophy() {
  const values = [
    {
      icon: Shield,
      title: "Discipline",
      description: "Ponctualité, respect des règles et engagement dans l'entraînement.",
    },
    {
      icon: Heart,
      title: "Respect",
      description: "Respect des coéquipiers, adversaires, entraîneurs et arbitres.",
    },
    {
      icon: Users,
      title: "Esprit d'Équipe",
      description: "Solidarité, communication et collaboration sur et hors du terrain.",
    },
    {
      icon: Target,
      title: "Développement Mental",
      description: "Concentration, résilience et gestion du stress compétitif.",
    },
  ]

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Notre Philosophie d'Entraînement
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Au-delà de la technique, nous formons des jeunes équilibrés, respectueux et
            déterminés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:border-[#D4AF37] border-2 border-[#C0C0C0] rounded-xl bg-white"
              >
                <div className="inline-flex p-4 bg-[#D4AF37]/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{value.title}</h3>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{value.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Testimonial */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/20 rounded-xl">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex p-3 bg-[#D4AF37]/20 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-[#1A1A1A] mb-6 text-balance leading-relaxed">
              "L'École de Foot Farafina a transformé la vie de mon fils. Non seulement il a
              progressé techniquement, mais il a aussi gagné en confiance et en discipline. Les
              coachs sont passionnés et vraiment investis dans le développement de chaque
              enfant."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-lg">
                AM
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A]">Aminata Mbaye</p>
                <p className="text-sm text-[#1A1A1A]/70">Mère d'élève U12</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

