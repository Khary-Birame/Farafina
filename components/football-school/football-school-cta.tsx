"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FootballSchoolCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#000000] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
          Prêt à Commencer ?
        </h2>
        <p className="text-xl text-white/90 mb-10 text-balance leading-relaxed">
          Rejoins des centaines de jeunes passionnés et développe ton talent avec les meilleurs
          coachs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300"
          >
            <Link href="/admissions">Inscription à l'École de Foot</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
          >
            <Link href="/contact">Nous Contacter</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D4AF37] mb-2">500+</p>
            <p className="text-sm text-white/80">Jeunes inscrits</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D4AF37] mb-2">15+</p>
            <p className="text-sm text-white/80">Coachs certifiés</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D4AF37] mb-2">4</p>
            <p className="text-sm text-white/80">Catégories d'âge</p>
          </div>
        </div>
      </div>
    </section>
  )
}

