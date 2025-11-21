"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, ArrowRight, Clock, Star, Sparkles } from "lucide-react"
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
                  src="/african-youth-football-training-action-shot.jpg"
                  alt="Événement phare"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/80 via-[#D4AF37]/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Trophy className="w-32 h-32 text-white/20 mx-auto mb-4" />
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm">
                      <Star className="w-4 h-4 fill-white" />
                      Événement Phare
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f1012]">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit border border-[#D4AF37]/30">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("events.featured.badge") || "Événement à ne pas manquer"}</span>
                </div>

                <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  {t("events.featured.title") || "Journée de Détection de Talents"}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Date</p>
                      <p className="text-white font-bold">{t("events.featured.date") || "15 Mars 2024"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Lieu</p>
                      <p className="text-white font-bold">{t("events.featured.location") || "Stade Principal"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">Participants</p>
                      <p className="text-white font-bold">{t("events.featured.participants") || "100 places disponibles"}</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed mb-8 text-lg">
                  {t("events.featured.description") || "Rejoignez-nous pour une journée exceptionnelle de détection de talents. C'est l'opportunité parfaite pour intégrer notre académie d'excellence."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/apply">
                    <Button
                      size="lg"
                      className="group h-14 px-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {t("events.featured.participateButton") || "S'inscrire"}
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#calendar">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold rounded-xl transition-all duration-300"
                    >
                      {t("events.featured.viewAllButton") || "Voir tous les événements"}
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
