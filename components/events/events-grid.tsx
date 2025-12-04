"use client"

import { useState, useMemo, useEffect } from "react"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { Filter, Sparkles, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

export function EventsGrid() {
  const { t } = useTranslation()

  const events = useMemo(() => [
    {
      id: "9",
      date: "Saison 2025-2026",
      title: "Inscriptions Ouvertes - Saison 2025-2026",
      location: "FARAFINA FOOT ACADEMY",
      type: "portes-ouvertes" as const,
      description: "Rejoignez l'élite de demain. Formez des talents, bâtissez des légendes. Inscriptions ouvertes pour la saison 2025-2026.",
      image: "/affiche.png",
      time: "Mercredi, Samedi, Dimanche",
      isFree: false,
      participants: 0,
      maxParticipants: 200,
      status: "open" as const,
      isFeatured: true,
    },
  ], [t])

  const eventTypes = useMemo(() => [
    t("events.grid.filters.all") || "Tous",
    t("events.grid.filters.detection") || "Détection",
    t("events.grid.filters.tournament") || "Tournoi",
    t("events.grid.filters.visit") || "Visite",
    t("events.grid.filters.conference") || "Conférence",
    t("events.grid.filters.ceremony") || "Cérémonie",
    t("events.grid.filters.openHouse") || "Portes Ouvertes",
    t("events.grid.filters.camp") || "Stage",
  ], [t])

  const eventTypeValues = ["Tous", "détection", "tournoi", "visite", "conférence", "cérémonie", "portes-ouvertes", "camp"]
  const [selectedType, setSelectedType] = useState("Tous")

  const filteredEvents =
    selectedType === "Tous" ? events : events.filter((event) => event.type === selectedType)

  // Activer les animations reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [filteredEvents])

  return (
    <section id="calendar" className="relative py-16 lg:py-24 bg-[#0f1012] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_60%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Sparkles className="h-4 w-4" />
            {t("events.grid.badge") || "Calendrier Complet"}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              {t("events.grid.title") || "Tous nos Événements"}
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t("events.grid.description") || "Découvrez notre programme complet d'événements et d'activités"}
          </p>
        </div>

        {/* Filter Bar - Masqué car un seul événement */}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal"
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <Filter className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-white/60 text-lg font-semibold mb-2">
              {t("events.grid.noEvents") || "Aucun événement trouvé"}
            </p>
            <p className="text-white/40 text-sm">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
