"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Filter, Trophy, Users, TrendingUp, Sparkles, Play, Star } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

// Mock player data - in a real app, this would come from an API/database
const playersData = [
  {
    id: 1,
    name: "Amadou Diallo",
    age: 17,
    position: "Attaquant",
    category: "U18",
    nationality: "Sénégal",
    performance: 8.5,
    image: "/young-african-football-player-striker.jpg",
  },
  {
    id: 2,
    name: "Kwame Mensah",
    age: 16,
    position: "Milieu",
    category: "U18",
    nationality: "Ghana",
    performance: 8.2,
    image: "/young-african-football-player-midfielder.jpg",
  },
  {
    id: 3,
    name: "Ibrahim Traoré",
    age: 15,
    position: "Défenseur",
    category: "U15",
    nationality: "Côte d'Ivoire",
    performance: 7.8,
    image: "/young-african-football-player-defender.jpg",
  },
  {
    id: 4,
    name: "Mohamed Keita",
    age: 14,
    position: "Gardien",
    category: "U15",
    nationality: "Mali",
    performance: 8.0,
    image: "/young-african-football-goalkeeper.jpg",
  },
  {
    id: 5,
    name: "Youssouf Cissé",
    age: 17,
    position: "Attaquant",
    category: "U18",
    nationality: "Burkina Faso",
    performance: 8.7,
    image: "/young-african-football-player-forward.jpg",
  },
  {
    id: 6,
    name: "Samuel Okonkwo",
    age: 13,
    position: "Milieu",
    category: "U12",
    nationality: "Nigeria",
    performance: 7.5,
    image: "/young-african-football-player-youth.jpg",
  },
  {
    id: 7,
    name: "Abdoulaye Sow",
    age: 16,
    position: "Défenseur",
    category: "U18",
    nationality: "Guinée",
    performance: 7.9,
    image: "/young-african-football-player-defense.jpg",
  },
  {
    id: 8,
    name: "Kofi Asante",
    age: 15,
    position: "Attaquant",
    category: "U15",
    nationality: "Ghana",
    performance: 8.3,
    image: "/young-african-football-player-striker-action.jpg",
  },
  {
    id: 9,
    name: "Mamadou Ba",
    age: 12,
    position: "Milieu",
    category: "U12",
    nationality: "Sénégal",
    performance: 7.2,
    image: "/young-african-football-player-junior.jpg",
  },
  {
    id: 10,
    name: "Cheikh Ndiaye",
    age: 17,
    position: "Défenseur",
    category: "U18",
    nationality: "Sénégal",
    performance: 8.1,
    image: "/young-african-football-player-defender-action.jpg",
  },
  {
    id: 11,
    name: "Fatou Sall",
    age: 16,
    position: "Attaquant",
    category: "U18",
    nationality: "Sénégal",
    performance: 8.6,
    image: "/young-african-female-football-player.jpg",
  },
  {
    id: 12,
    name: "Aisha Diop",
    age: 15,
    position: "Milieu",
    category: "U15",
    nationality: "Mali",
    performance: 8.0,
    image: "/young-african-female-football-midfielder.jpg",
  },
]

