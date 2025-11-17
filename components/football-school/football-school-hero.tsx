"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function FootballSchoolHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/youth-football-training-field-coaching.jpg"
          alt="École de Foot - Entraînement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/95 via-[#1A1A1A]/90 to-[#000000]/95" />
        {/* Pitch texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D4AF37 1px, transparent 1px),
              linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Motion streaks decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent transform -skew-y-12 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-1 h-40 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent transform skew-y-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-1 h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/15 to-transparent transform -skew-y-6 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Dynamic arrows */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 text-[#D4AF37] transform rotate-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight tracking-tight">
          École de Foot – Le Premier Pas Vers Ton Rêve
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 text-balance leading-relaxed max-w-3xl mx-auto">
          Un programme ouvert à tous — pour progresser, s'amuser et révéler son potentiel.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-[#000000] hover:bg-[#1A1A1A] hover:border-[#D4AF37] hover:border-2 text-white font-bold text-lg px-10 py-7 rounded-lg shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            <Link href="#inscription" className="flex items-center gap-2">
              Je veux m'inscrire
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-white/5 font-semibold text-lg px-10 py-7 rounded-lg transition-all duration-300"
          >
            <Link href="#programme" className="flex items-center gap-2">
              Découvrir le programme
              <Play className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
