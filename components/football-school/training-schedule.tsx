"use client"

import { Card } from "@/components/ui/card"
import { Clock, MapPin, Check, Calendar } from "lucide-react"

export function TrainingSchedule() {
  const weekSchedule = [
    { day: "Mercredi", time: "17h - 20h", groups: "U10-U18" },
    { day: "Samedi", time: "9h - 18h30", groups: "Toutes catégories" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Planning Hebdomadaire</h2>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed">
            Séances régulières pour une progression constante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {weekSchedule.map((session, index) => (
            <Card
              key={index}
              className="p-8 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 rounded-xl bg-white shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-[#D4AF37]/10 rounded-full">
                  <Clock className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">{session.day}</h3>
                  <p className="text-lg text-[#D4AF37] font-semibold">{session.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <p>
                  <span className="font-semibold text-[#1A1A1A]">Groupes :</span> {session.groups}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-[#1A1A1A] text-white rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#D4AF37]/20 rounded-lg flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3 text-white">Lieu d'Entraînement</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Campus Farafina Foot Academy - Terrain principal
                <br />
                Route de l'Académie, Zone Sportive
              </p>
              <h3 className="text-xl font-bold mb-3 text-white mt-6">Équipement Requis</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-[#D4AF37]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span>Chaussures de football (crampons recommandés)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-[#D4AF37]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span>Tenue de sport (short, t-shirt)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-[#D4AF37]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span>Bouteille d'eau</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-[#D4AF37]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span>Kit d'entraînement FFA fourni après inscription</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

