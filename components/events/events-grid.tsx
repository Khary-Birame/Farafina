"use client"

import { useState, useMemo } from "react"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function EventsGrid() {
  const { t } = useTranslation()

  const events = useMemo(() => [
    {
      id: "1",
      date: t("events.grid.events.detection.date"),
      title: t("events.grid.events.detection.title"),
      location: t("events.grid.events.detection.location"),
      type: "détection" as const,
      description: t("events.grid.events.detection.description"),
      image: "/african-youth-football-training-action-shot.jpg",
    },
    {
      id: "2",
      date: t("events.grid.events.camp.date"),
      title: t("events.grid.events.camp.title"),
      location: t("events.grid.events.camp.location"),
      type: "camp" as const,
      description: t("events.grid.events.camp.description"),
      image: "/african-football-academy-elite-training.jpg",
    },
    {
      id: "3",
      date: t("events.grid.events.tournament.date"),
      title: t("events.grid.events.tournament.title"),
      location: t("events.grid.events.tournament.location"),
      type: "tournoi" as const,
      description: t("events.grid.events.tournament.description"),
      image: "/young-african-football-players-training.jpg",
    },
    {
      id: "4",
      date: t("events.grid.events.visit.date"),
      title: t("events.grid.events.visit.title"),
      location: t("events.grid.events.visit.location"),
      type: "visite" as const,
      description: t("events.grid.events.visit.description"),
      image: "/african-students-studying-in-modern-classroom.jpg",
    },
    {
      id: "5",
      date: t("events.grid.events.openHouse.date"),
      title: t("events.grid.events.openHouse.title"),
      location: t("events.grid.events.openHouse.location"),
      type: "portes-ouvertes" as const,
      description: t("events.grid.events.openHouse.description"),
      image: "/african-youth-football-training-action-shot.jpg",
    },
    {
      id: "6",
      date: t("events.grid.events.conference.date"),
      title: t("events.grid.events.conference.title"),
      location: t("events.grid.events.conference.location"),
      type: "conférence" as const,
      description: t("events.grid.events.conference.description"),
      image: "/african-students-studying-in-modern-classroom.jpg",
    },
    {
      id: "7",
      date: t("events.grid.events.graduation.date"),
      title: t("events.grid.events.graduation.title"),
      location: t("events.grid.events.graduation.location"),
      type: "cérémonie" as const,
      description: t("events.grid.events.graduation.description"),
      image: "/african-football-academy-elite-training.jpg",
    },
    {
      id: "8",
      date: t("events.grid.events.nationalTournament.date"),
      title: t("events.grid.events.nationalTournament.title"),
      location: t("events.grid.events.nationalTournament.location"),
      type: "tournoi" as const,
      description: t("events.grid.events.nationalTournament.description"),
      image: "/young-african-football-players-training.jpg",
    },
  ], [t])

  const eventTypes = useMemo(() => [
    t("events.grid.filters.all"),
    t("events.grid.filters.detection"),
    t("events.grid.filters.tournament"),
    t("events.grid.filters.visit"),
    t("events.grid.filters.conference"),
    t("events.grid.filters.ceremony"),
    t("events.grid.filters.openHouse"),
    t("events.grid.filters.camp"),
  ], [t])

  const eventTypeValues = ["Tous", "détection", "tournoi", "visite", "conférence", "cérémonie", "portes-ouvertes", "camp"]
  const [selectedType, setSelectedType] = useState("Tous")

  const filteredEvents =
    selectedType === "Tous" ? events : events.filter((event) => event.type === selectedType)

  return (
    <section id="calendar" className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
            {t("events.grid.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("events.grid.description")}
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {eventTypes.map((type, index) => (
            <Button
              key={eventTypeValues[index]}
              variant={selectedType === eventTypeValues[index] ? "default" : "outline"}
              onClick={() => setSelectedType(eventTypeValues[index])}
              className={
                selectedType === eventTypeValues[index]
                  ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  : "border-border hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("events.grid.noEvents")}</p>
          </div>
        )}
      </div>
    </section>
  )
}

