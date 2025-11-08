"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Mail } from "lucide-react"

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
      image: "/young-african-football-player-defense.jpg",
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
      image: "/young-african-football-player-junior.jpg",
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
      image: "/young-african-female-football-player.jpg",
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

  if (!player) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/players"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Link>
        </div>
      </div>

      {/* Player Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Player Image */}
            <div className="w-full md:w-80 lg:w-96">
              <div className="relative aspect-[3/4] overflow-hidden border-2 border-[#D4AF37] rounded-lg">
                <Image
                  src={player.image || "/placeholder.svg"}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#D4AF37] text-white px-4 py-2 font-bold text-sm rounded">
                    {player.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                {player.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {player.position} — {player.category}
              </p>

              {/* Personal Information */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Informations personnelles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Âge</span>
                      <span className="font-bold text-foreground">{player.age} ans</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Taille</span>
                      <span className="font-bold text-foreground">{player.height}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Poids</span>
                      <span className="font-bold text-foreground">{player.weight}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Pied fort</span>
                      <span className="font-bold text-foreground">{player.preferredFoot}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Nationalité</span>
                      <span className="font-bold text-foreground">{player.nationality}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Section</span>
                      <span className="font-bold text-foreground">{player.section}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Statistiques sportives
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Match Stats */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">
                      {player.stats.matchesPlayed}
                    </div>
                    <div className="text-sm text-muted-foreground">Matchs joués</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">{player.stats.goals}</div>
                    <div className="text-sm text-muted-foreground">Buts</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">{player.stats.assists}</div>
                    <div className="text-sm text-muted-foreground">Passes décisives</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Speed */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Vitesse</span>
                      <span className="text-sm font-bold text-foreground">{player.stats.speed}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full"
                        style={{ width: `${(player.stats.speed / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Endurance */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Endurance</span>
                      <span className="text-sm font-bold text-foreground">{player.stats.endurance}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full"
                        style={{ width: `${(player.stats.endurance / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Intensity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Intensité</span>
                      <span className="text-sm font-bold text-foreground">{player.stats.intensity}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full"
                        style={{ width: `${(player.stats.intensity / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Technique */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Technique</span>
                      <span className="text-sm font-bold text-foreground">{player.stats.technique}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full"
                        style={{ width: `${(player.stats.technique / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Videos & Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Moments forts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {player.highlights.map((highlight, index) => (
              <Card key={index} className="border-border overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                    {highlight.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground text-sm">{highlight.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Feedback */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Commentaire de l'encadrement
          </h2>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex gap-4">
                <div className="w-1 bg-[#D4AF37] flex-shrink-0 rounded" />
                <p className="text-lg text-foreground leading-relaxed">{player.coachFeedback}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Intéressé par ce talent ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez l'académie pour obtenir plus d'informations sur {player.name} ou pour une recommandation
            officielle destinée aux clubs professionnels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold text-lg h-14 px-8"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contacter l'Académie
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold text-lg h-14 px-8"
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

