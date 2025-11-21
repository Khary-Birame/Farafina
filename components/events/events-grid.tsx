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
      id: "1",
      date: t("events.grid.events.detection.date") || "15 Mars 2024",
      title: t("events.grid.events.detection.title") || "Journée de Détection de Talents",
      location: t("events.grid.events.detection.location") || "Stade Principal",
      type: "détection" as const,
      description: t("events.grid.events.detection.description") || "Découvrez vos talents et intégrez notre académie d'excellence.",
      image: "/african-youth-football-training-action-shot.jpg",
      time: "09:00 - 17:00",
      isFree: true,
      participants: 45,
      maxParticipants: 100,
      status: "open" as const,
      isFeatured: true,
    },
    {
      id: "2",
      date: t("events.grid.events.camp.date") || "20-25 Mars 2024",
      title: t("events.grid.events.camp.title") || "Stage d'Entraînement Intensif",
      location: t("events.grid.events.camp.location") || "Centre d'Entraînement",
      type: "camp" as const,
      description: t("events.grid.events.camp.description") || "Stage complet de 5 jours pour perfectionner vos compétences.",
      image: "/african-football-academy-elite-training.jpg",
      time: "08:00 - 18:00",
      price: 50000,
      isFree: false,
      participants: 28,
      maxParticipants: 30,
      status: "open" as const,
    },
    {
      id: "3",
      date: t("events.grid.events.tournament.date") || "30 Mars 2024",
      title: t("events.grid.events.tournament.title") || "Tournoi Inter-Académies",
      location: t("events.grid.events.tournament.location") || "Complexe Sportif",
      type: "tournoi" as const,
      description: t("events.grid.events.tournament.description") || "Compétition amicale entre les meilleures académies de la région.",
      image: "/young-african-football-players-training.jpg",
      time: "10:00 - 20:00",
      isFree: true,
      participants: 120,
      maxParticipants: 150,
      status: "open" as const,
    },
    {
      id: "4",
      date: t("events.grid.events.visit.date") || "5 Avril 2024",
      title: t("events.grid.events.visit.title") || "Visite Guidée du Centre",
      location: t("events.grid.events.visit.location") || "Académie Farafina",
      type: "visite" as const,
      description: t("events.grid.events.visit.description") || "Découvrez nos installations et notre méthode d'enseignement.",
      image: "/african-students-studying-in-modern-classroom.jpg",
      time: "14:00 - 16:00",
      isFree: true,
      participants: 15,
      maxParticipants: 25,
      status: "open" as const,
    },
    {
      id: "5",
      date: t("events.grid.events.openHouse.date") || "12 Avril 2024",
      title: t("events.grid.events.openHouse.title") || "Journée Portes Ouvertes",
      location: t("events.grid.events.openHouse.location") || "Académie Farafina",
      type: "portes-ouvertes" as const,
      description: t("events.grid.events.openHouse.description") || "Rencontrez nos équipes et découvrez nos programmes.",
      image: "/african-youth-football-training-action-shot.jpg",
      time: "09:00 - 17:00",
      isFree: true,
      participants: 80,
      maxParticipants: 200,
      status: "open" as const,
    },
    {
      id: "6",
      date: t("events.grid.events.conference.date") || "18 Avril 2024",
      title: t("events.grid.events.conference.title") || "Conférence sur le Football Professionnel",
      location: t("events.grid.events.conference.location") || "Salle de Conférence",
      type: "conférence" as const,
      description: t("events.grid.events.conference.description") || "Intervention d'experts sur les carrières professionnelles.",
      image: "/african-students-studying-in-modern-classroom.jpg",
      time: "18:00 - 20:00",
      isFree: true,
      participants: 60,
      maxParticipants: 100,
      status: "open" as const,
    },
    {
      id: "7",
      date: t("events.grid.events.graduation.date") || "25 Avril 2024",
      title: t("events.grid.events.graduation.title") || "Cérémonie de Remise des Diplômes",
      location: t("events.grid.events.graduation.location") || "Grande Salle",
      type: "cérémonie" as const,
      description: t("events.grid.events.graduation.description") || "Célébration de la promotion 2024 de l'académie.",
      image: "/african-football-academy-elite-training.jpg",
      time: "16:00 - 19:00",
      isFree: true,
      participants: 200,
      maxParticipants: 300,
      status: "open" as const,
    },
    {
      id: "8",
      date: t("events.grid.events.nationalTournament.date") || "1-3 Mai 2024",
      title: t("events.grid.events.nationalTournament.title") || "Championnat National des Académies",
      location: t("events.grid.events.nationalTournament.location") || "Stade National",
      type: "tournoi" as const,
      description: t("events.grid.events.nationalTournament.description") || "Compétition nationale réunissant les meilleures académies.",
      image: "/young-african-football-players-training.jpg",
      time: "09:00 - 21:00",
      isFree: true,
      participants: 250,
      maxParticipants: 300,
      status: "full" as const,
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

        {/* Filter Bar - Sticky Premium */}
        <div className="sticky top-20 z-40 mb-12 rounded-3xl border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-md shadow-xl">
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                <Filter className="h-4 w-4" />
                {t("events.grid.filtersLabel") || "Filtrer par type"}:
              </div>
              {eventTypes.map((type, index) => (
                <Button
                  key={eventTypeValues[index]}
                  variant={selectedType === eventTypeValues[index] ? "default" : "outline"}
                  onClick={() => setSelectedType(eventTypeValues[index])}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md",
                    selectedType === eventTypeValues[index]
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0"
                      : "border-2 border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white/5 backdrop-blur-sm"
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

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
