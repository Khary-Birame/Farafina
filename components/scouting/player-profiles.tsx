"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Award } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/hooks/use-translation"

export function PlayerProfiles() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<"all" | "male" | "female">("all")

  const players = useMemo(() => [
    {
      name: "Amadou Diallo",
      age: 16,
      gender: "male",
      position: t("scouting.profiles.positions.forward"),
      rating: 92,
      potential: 96,
      image: "/african-youth-football-player-portrait.jpg",
      highlights: [
        t("scouting.profiles.highlights.diallo.hattrick"),
        t("scouting.profiles.highlights.diallo.topScorer"),
      ],
      stats: { goals: 24, assists: 12, matches: 18 },
    },
    {
      name: "Fatou Sow",
      age: 15,
      gender: "female",
      position: t("scouting.profiles.positions.midfielder"),
      rating: 89,
      potential: 94,
      image: "/african-female-football-player-portrait.jpg",
      highlights: [
        t("scouting.profiles.highlights.sow.mvp"),
        t("scouting.profiles.highlights.sow.captain"),
      ],
      stats: { goals: 8, assists: 22, matches: 20 },
    },
    {
      name: "Ibrahim Ndiaye",
      age: 17,
      gender: "male",
      position: t("scouting.profiles.positions.defender"),
      rating: 87,
      potential: 91,
      image: "/african-youth-defender-portrait.jpg",
      highlights: [
        t("scouting.profiles.highlights.ndiaye.cleanSheet"),
        t("scouting.profiles.highlights.ndiaye.bestDefender"),
      ],
      stats: { goals: 3, assists: 5, matches: 22 },
    },
    {
      name: "Aissatou Ba",
      age: 16,
      gender: "female",
      position: t("scouting.profiles.positions.goalkeeper"),
      rating: 90,
      potential: 95,
      image: "/african-female-goalkeeper-portrait.jpg",
      highlights: [
        t("scouting.profiles.highlights.ba.goldenGlove"),
        t("scouting.profiles.highlights.ba.saveRate"),
      ],
      stats: { goals: 0, assists: 0, matches: 19 },
    },
  ], [t])

  const filteredPlayers = players.filter((player) => filter === "all" || player.gender === filter)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">{t("scouting.profiles.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("scouting.profiles.description")}
          </p>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#D4AF37] hover:bg-[#B8941F]" : ""}
            >
              {t("scouting.profiles.filters.all")}
            </Button>
            <Button
              variant={filter === "male" ? "default" : "outline"}
              onClick={() => setFilter("male")}
              className={filter === "male" ? "bg-[#D4AF37] hover:bg-[#B8941F]" : ""}
            >
              {t("scouting.profiles.filters.male")}
            </Button>
            <Button
              variant={filter === "female" ? "default" : "outline"}
              onClick={() => setFilter("female")}
              className={filter === "female" ? "bg-[#D4AF37] hover:bg-[#B8941F]" : ""}
            >
              {t("scouting.profiles.filters.female")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[#D4AF37]/30"
            >
              {/* Player Image */}
              <div className="relative h-64 bg-gradient-to-br from-[#1A1A1A] to-[#1a1a1a]">
                <Image src={player.image || "/placeholder.svg"} alt={player.name} fill className="object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-[#D4AF37] text-white border-0">{player.position}</Badge>
                  <Badge className="bg-[#D4AF37] text-[#1A1A1A] border-0">{t("scouting.profiles.age")} {player.age}</Badge>
                </div>
              </div>

              {/* Player Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{player.name}</h3>

                {/* Rating & Potential */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-2xl font-bold text-foreground">{player.rating}</span>
                    <span className="text-sm text-muted-foreground">{t("scouting.profiles.rating")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-2xl font-bold text-[#D4AF37]">{player.potential}</span>
                    <span className="text-sm text-muted-foreground">{t("scouting.profiles.potential")}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{player.stats.goals}</div>
                    <div className="text-xs text-muted-foreground">{t("scouting.profiles.stats.goals")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{player.stats.assists}</div>
                    <div className="text-xs text-muted-foreground">{t("scouting.profiles.stats.assists")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{player.stats.matches}</div>
                    <div className="text-xs text-muted-foreground">{t("scouting.profiles.stats.matches")}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {player.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
