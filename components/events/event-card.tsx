"use client"

import React, { useState } from "react"
import { Calendar, MapPin, Trophy, ArrowRight, Clock, Users, Star, Sparkles, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { cn, formatCurrency, generateSlug } from "@/lib/utils"

interface EventCardProps {
  id: string
  date: string
  title: string
  location: string
  type: "détection" | "tournoi" | "visite" | "conférence" | "cérémonie" | "portes-ouvertes" | "camp"
  description: string
  image?: string
  time?: string
  price?: number
  isFree?: boolean
  participants?: number
  maxParticipants?: number
  status?: "open" | "full" | "closed"
  isFeatured?: boolean
}

const eventTypeColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  détection: {
    bg: "bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20",
    text: "text-[#D4AF37]",
    border: "border-[#D4AF37]/30",
    icon: "🎯"
  },
  tournoi: {
    bg: "bg-gradient-to-r from-blue-500/20 to-indigo-500/20",
    text: "text-blue-400",
    border: "border-blue-400/30",
    icon: "🏆"
  },
  visite: {
    bg: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
    text: "text-green-400",
    border: "border-green-400/30",
    icon: "📍"
  },
  conférence: {
    bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    text: "text-purple-400",
    border: "border-purple-400/30",
    icon: "🎤"
  },
  cérémonie: {
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
    text: "text-amber-400",
    border: "border-amber-400/30",
    icon: "🎉"
  },
  "portes-ouvertes": {
    bg: "bg-gradient-to-r from-cyan-500/20 to-teal-500/20",
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    icon: "🚪"
  },
  camp: {
    bg: "bg-gradient-to-r from-red-500/20 to-rose-500/20",
    text: "text-red-400",
    border: "border-red-400/30",
    icon: "⛺"
  },
}

const eventTypeIcons: Record<string, React.ReactElement> = {
  détection: <Trophy className="w-4 h-4" />,
  tournoi: <Trophy className="w-4 h-4" />,
  visite: <MapPin className="w-4 h-4" />,
  conférence: <Calendar className="w-4 h-4" />,
  cérémonie: <Award className="w-4 h-4" />,
  "portes-ouvertes": <MapPin className="w-4 h-4" />,
  camp: <Trophy className="w-4 h-4" />,
}

export function EventCard({ 
  date, 
  title, 
  location, 
  type, 
  description, 
  image,
  time,
  price,
  isFree = true,
  participants,
  maxParticipants,
  status = "open",
  isFeatured = false
}: EventCardProps) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const typeConfig = eventTypeColors[type] || eventTypeColors.détection

  const getStatusBadge = () => {
    switch (status) {
      case "full":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            Complet
          </span>
        )
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">
            Clôturé
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            Inscriptions ouvertes
          </span>
        )
    }
  }

  const slug = generateSlug(title)

  return (
    <Link href={`/events/${slug}`}>
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 transition-all duration-500 cursor-pointer",
          "bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] border-white/10",
          "hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2",
          isFeatured && "ring-4 ring-[#D4AF37]/30"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        {image && (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered ? "scale-110" : "scale-100"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm",
                    typeConfig.bg,
                    typeConfig.text,
                    typeConfig.border
                  )}
                >
                  <span>{typeConfig.icon}</span>
                  {t(`events.grid.filters.${type === "portes-ouvertes" ? "openHouse" : type === "cérémonie" ? "ceremony" : type}`)}
                </span>
                {isFeatured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white border border-[#D4AF37]/30">
                    <Star className="w-3 h-3 fill-white" />
                    Événement phare
                  </span>
                )}
              </div>
              {getStatusBadge()}
            </div>

            {/* Hover Overlay */}
            <div className={cn(
              "absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-[2px] transition-all duration-300 pointer-events-none",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-[#D4AF37]/90 backdrop-blur-md rounded-full text-white font-bold text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Voir les détails
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Date & Location */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{date}</span>
            </div>
            {time && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{time}</span>
                </div>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-sans font-black text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          {/* Info Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mb-4">
            <div className="flex items-center gap-4">
              {price !== undefined && (
                <div className="flex items-center gap-1">
                  {isFree ? (
                    <span className="text-lg font-black text-green-400">Gratuit</span>
                  ) : (
                    <span className="text-lg font-black text-[#D4AF37]">{formatCurrency(price)}</span>
                  )}
                </div>
              )}
              {maxParticipants && (
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Users className="w-4 h-4" />
                  <span>
                    {participants || 0}/{maxParticipants}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-white/80">4.8</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="outline"
            className={cn(
              "w-full border-2 rounded-xl font-bold transition-all duration-300 group/btn",
              status === "open"
                ? "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                : "border-white/20 text-white/50 cursor-not-allowed"
            )}
            disabled={status !== "open"}
            onClick={(e) => {
              if (status !== "open") {
                e.preventDefault()
              }
            }}
          >
            {status === "open" ? (
              <>
                {t("events.card.viewDetails") || "Voir les détails"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </>
            ) : status === "full" ? (
              "Complet"
            ) : (
              "Clôturé"
            )}
          </Button>
        </div>
      </article>
    </Link>
  )
}
