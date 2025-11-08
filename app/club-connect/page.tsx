"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputField, SelectField } from "@/components/ui/form-field"
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Video, 
  FileText,
  Shield,
  Globe,
  MessageSquare,
  Download,
  Eye
} from "lucide-react"
import { useState } from "react"

export default function ClubConnectPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    age: "",
    position: "",
    performance: "",
  })

  // Données de démonstration
  const players = [
    {
      id: 1,
      name: "Amadou Diallo",
      age: 17,
      position: "Attaquant",
      country: "Sénégal",
      performance: 92,
      stats: { goals: 24, assists: 12, matches: 18 },
      video: true,
      profile: true,
    },
    {
      id: 2,
      name: "Fatou Sarr",
      age: 16,
      position: "Milieu",
      country: "Mali",
      performance: 88,
      stats: { goals: 8, assists: 18, matches: 20 },
      video: true,
      profile: true,
    },
    {
      id: 3,
      name: "Ibrahim Koné",
      age: 18,
      position: "Défenseur",
      country: "Côte d'Ivoire",
      performance: 85,
      stats: { goals: 2, assists: 5, matches: 22 },
      video: false,
      profile: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#D4AF37]/30">
                <Shield className="w-4 h-4" />
                <span>Espace Professionnel Réservé</span>
              </div>
              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
                Club Connect — Découvrez les <span className="text-[#D4AF37]">Talents de Demain</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty max-w-2xl mx-auto">
                Accédez à la base de données exclusive de talents africains. Fiches détaillées, statistiques, vidéos et outils de recrutement pour les clubs professionnels.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  <span>500+ Joueurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#D4AF37]" />
                  <span>Vidéos HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#D4AF37]" />
                  <span>15+ Pays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  <span>Données Sécurisées</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-l-4 border-l-[#D4AF37]">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <CardTitle>Fiches Joueurs Complètes</CardTitle>
                  <CardDescription>
                    Statistiques détaillées, performances, historique académique et évaluations des coachs.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-[#D4AF37]">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <CardTitle>Bibliothèque Vidéo HD</CardTitle>
                  <CardDescription>
                    Accédez aux meilleurs moments, compilations de compétences et matchs complets en haute définition.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-[#E8C966]">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E8C966]/10 rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-[#E8C966]" />
                  </div>
                  <CardTitle>Communication Directe</CardTitle>
                  <CardDescription>
                    Chat sécurisé avec traduction automatique, NDA digital et suivi des échanges.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Card className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <InputField
                      label="Rechercher un joueur"
                      name="search"
                      type="text"
                      placeholder="Nom, pays, position..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <SelectField
                    label="Âge"
                    name="age"
                    placeholder="Tous les âges"
                    value={selectedFilters.age}
                    onValueChange={(value) => setSelectedFilters({ ...selectedFilters, age: value })}
                    options={[
                      { value: "", label: "Tous les âges" },
                      { value: "12-14", label: "12-14 ans" },
                      { value: "15-16", label: "15-16 ans" },
                      { value: "17-18", label: "17-18 ans" },
                      { value: "19+", label: "19+ ans" },
                    ]}
                  />
                  <SelectField
                    label="Position"
                    name="position"
                    placeholder="Toutes les positions"
                    value={selectedFilters.position}
                    onValueChange={(value) => setSelectedFilters({ ...selectedFilters, position: value })}
                    options={[
                      { value: "", label: "Toutes les positions" },
                      { value: "goalkeeper", label: "Gardien" },
                      { value: "defender", label: "Défenseur" },
                      { value: "midfielder", label: "Milieu" },
                      { value: "forward", label: "Attaquant" },
                    ]}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {players.length} joueur{players.length > 1 ? "s" : ""} trouvé{players.length > 1 ? "s" : ""}
                  </p>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres Avancés
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {players.map((player) => (
                <Card key={player.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-xl mb-1">{player.name}</CardTitle>
                        <CardDescription>
                          {player.age} ans • {player.position} • {player.country}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#D4AF37]">{player.performance}%</div>
                        <div className="text-xs text-muted-foreground">Performance</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-foreground">{player.stats.goals}</div>
                          <div className="text-xs text-muted-foreground">Buts</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">{player.stats.assists}</div>
                          <div className="text-xs text-muted-foreground">Passes</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">{player.stats.matches}</div>
                          <div className="text-xs text-muted-foreground">Matchs</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Profil
                        </Button>
                        {player.video && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Vidéo
                          </Button>
                        )}
                        <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4">
                Rejoignez Club Connect
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Accédez à la base de données exclusive de talents et connectez-vous avec les futurs champions africains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-[#D4AF37] hover:bg-gray-100">
                  Demander un Accès
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  En Savoir Plus
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

