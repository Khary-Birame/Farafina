"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, Users, Check, School, Home } from "lucide-react"

export function AcademyComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Académie ou École de Foot ?
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Découvrez les différences entre nos deux programmes et choisissez celui qui
            correspond le mieux à vos objectifs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Académie */}
          <Card className="p-8 border-2 border-[#C0C0C0] hover:border-[#1A1A1A]/20 transition-all duration-300 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#1A1A1A] rounded-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">Académie (Internat)</h3>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5">
                  <School className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Résidentiel :</strong> Hébergement complet sur le campus
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Programme complet :</strong> Football + Éducation académique
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Sélection :</strong> Admission sur dossier et essais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Objectif :</strong> Formation professionnelle d'élite
                </span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full mt-6 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-lg">
              <Link href="/admissions">En savoir plus</Link>
            </Button>
          </Card>

          {/* École de Foot */}
          <Card className="p-8 border-2 border-[#D4AF37] shadow-lg relative overflow-hidden rounded-xl">
            <div className="absolute top-4 right-4">
              <div className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                Programme Local
              </div>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#D4AF37] rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">École de Foot (Local)</h3>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/20 rounded-full mt-0.5">
                  <Home className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Non-résidentiel :</strong> Retour à la maison après l'entraînement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/20 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Focus football :</strong> Entraînement sportif uniquement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/20 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Inscription ouverte :</strong> Accessible à tous les jeunes motivés
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#D4AF37]/20 rounded-full mt-0.5">
                  <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">
                  <strong>Objectif :</strong> Développement technique et plaisir du jeu
                </span>
              </li>
            </ul>
            <Button asChild className="w-full mt-6 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold rounded-lg shadow-md">
              <Link href="#inscription">S'inscrire à l'École</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

