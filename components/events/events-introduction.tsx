"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Sparkles, TrendingUp, Users, Award, Trophy } from "lucide-react"

export function EventsIntroduction() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-24 bg-[#0f1012] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05),_transparent_70%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Sparkles className="h-4 w-4" />
            {t("events.introduction.badge") || "Notre Mission"}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              {t("events.introduction.title") || "Des Événements pour Tous"}
            </span>
          </h2>
          <p className="text-xl text-white/80 leading-relaxed text-pretty max-w-3xl mx-auto">
            {t("events.introduction.description") || "Nous organisons régulièrement des événements variés pour permettre à chacun de découvrir l'académie, développer ses compétences et vivre des expériences uniques dans le monde du football."}
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Trophy, title: "Événements Variés", description: "Détections, stages, tournois et plus" },
              { icon: Users, title: "Pour Tous", description: "Ouvert à tous les niveaux et âges" },
              { icon: Award, title: "Excellence", description: "Encadrement professionnel garanti" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
