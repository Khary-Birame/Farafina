"use client"

import React from "react"
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"

interface EventCardProps {
  id: string
  date: string
  title: string
  location: string
  type: "détection" | "tournoi" | "visite" | "conférence" | "cérémonie" | "portes-ouvertes" | "camp"
  description: string
  image?: string
}

const eventTypeColors: Record<string, string> = {
  détection: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  tournoi: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  visite: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  conférence: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  cérémonie: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  "portes-ouvertes": "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  "camp": "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
}

const eventTypeIcons: Record<string, React.ReactElement> = {
  détection: <Trophy className="w-4 h-4" />,
  tournoi: <Trophy className="w-4 h-4" />,
  visite: <MapPin className="w-4 h-4" />,
  conférence: <Calendar className="w-4 h-4" />,
  cérémonie: <Calendar className="w-4 h-4" />,
  "portes-ouvertes": <MapPin className="w-4 h-4" />,
  "camp": <Trophy className="w-4 h-4" />,
}

export function EventCard({ date, title, location, type, description, image }: EventCardProps) {
  const { t } = useTranslation()

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-[#D4AF37]">
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${eventTypeColors[type] || eventTypeColors.détection}`}
            >
              {eventTypeIcons[type]}
              {t(`events.grid.filters.${type === "portes-ouvertes" ? "openHouse" : type === "cérémonie" ? "ceremony" : type}`)}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        <h3 className="font-sans font-bold text-xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{description}</p>

        <Link href={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Button
            variant="outline"
            className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors group/btn"
          >
            {t("events.card.viewDetails")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

