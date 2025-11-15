"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FootballSchoolHero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/youth-football-training-field-coaching.jpg"
          alt="École de Foot - Entraînement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
          École de Foot – Rejoins le Mouvement
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance leading-relaxed">
          Un programme ouvert pour les passionnés de football, sans internat.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300"
        >
          <Link href="#inscription">S'inscrire Maintenant</Link>
        </Button>
      </div>
    </section>
  )
}

