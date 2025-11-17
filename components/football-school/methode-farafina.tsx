"use client"

import { Card } from "@/components/ui/card"
import { Zap, Award, Users, Target, BarChart3, Trophy, Play } from "lucide-react"

export function MethodeFarafina() {
  const benefits = [
    {
      icon: Zap,
      title: "Training like a pro",
      description: "Intensité progressive adaptée à chaque niveau",
    },
    {
      icon: Award,
      title: "Coaching certifié",
      description: "Méthodologie CAF / UEFA-style",
    },
    {
      icon: Users,
      title: "Groupes adaptés",
      description: "Au niveau et à l'âge de chaque joueur",
    },
    {
      icon: Target,
      title: "Suivi individuel",
      description: "Progression personnalisée et bilans réguliers",
    },
    {
      icon: BarChart3,
      title: "Performance Lab",
      description: "Tests, stats et évaluation physique",
    },
    {
      icon: Trophy,
      title: "Matchs & tournois",
      description: "Compétitions officielles et matchs amicaux",
    },
  ]

  return (
    <section id="programme" className="py-24 bg-[#1A1A1A]/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D4AF37 1px, transparent 1px),
              linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            La Méthode Farafina
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Une approche élite inspirée des meilleures académies du monde
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:border-[#D4AF37] border-2 border-[#1A1A1A]/20 rounded-xl bg-white group"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 bg-[#000000] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000000] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Video Placeholder */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden rounded-2xl border-2 border-[#1A1A1A]/20 bg-gradient-to-br from-[#000000] to-[#1A1A1A] group cursor-pointer">
            <div className="aspect-video relative">
              {/* Placeholder for video */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#000000] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#000000] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-[#D4AF37] ml-1" />
                  </div>
                  <p className="text-white/90 font-semibold text-lg">
                    Vidéo de présentation (15-20s)
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Découvre l'ambiance et l'intensité de nos entraînements
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
