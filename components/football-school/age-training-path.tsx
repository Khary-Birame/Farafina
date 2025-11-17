"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronRight, Target, Zap, Trophy, Award } from "lucide-react"

export function AgeTrainingPath() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null)

  const stages = [
    {
      age: "U7–U9",
      title: "Jeux techniques & coordination",
      description: "Découverte du football à travers le jeu",
      icon: Target,
      details: [
        "Exercices de coordination motrice",
        "Jeux ludiques avec ballon",
        "Développement de l'équilibre et de l'agilité",
        "Premiers contacts avec les règles du jeu",
        "Socialisation et esprit d'équipe",
      ],
      color: "from-[#1A1A1A] to-[#000000]",
    },
    {
      age: "U10–U12",
      title: "Technique + intelligence de jeu",
      description: "Perfectionnement des fondamentaux",
      icon: Zap,
      details: [
        "Techniques de base (passe, contrôle, dribble)",
        "Compréhension tactique simple",
        "Jeux à effectifs réduits",
        "Développement de la vision de jeu",
        "Premiers matchs amicaux",
      ],
      color: "from-[#1A1A1A] to-[#000000]",
    },
    {
      age: "U13–U15",
      title: "Tactique + physique",
      description: "Approfondissement et compétition",
      icon: Trophy,
      details: [
        "Tactique avancée (placement, pressing)",
        "Condition physique structurée",
        "Matchs de compétition réguliers",
        "Analyse vidéo des performances",
        "Préparation mentale",
      ],
      color: "from-[#1A1A1A] to-[#000000]",
    },
    {
      age: "U16–U18",
      title: "Performance & compétition",
      description: "Excellence et préparation professionnelle",
      icon: Award,
      details: [
        "Excellence technique et tactique",
        "Stratégie de jeu complexe",
        "Compétitions officielles",
        "Préparation physique intensive",
        "Orientation vers l'Académie ou le professionnalisme",
      ],
      color: "from-[#1A1A1A] to-[#000000]",
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Parcours d'Apprentissage
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Un chemin progressif adapté à chaque étape de développement
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#1A1A1A]/30 via-[#D4AF37] to-[#1A1A1A]/30 transform -translate-y-1/2 z-0" />

          {/* Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isExpanded = expandedStage === index
              
              return (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] shadow-lg border-4 border-white" />
                  </div>

                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 rounded-xl bg-white ${
                      isExpanded
                        ? "border-[#D4AF37] shadow-lg"
                        : "border-[#1A1A1A]/20 hover:border-[#D4AF37]/50"
                    }`}
                    onClick={() => setExpandedStage(isExpanded ? null : index)}
                  >
                    <div className="px-6 pt-6 pb-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md border border-[#D4AF37]/30`}>
                          <Icon className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full mb-2">
                            <span className="text-sm font-bold text-[#D4AF37]">{stage.age}</span>
                          </div>
                          <h3 className="text-lg font-bold text-[#000000] mb-1 leading-tight">
                            {stage.title}
                          </h3>
                          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-[#1A1A1A]/50 transition-transform duration-300 flex-shrink-0 mt-1 ${
                            isExpanded ? "transform rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-0 border-t border-[#1A1A1A]/20 animate-slide-in-left">
                        <ul className="space-y-2 mt-4">
                          {stage.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                              <span className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