export default function PlayersPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [nationalityFilter, setNationalityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  const playersPerPage = 9

  // Scroll detection for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get unique values for filters
  const categories = ["all", ...Array.from(new Set(playersData.map((p) => p.category)))]
  const positions = ["all", ...Array.from(new Set(playersData.map((p) => p.position)))]
  const nationalities = ["all", ...Array.from(new Set(playersData.map((p) => p.nationality)))]

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    const filtered = playersData.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || player.category === categoryFilter
      const matchesPosition = positionFilter === "all" || player.position === positionFilter
      const matchesNationality = nationalityFilter === "all" || player.nationality === nationalityFilter

      return matchesSearch && matchesCategory && matchesPosition && matchesNationality
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "age") return a.age - b.age
      if (sortBy === "performance") return b.performance - a.performance
      return 0
    })

    return filtered
  }, [searchQuery, categoryFilter, positionFilter, nationalityFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage)
  const startIndex = (currentPage - 1) * playersPerPage
  const paginatedPlayers = filteredPlayers.slice(startIndex, startIndex + playersPerPage)

  // Stats calculation
  const topPerformers = [...filteredPlayers].sort((a, b) => b.performance - a.performance).slice(0, 3)
  const avgPerformance = filteredPlayers.length > 0
    ? (filteredPlayers.reduce((sum, p) => sum + p.performance, 0) / filteredPlayers.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Premium Design */}
      <section className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-16 xs:pb-20 sm:pb-24 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D1B0E] to-[#1A1A1A]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          {/* Animated orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B8941F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">Académie d'Excellence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 xs:mb-5 sm:mb-6 leading-tight">
            <span className="block">Nos</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent animate-gradient">
              Talents
            </span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/80 mb-8 xs:mb-10 sm:mb-12 max-w-3xl leading-relaxed px-2">
            {t("players.hero.description") || "Découvrez les étoiles montantes de l'académie Farafina. Des talents prometteurs qui façonnent l'avenir du football africain."}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-black text-[#D4AF37] mb-2">{filteredPlayers.length}</div>
              <div className="text-sm text-white/70 font-medium">Joueurs</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-black text-[#D4AF37] mb-2">{avgPerformance}</div>
              <div className="text-sm text-white/70 font-medium">Performance Moy.</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-black text-[#D4AF37] mb-2">{categories.length - 1}</div>
              <div className="text-sm text-white/70 font-medium">Catégories</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-black text-[#D4AF37] mb-2">{nationalities.length - 1}</div>
              <div className="text-sm text-white/70 font-medium">Nationalités</div>
            </div>
          </div>

          {/* Search Bar - Premium */}
          <div className="max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <Search className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder={t("players.hero.searchPlaceholder") || "Rechercher un joueur..."}
                    className="flex-1 bg-transparent border-0 text-white placeholder:text-white/50 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sorting - Sticky Premium */}
      <section className={cn(
        "sticky top-0 z-40 py-6 px-4 sm:px-6 lg:px-8 border-b transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200" 
          : "bg-white/80 backdrop-blur-sm border-gray-100"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres:
              </span>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-[#D4AF37] transition-colors">
                  <SelectValue placeholder={t("players.filters.category.placeholder") || "Catégorie"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("players.filters.category.all") || "Toutes"}</SelectItem>
                  {categories
                    .filter((c) => c !== "all")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-[#D4AF37] transition-colors">
                  <SelectValue placeholder={t("players.filters.position.placeholder") || "Position"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("players.filters.position.all") || "Toutes"}</SelectItem>
                  {positions
                    .filter((p) => p !== "all")
                    .map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-[#D4AF37] transition-colors">
                  <SelectValue placeholder={t("players.filters.nationality.placeholder") || "Nationalité"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("players.filters.nationality.all") || "Toutes"}</SelectItem>
                  {nationalities
                    .filter((n) => n !== "all")
                    .map((nat) => (
                      <SelectItem key={nat} value={nat}>
                        {nat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {/* Sorting */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">{t("players.sort.label") || "Trier par:"}</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-white border-gray-200 hover:border-[#D4AF37] transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{t("players.sort.name") || "Nom"}</SelectItem>
                  <SelectItem value="age">{t("players.sort.age") || "Âge"}</SelectItem>
                  <SelectItem value="performance">{t("players.sort.performance") || "Performance"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 font-medium">
            {filteredPlayers.length} {filteredPlayers.length !== 1 ? t("players.results.playersFound") || "joueurs trouvés" : t("players.results.playerFound") || "joueur trouvé"}
          </div>
        </div>
      </section>

      {/* Top Performers Section */}
      {topPerformers.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-gray-900">Meilleurs Performances</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPerformers.map((player, index) => (
                <Card key={player.id} className="group relative overflow-hidden border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 fill-white" />
                      #{index + 1}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/40 transition-all">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{player.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{player.position} • {player.category}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full transition-all duration-500"
                              style={{ width: `${(player.performance / 10) * 100}%` }}
                            />
                          </div>
                          <span className="font-bold text-[#D4AF37] text-sm">{player.performance}/10</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Players Grid - Premium Cards */}
      <section className="py-12 xs:py-14 sm:py-16 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {paginatedPlayers.length === 0 ? (
            <div className="text-center py-12 xs:py-16 sm:py-20">
              <div className="w-20 h-20 xs:w-24 xs:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
                <Users className="w-10 h-10 xs:w-12 xs:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">Aucun joueur trouvé</h3>
              <p className="text-sm xs:text-base text-gray-600 px-4">{t("players.noResults") || "Essayez de modifier vos filtres de recherche"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
              {paginatedPlayers.map((player, index) => (
                <Card
                  key={player.id}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#B8941F]/0 group-hover:from-[#D4AF37]/5 group-hover:via-[#D4AF37]/10 group-hover:to-[#B8941F]/5 transition-all duration-500 z-10" />
                  
                  {/* Image Container */}
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={player.image || "/placeholder.svg"}
                      alt={player.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-[#D4AF37] text-white font-bold shadow-lg">
                        {player.category}
                      </Badge>
                    </div>

                    {/* Performance Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                        <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="font-bold">{player.performance}/10</span>
                      </div>
                    </div>

                    {/* Player Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-black text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-3">{player.nationality}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                          {player.position}
                        </Badge>
                        <span className="text-white/60 text-sm">{player.age} ans</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Performance Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Performance</span>
                          <span className="text-sm font-bold text-[#D4AF37]">{player.performance}/10</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full transition-all duration-700 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50"
                            style={{ width: `${(player.performance / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <Link href={`/players/${player.id}`} className="flex items-center justify-center gap-2">
                          <span>Voir le profil</span>
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination - Premium */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-2 border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("players.pagination.previous") || "Précédent"}
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "min-w-[44px] transition-all duration-300",
                      currentPage === page
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-lg hover:shadow-xl"
                        : "border-2 border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                    )}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-2 border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {t("players.pagination.next") || "Suivant"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
