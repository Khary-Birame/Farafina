"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Video,
  FileText,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { use } from "react"
import { ProtectedPage } from "@/components/auth/protected-page"

// Données de démonstration
const playerData = {
  id: 1,
  name: "Amadou Diallo",
  age: 17,
  position: "Attaquant",
  country: "Sénégal",
  city: "Dakar",
  photo: "/player-1.jpg",
  performance: 92,
  stats: {
    goals: 24,
    assists: 12,
    matches: 18,
    minutes: 1620,
    yellowCards: 2,
    redCards: 0,
  },
  academic: {
    level: "Terminale",
    average: 15.5,
    attendance: 95,
  },
  videos: [
    { id: 1, title: "Compilation de buts", duration: "5:32", views: 1250 },
    { id: 2, title: "Match complet vs ASEC", duration: "90:00", views: 890 },
  ],
  evaluations: [
    { coach: "Mamadou Dieng", rating: 9, comment: "Excellent potentiel" },
    { coach: "Ibrahim Koné", rating: 8.5, comment: "Très prometteur" },
  ],
  certificates: [
    { name: "Certificat d'Excellence", date: "2024-12", issuer: "FFA" },
    { name: "Meilleur Buteur", date: "2024-11", issuer: "Ligue Régionale" },
  ],
}

export default function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-24">
          <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-[#D4AF37]">
                    <AvatarImage src={playerData.photo} />
                    <AvatarFallback className="text-2xl">
                      {playerData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground mb-2">
                      {playerData.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{playerData.age} ans</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{playerData.city}, {playerData.country}</span>
                      </div>
                      <Badge className="bg-[#D4AF37] text-white">
                        {playerData.position}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                  <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </div>

              {/* Performance Score */}
              <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/15 border-[#D4AF37]/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Score de Performance</div>
                      <div className="text-4xl font-bold text-[#D4AF37]">{playerData.performance}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Potentiel</div>
                      <div className="text-2xl font-bold text-foreground">Excellent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="stats" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="stats">Statistiques</TabsTrigger>
                <TabsTrigger value="academic">Académique</TabsTrigger>
                <TabsTrigger value="videos">Vidéos</TabsTrigger>
                <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
                <TabsTrigger value="certificates">Certificats</TabsTrigger>
              </TabsList>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#D4AF37]" />
                        Buts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{playerData.stats.goals}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round((playerData.stats.goals / playerData.stats.matches) * 10) / 10} par match
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                        Passes Décisives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{playerData.stats.assists}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round((playerData.stats.assists / playerData.stats.matches) * 10) / 10} par match
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#E8C966]" />
                        Matchs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{playerData.stats.matches}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {playerData.stats.minutes} minutes jouées
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Graphique de progression */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progression des Performances</CardTitle>
                    <CardDescription>
                      Évolution sur les 6 derniers mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Graphique de progression à implémenter
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Academic Tab */}
              <TabsContent value="academic" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Niveau Académique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{playerData.academic.level}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Moyenne Générale</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{playerData.academic.average}/20</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Assiduité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{playerData.academic.attendance}%</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {playerData.videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative h-48 bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription>
                          {video.views} vues
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Regarder
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Evaluations Tab */}
              <TabsContent value="evaluations" className="space-y-6">
                {playerData.evaluations.map((eval_, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{eval_.coach}</CardTitle>
                        <Badge className="bg-[#D4AF37] text-white">
                          {eval_.rating}/10
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{eval_.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {playerData.certificates.map((cert, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#D4AF37]" />
                          {cert.name}
                        </CardTitle>
                        <CardDescription>
                          Émis par {cert.issuer} • {cert.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedPage>
  )
}

