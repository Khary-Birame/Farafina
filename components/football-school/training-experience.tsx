"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Activity, BarChart3 } from "lucide-react"

export function TrainingExperience() {
  const weeklySchedule = [
    {
      day: "Mercredi",
      time: "17h - 20h",
      groups: "U10-U18",
      sessions: [
        { type: "Technique", time: "17h-18h" },
        { type: "Tactique", time: "18h-19h" },
        { type: "Match", time: "19h-20h" },
      ],
    },
    {
      day: "Samedi",
      time: "9h - 18h30",
      groups: "Toutes catégories",
      sessions: [
        { type: "U7-U9", time: "9h-11h" },
        { type: "U10-U12", time: "11h-13h" },
        { type: "U13-U15", time: "14h-16h" },
        { type: "U16-U18", time: "16h-18h30" },
      ],
    },
  ]

  const performanceLab = {
    title: "Performance Lab",
    description: "Tests, stats et évaluation physique",
    features: [
      "Tests de vitesse et d'agilité",
      "Analyse de la condition physique",
      "Suivi des statistiques de performance",
      "Bilans individuels mensuels",
    ],
  }

  return (
    <section className="py-24 bg-[#1A1A1A]/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Expérience d'Entraînement
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Une structure hebdomadaire inspirée des meilleures académies
          </p>
        </div>

        {/* Weekly Schedule */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {weeklySchedule.map((day, index) => (
            <Card
              key={index}
              className="p-8 border-2 border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-all duration-300 rounded-xl bg-white shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#000000] rounded-xl flex items-center justify-center shadow-lg border border-[#D4AF37]/30">
                  <Calendar className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#000000]">{day.day}</h3>
                  <div className="flex items-center gap-2 text-[#D4AF37] font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>{day.time}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-[#1A1A1A]/70 mb-3">
                  Groupes : <span className="text-[#000000]">{day.groups}</span>
                </p>
              </div>

              <div className="space-y-3">
                {day.sessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#1A1A1A]/5 rounded-lg border border-[#1A1A1A]/10"
                  >
                    <span className="text-sm font-medium text-[#000000]">
                      {session.type}
                    </span>
                    <span className="text-sm text-[#D4AF37] font-semibold">
                      {session.time}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Match Days */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-[#000000] to-[#1A1A1A] text-white border-2 border-[#D4AF37]/20 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-[#000000]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Matchs & Compétitions</h3>
              <p className="text-white/80">Weekends et tournois officiels</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-[#D4AF37]/20">
              <p className="text-sm text-white/70 mb-1">Matchs amicaux</p>
              <p className="text-lg font-semibold text-white">Tous les samedis</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-[#D4AF37]/20">
              <p className="text-sm text-white/70 mb-1">Tournois locaux</p>
              <p className="text-lg font-semibold text-white">1x par mois</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-[#D4AF37]/20">
              <p className="text-sm text-white/70 mb-1">Compétitions officielles</p>
              <p className="text-lg font-semibold text-white">Saison complète</p>
            </div>
          </div>
        </Card>

        {/* Performance Lab */}
        <Card className="p-8 border-2 border-[#D4AF37]/30 bg-white rounded-xl shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-[#000000] rounded-xl flex items-center justify-center shadow-lg border border-[#D4AF37]/30 flex-shrink-0">
              <BarChart3 className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                {performanceLab.title}
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed mb-4">
                {performanceLab.description}
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {performanceLab.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 bg-[#1A1A1A]/5 rounded-lg border border-[#1A1A1A]/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-sm text-[#000000]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Location */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[#1A1A1A]/70">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm">
              Campus Farafina Foot Academy - Terrain principal
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
