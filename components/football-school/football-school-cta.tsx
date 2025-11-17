"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function FootballSchoolCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D4AF37 1px, transparent 1px),
              linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Motion streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent transform -skew-y-12 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-1 h-40 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent transform skew-y-12 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Ton Aventure Commence Maintenant
            </span>
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
          Ton aventure commence maintenant.
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 text-balance leading-relaxed max-w-3xl mx-auto">
          Rejoins une communauté de passionnés, développe ton talent avec les meilleurs coachs
          et réalise ton rêve de football.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-[#000000] hover:bg-[#1A1A1A] hover:border-[#D4AF37] hover:border-2 text-white font-bold text-lg px-10 py-7 rounded-lg shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            <Link href="/admissions" className="flex items-center gap-2">
              S'inscrire à l'École de Foot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 border-2 border-white/30 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-white/5 font-semibold text-lg px-10 py-7 rounded-lg transition-all duration-300"
          >
            <Link href="/contact">Demander plus d'informations</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-white/20">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">500+</p>
            <p className="text-sm text-white/80">Jeunes inscrits</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">15+</p>
            <p className="text-sm text-white/80">Coachs certifiés</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">4</p>
            <p className="text-sm text-white/80">Catégories d'âge</p>
          </div>
        </div>
      </div>
    </section>
  )
}
