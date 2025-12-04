"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Mail, Trophy, TrendingUp, Target, Zap, Shield, Award, Star, Users, Calendar, MapPin, Flag, Ruler, Weight, Footprints, Share2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock player data - in production, this would come from an API/database
const getPlayerById = (id: string) => {
  const players = [
    {
      id: 1,
      name: "Amadou Diallo",
      age: 17,
      position: "Attaquant",
      category: "U18",
      nationality: "Sénégal",
      height: "1,78 m",
      weight: "72 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 8.5,
      image: "/young-african-football-player-striker.jpg",
      stats: {
        matchesPlayed: 28,
        goals: 15,
        assists: 8,
        speed: 9.0,
        endurance: 8.5,
        intensity: 8.8,
        technique: 8.2,
      },
      coachFeedback:
        "Amadou est un attaquant prometteur avec une excellente lecture du jeu. Son explosivité et sa capacité à créer des espaces font de lui un joueur à suivre de près. Il continue de progresser dans sa prise de décision offensive.",
      highlights: [
        {
          title: "Triplé vs École de Football Dakar",
          duration: "4:12",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
        {
          title: "Meilleurs buts de la saison",
          duration: "6:45",
          thumbnail: "/football-training-session-tactical-drills.jpg",
        },
        {
          title: "Compétences techniques",
          duration: "3:30",
          thumbnail: "/young-african-football-player-interview.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Kwame Mensah",
      age: 16,
      position: "Milieu",
      category: "U18",
      nationality: "Ghana",
      height: "1,75 m",
      weight: "68 kg",
      preferredFoot: "Gauche",
      section: "Garçons",
      performance: 8.2,
      image: "/young-african-football-player-midfielder.jpg",
      stats: {
        matchesPlayed: 26,
        goals: 6,
        assists: 12,
        speed: 8.0,
        endurance: 9.0,
        intensity: 8.5,
        technique: 8.7,
      },
      coachFeedback:
        "Kwame possède une vision de jeu exceptionnelle et une capacité rare à contrôler le tempo d'un match. Son intelligence tactique et sa précision dans les passes longues en font un milieu de terrain complet.",
      highlights: [
        {
          title: "Passe décisive de 40 mètres",
          duration: "2:15",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
        {
          title: "Contrôle du milieu de terrain",
          duration: "5:20",
          thumbnail: "/football-training-session-tactical-drills.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Ibrahim Traoré",
      age: 15,
      position: "Défenseur",
      category: "U15",
      nationality: "Côte d'Ivoire",
      height: "1,72 m",
      weight: "65 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 7.8,
      image: "/young-african-football-player-defender.jpg",
      stats: {
        matchesPlayed: 22,
        goals: 2,
        assists: 4,
        speed: 7.5,
        endurance: 8.0,
        intensity: 8.2,
        technique: 7.5,
      },
      coachFeedback:
        "Ibrahim montre une grande maturité défensive pour son âge. Son anticipation et son placement font de lui un défenseur solide et fiable.",
      highlights: [
        {
          title: "Actions défensives",
          duration: "3:45",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Mohamed Keita",
      age: 14,
      position: "Gardien",
      category: "U15",
      nationality: "Mali",
      height: "1,80 m",
      weight: "70 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 8.0,
      image: "/young-african-football-goalkeeper.jpg",
      stats: {
        matchesPlayed: 20,
        goals: 0,
        assists: 1,
        speed: 7.0,
        endurance: 8.5,
        intensity: 8.0,
        technique: 8.5,
      },
      coachFeedback:
        "Mohamed est un gardien réactif avec de bonnes capacités d'arrêt. Il continue de progresser dans sa communication avec la défense.",
      highlights: [
        {
          title: "Arrêts décisifs",
          duration: "4:00",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "Youssouf Cissé",
      age: 17,
      position: "Attaquant",
      category: "U18",
      nationality: "Burkina Faso",
      height: "1,76 m",
      weight: "71 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 8.7,
      image: "/young-african-football-player-forward.jpg",
      stats: {
        matchesPlayed: 30,
        goals: 20,
        assists: 10,
        speed: 9.2,
        endurance: 8.8,
        intensity: 9.0,
        technique: 8.5,
      },
      coachFeedback:
        "Youssouf est un attaquant complet avec une finition remarquable. Son agressivité dans les surfaces et son instinct de buteur en font un joueur précieux.",
      highlights: [
        {
          title: "Buts spectaculaires",
          duration: "5:30",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 6,
      name: "Samuel Okonkwo",
      age: 13,
      position: "Milieu",
      category: "U12",
      nationality: "Nigeria",
      height: "1,60 m",
      weight: "55 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 7.5,
      image: "/young-african-football-player-youth.jpg",
      stats: {
        matchesPlayed: 18,
        goals: 5,
        assists: 7,
        speed: 7.8,
        endurance: 7.5,
        intensity: 7.5,
        technique: 7.8,
      },
      coachFeedback:
        "Samuel montre un grand potentiel pour son jeune âge. Sa technique et sa vision du jeu sont déjà très développées.",
      highlights: [
        {
          title: "Dribbles techniques",
          duration: "3:20",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 7,
      name: "Abdoulaye Sow",
      age: 16,
      position: "Défenseur",
      category: "U18",
      nationality: "Guinée",
      height: "1,74 m",
      weight: "69 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 7.9,
      image: "/young-african-football-player-defender-action.jpg",
      stats: {
        matchesPlayed: 25,
        goals: 1,
        assists: 3,
        speed: 7.8,
        endurance: 8.2,
        intensity: 8.0,
        technique: 7.8,
      },
      coachFeedback:
        "Abdoulaye est un défenseur polyvalent qui peut évoluer sur plusieurs postes. Sa polyvalence est un atout majeur.",
      highlights: [
        {
          title: "Actions défensives",
          duration: "3:50",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 8,
      name: "Kofi Asante",
      age: 15,
      position: "Attaquant",
      category: "U15",
      nationality: "Ghana",
      height: "1,73 m",
      weight: "66 kg",
      preferredFoot: "Gauche",
      section: "Garçons",
      performance: 8.3,
      image: "/young-african-football-player-striker-action.jpg",
      stats: {
        matchesPlayed: 24,
        goals: 12,
        assists: 6,
        speed: 8.5,
        endurance: 8.0,
        intensity: 8.5,
        technique: 8.3,
      },
      coachFeedback:
        "Kofi est un attaquant rapide et agile. Sa capacité à dribbler et à créer des opportunités est remarquable.",
      highlights: [
        {
          title: "Dribbles et buts",
          duration: "4:30",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 9,
      name: "Mamadou Ba",
      age: 12,
      position: "Milieu",
      category: "U12",
      nationality: "Sénégal",
      height: "1,58 m",
      weight: "52 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 7.2,
      image: "/young-african-football-player-youth.jpg",
      stats: {
        matchesPlayed: 16,
        goals: 3,
        assists: 5,
        speed: 7.2,
        endurance: 7.0,
        intensity: 7.2,
        technique: 7.5,
      },
      coachFeedback:
        "Mamadou est un jeune joueur prometteur avec une bonne base technique. Il continue de progresser régulièrement.",
      highlights: [
        {
          title: "Moments forts",
          duration: "2:45",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 10,
      name: "Cheikh Ndiaye",
      age: 17,
      position: "Défenseur",
      category: "U18",
      nationality: "Sénégal",
      height: "1,77 m",
      weight: "73 kg",
      preferredFoot: "Droit",
      section: "Garçons",
      performance: 8.1,
      image: "/young-african-football-player-defender-action.jpg",
      stats: {
        matchesPlayed: 27,
        goals: 3,
        assists: 5,
        speed: 8.0,
        endurance: 8.3,
        intensity: 8.2,
        technique: 8.0,
      },
      coachFeedback:
        "Cheikh est un défenseur solide avec une bonne lecture du jeu. Son leadership sur le terrain est apprécié.",
      highlights: [
        {
          title: "Leadership défensif",
          duration: "4:15",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
    {
      id: 11,
      name: "Fatou Sall",
      age: 16,
      position: "Attaquant",
      category: "U18",
      nationality: "Sénégal",
      height: "1,68 m",
      weight: "60 kg",
      preferredFoot: "Droit",
      section: "Filles",
      performance: 8.6,
      image: "/african-female-football-player-portrait.jpg",
      stats: {
        matchesPlayed: 24,
        goals: 18,
        assists: 10,
        speed: 9.2,
        endurance: 8.7,
        intensity: 9.0,
        technique: 8.5,
      },
      coachFeedback:
        "Fatou est une leader naturelle sur et en dehors du terrain. Sa détermination, sa technique et son sens du but en font l'une des meilleures attaquantes de sa génération. Un modèle pour le football féminin africain.",
      highlights: [
        {
          title: "Quadruplé en finale régionale",
          duration: "5:30",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
        {
          title: "Dribbles et finitions",
          duration: "4:05",
          thumbnail: "/football-training-session-tactical-drills.jpg",
        },
      ],
    },
    {
      id: 12,
      name: "Aisha Diop",
      age: 15,
      position: "Milieu",
      category: "U15",
      nationality: "Mali",
      height: "1,65 m",
      weight: "58 kg",
      preferredFoot: "Droit",
      section: "Filles",
      performance: 8.0,
      image: "/young-african-female-football-midfielder.jpg",
      stats: {
        matchesPlayed: 22,
        goals: 8,
        assists: 9,
        speed: 8.2,
        endurance: 8.5,
        intensity: 8.0,
        technique: 8.3,
      },
      coachFeedback:
        "Aisha est une milieu de terrain créative avec une excellente vision du jeu. Son travail d'équipe est exemplaire.",
      highlights: [
        {
          title: "Passes décisives",
          duration: "3:40",
          thumbnail: "/football-match-highlight-goal.jpg",
        },
      ],
    },
  ]

  return players.find((p) => p.id === Number.parseInt(id))
}

export default function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const player = getPlayerById(id)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!player) {
    notFound()
  }

  const positionIcons: Record<string, any> = {
    "Attaquant": Target,
    "Milieu": Zap,
    "Défenseur": Shield,
    "Gardien": Shield,
  }

  const PositionIcon = positionIcons[player.position] || Trophy

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/players"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour à la liste</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Player Image - Hero */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src={player.image || "/placeholder.svg"}
                  alt={player.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                  <Badge className="bg-[#D4AF37] text-white font-bold text-sm px-4 py-2 shadow-lg">
                    {player.category}
                  </Badge>
                </div>
                {/* Performance Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-bold text-lg">{player.performance}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="text-white space-y-6">
              {/* Position Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <PositionIcon className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-semibold">{player.position}</span>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block">{player.name.split(" ")[0]}</span>
                <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                  {player.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="text-3xl font-black text-[#D4AF37] mb-1">{player.stats.goals}</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Buts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="text-3xl font-black text-[#D4AF37] mb-1">{player.stats.assists}</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Passes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="text-3xl font-black text-[#D4AF37] mb-1">{player.stats.matchesPlayed}</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">Matchs</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contacter
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Partager
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information - Premium Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/5 p-8 border-b">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-[#D4AF37]" />
                Informations Personnelles
              </h2>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>Âge</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.age} ans</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Ruler className="w-4 h-4" />
                    <span>Taille</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.height}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Weight className="w-4 h-4" />
                    <span>Poids</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.weight}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Footprints className="w-4 h-4" />
                    <span>Pied fort</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.preferredFoot}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Flag className="w-4 h-4" />
                    <span>Nationalité</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.nationality}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Users className="w-4 h-4" />
                    <span>Section</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{player.section}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sports Statistics - Premium */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-4xl font-black text-gray-900">Statistiques Sportives</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Match Stats - Premium Cards */}
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Statistiques de Match
                </h3>
              </div>
              <CardContent className="p-8">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-black text-[#D4AF37] mb-2">{player.stats.matchesPlayed}</div>
                    <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Matchs</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[#D4AF37] mb-2">{player.stats.goals}</div>
                    <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Buts</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-[#D4AF37] mb-2">{player.stats.assists}</div>
                    <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Passes</div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {((player.stats.goals / player.stats.matchesPlayed) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">Taux de buts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {((player.stats.assists / player.stats.matchesPlayed) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">Taux de passes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {((player.stats.goals + player.stats.assists) / player.stats.matchesPlayed).toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600">Contributions/match</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics - Premium */}
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Métriques de Performance
                </h3>
              </div>
              <CardContent className="p-8 space-y-6">
                {[
                  { label: "Vitesse", value: player.stats.speed, icon: Zap },
                  { label: "Endurance", value: player.stats.endurance, icon: Target },
                  { label: "Intensité", value: player.stats.intensity, icon: TrendingUp },
                  { label: "Technique", value: player.stats.technique, icon: Award },
                ].map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-[#D4AF37]" />
                          <span className="font-semibold text-gray-900">{metric.label}</span>
                        </div>
                        <span className="font-black text-gray-900">{metric.value}/10</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full transition-all duration-1000 shadow-lg"
                          style={{ width: `${(metric.value / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Videos & Highlights - Premium */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Play className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-4xl font-black text-gray-900">Moments Forts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {player.highlights.map((highlight, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-white to-gray-50"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    {highlight.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                    {highlight.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Feedback - Premium */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-4xl font-black text-gray-900">Commentaire de l'Encadrement</h2>
          </div>

          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-12">
              <div className="flex gap-6">
                <div className="w-1 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Équipe d'Encadrement</div>
                      <div className="text-sm text-gray-600">Académie Farafina</div>
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed">{player.coachFeedback}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Intéressé par ce talent ?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Contactez l'académie pour obtenir plus d'informations sur {player.name} ou pour une recommandation
            officielle destinée aux clubs professionnels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg h-16 px-10 shadow-2xl hover:shadow-[#D4AF37]/50 transition-all"
            >
              <Mail className="h-6 w-6 mr-3" />
              Contacter l'Académie
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg h-16 px-10"
            >
              Demander une recommandation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
