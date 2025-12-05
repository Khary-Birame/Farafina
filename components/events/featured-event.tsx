"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function FeaturedEvent() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-24 bg-[#0f1012] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(212,175,55,0.08),_transparent_60%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto min-h-[500px]">
                <Image
                  src="/affiche.png"
                  alt="Inscriptions Ouvertes - Saison 2025-2026"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f1012]">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit border border-[#D4AF37]/30">
                  <Sparkles className="w-4 h-4" />
                  <span>Inscriptions Ouvertes</span>
                </div>

                <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  Inscriptions Ouvertes - Saison 2025-2026
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Saison</p>
                      <p className="text-white font-bold">2025-2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Lieu</p>
                      <p className="text-white font-bold">FARAFINA FOOT ACADEMY</p>
                      <p className="text-white/60 text-sm">FANN HOCK LOTS N°10 DAKAR</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Horaires</p>
                      <p className="text-white font-bold">Mercredi, Samedi, Dimanche</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Âge</p>
                      <p className="text-white font-bold">6 à 20 ans</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed mb-8 text-lg">
                  Rejoignez l'élite de demain. Formez des talents, bâtissez des légendes. Rejoignez une académie d'excellence dédiée à la formation des jeunes footballeurs et footballeuses.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/apply">
                    <Button
                      size="lg"
                      className="group h-14 px-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      S'inscrire maintenant
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#calendar">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold rounded-xl transition-all duration-300"
                    >
                      Voir tous les événements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
