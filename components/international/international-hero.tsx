"use client"

import { Button } from "@/components/ui/button"
import { Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export function InternationalHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/african-youth-football-training-action-shot.jpg')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#D4AF37]/30 backdrop-blur-sm">
            <Globe className="w-4 h-4" />
            <span>Excellence Mondiale</span>
          </div>

          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight text-balance">
            L'Excellence au-delà des Frontières
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-pretty max-w-2xl mx-auto">
            Un accompagnement international pour propulser nos talents vers le succès. Formation, suivi et
            protection pour chaque joueur dans son parcours à l'étranger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#program">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-white text-base h-12 px-8 shadow-lg"
              >
                Découvrir le programme
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 backdrop-blur-sm bg-white/5"
              >
                Nous rejoindre
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}

