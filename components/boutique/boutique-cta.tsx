"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from "@/lib/hooks/use-translation"

export function BoutiqueCTA() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full mb-6">
          <Heart className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-sm font-medium text-[#D4AF37]">Soutenez l'Académie</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
          <span className="block">Rejoignez la</span>
          <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent animate-gradient">
            Communauté Farafina
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Chaque achat contribue directement au développement de nos talents et à la croissance de l'académie.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#catalogue">
            <Button className="group h-16 px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300">
              <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explorer la Collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/apply">
            <Button
              variant="outline"
              className="h-16 px-10 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg transition-all duration-300"
            >
              Devenir Membre
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
