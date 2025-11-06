"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, Target, Trophy } from "lucide-react"

export function ProgramsByAge() {
  const [activeTab, setActiveTab] = useState(0)

  const programs = [
    {
      ageGroup: "U12 – U15",
      title: "Développement des Fondamentaux",
      icon: <Users size={28} />,
      goals: [
        "Maîtriser les compétences techniques fondamentales",
        "Développer la conscience tactique et l'intelligence de jeu",
        "Construire la littératie physique et la coordination",
        "Établir une base académique solide",
      ],
      trainingIntensity: "15-18 heures/semaine",
      competition: "Ligues et tournois régionaux jeunes",
      description:
        "Notre programme de base se concentre sur le développement d'athlètes complets avec de solides capacités techniques, une compréhension tactique et l'excellence académique.",
    },
    {
      ageGroup: "U16 – U18",
      title: "Parcours Performance Élite",
      icon: <Target size={28} />,
      goals: [
        "Maîtrise technique et tactique avancée",
        "Conditionnement physique haute intensité",
        "Exposition aux clubs professionnels et essais",
        "Préparation universitaire et planification de carrière",
      ],
      trainingIntensity: "20-25 heures/semaine",
      competition: "Ligues nationales, tournois internationaux, événements de présentation",
      description:
        "Le parcours élite prépare les athlètes à haut potentiel aux carrières professionnelles grâce à un entraînement intensif, une exposition compétitive et un soutien académique complet.",
    },
    {
      ageGroup: "Post-Académie",
      title: "Développement Professionnel",
      icon: <Trophy size={28} />,
      goals: [
        "Placement et contrats dans les clubs professionnels",
        "Formation continue et soutien de carrière",
        "Réseau d'anciens élèves et mentorat",
        "Transition vers le football professionnel",
      ],
      trainingIntensity: "Programmes personnalisés",
      competition: "Ligues professionnelles et transferts internationaux",
      description:
        "Notre programme post-académie soutient les diplômés dans leur transition vers le football professionnel tout en maintenant des parcours de développement éducatif et personnel.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#2E2E2E] mb-6 text-balance">
            Programmes par <span className="text-[#16A34A]">Groupe d'Âge</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Des parcours de développement sur mesure conçus pour répondre aux besoins uniques de chaque groupe d'âge et
            niveau de compétence.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {programs.map((program, index) => (
            <Button
              key={index}
              onClick={() => setActiveTab(index)}
              variant={activeTab === index ? "default" : "outline"}
              size="lg"
              className={`text-base h-12 px-6 ${
                activeTab === index
                  ? "bg-[#16A34A] hover:bg-[#15803D] text-white"
                  : "bg-white hover:bg-muted text-[#2E2E2E]"
              }`}
            >
              {program.ageGroup}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border">
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-[#16A34A]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="text-[#16A34A]">{programs[activeTab].icon}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#16A34A] mb-2">{programs[activeTab].ageGroup}</div>
                  <h3 className="font-sans font-bold text-3xl text-[#2E2E2E] mb-3">{programs[activeTab].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{programs[activeTab].description}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Intensité d'Entraînement</div>
                  <div className="font-sans font-bold text-xl text-[#2E2E2E]">
                    {programs[activeTab].trainingIntensity}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-6 md:col-span-2">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Focus Compétition</div>
                  <div className="font-medium text-[#2E2E2E]">{programs[activeTab].competition}</div>
                </div>
              </div>

              {/* Goals */}
              <div>
                <h4 className="font-sans font-bold text-xl text-[#2E2E2E] mb-4">Objectifs du Programme</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {programs[activeTab].goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-muted-foreground">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
