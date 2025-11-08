"use client"

import { useState } from "react"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

const events = [
  {
    id: "1",
    date: "15 Mars 2025",
    title: "Journée de Détection Nationale",
    location: "Stade de Cayar, Sénégal",
    type: "détection" as const,
    description:
      "Une journée exceptionnelle pour découvrir les talents du football africain. Évaluation complète des compétences techniques, tactiques et physiques.",
    image: "/african-youth-football-training-action-shot.jpg",
  },
  {
    id: "2",
    date: "22-24 Mars 2025",
    title: "Camp d'Entraînement Intensif",
    location: "Complexe FFA, Cayar",
    type: "camp" as const,
    description:
      "Trois jours d'entraînement intensif avec nos coaches internationaux. Perfectionnement technique et préparation physique de haut niveau.",
    image: "/african-football-academy-elite-training.jpg",
  },
  {
    id: "3",
    date: "5 Avril 2025",
    title: "Tournoi Régional U-17",
    location: "Stade Régional, Thiès",
    type: "tournoi" as const,
    description:
      "Compétition régionale rassemblant les meilleures équipes de la région. Une opportunité de briller et de se faire remarquer.",
    image: "/young-african-football-players-training.jpg",
  },
  {
    id: "4",
    date: "12 Avril 2025",
    title: "Visite du Club Partenaire - ASEC Mimosas",
    location: "Complexe FFA, Cayar",
    type: "visite" as const,
    description:
      "Rencontre exclusive avec les représentants de l'ASEC Mimosas. Découvrez les opportunités de carrière professionnelle.",
    image: "/african-students-studying-in-modern-classroom.jpg",
  },
  {
    id: "5",
    date: "20 Avril 2025",
    title: "Journée Portes Ouvertes",
    location: "Complexe FFA, Cayar",
    type: "portes-ouvertes" as const,
    description:
      "Découvrez nos installations, rencontrez nos équipes pédagogiques et sportives. Visite guidée et présentation des programmes.",
    image: "/african-youth-football-training-action-shot.jpg",
  },
  {
    id: "6",
    date: "28 Avril 2025",
    title: "Conférence : Excellence Sportive & Académique",
    location: "Auditorium FFA, Cayar",
    type: "conférence" as const,
    description:
      "Table ronde avec des experts du sport et de l'éducation. Échanges sur l'équilibre entre performance sportive et réussite académique.",
    image: "/african-students-studying-in-modern-classroom.jpg",
  },
  {
    id: "7",
    date: "10 Mai 2025",
    title: "Cérémonie de Remise des Diplômes",
    location: "Complexe FFA, Cayar",
    type: "cérémonie" as const,
    description:
      "Célébration de la réussite de nos étudiants. Remise des diplômes et reconnaissance des performances exceptionnelles.",
    image: "/african-football-academy-elite-training.jpg",
  },
  {
    id: "8",
    date: "18 Mai 2025",
    title: "Tournoi National des Académies",
    location: "Stade National, Dakar",
    type: "tournoi" as const,
    description:
      "Le plus grand tournoi inter-académies du Sénégal. Compétition de haut niveau avec les meilleures académies du pays.",
    image: "/young-african-football-players-training.jpg",
  },
]

const eventTypes = ["Tous", "détection", "tournoi", "visite", "conférence", "cérémonie", "portes-ouvertes", "camp"]

export function EventsGrid() {
  const [selectedType, setSelectedType] = useState("Tous")

  const filteredEvents =
    selectedType === "Tous" ? events : events.filter((event) => event.type === selectedType)

  return (
    <section id="calendar" className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
            Calendrier des Événements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez tous nos événements et inscrivez-vous aux activités qui vous intéressent.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className={
                selectedType === type
                  ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  : "border-border hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
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
            <p className="text-muted-foreground text-lg">Aucun événement trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  )
}

