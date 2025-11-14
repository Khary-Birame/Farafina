"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

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
  const playersPerPage = 9

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A]/90">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("players.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t("players.hero.description")}
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("players.hero.searchPlaceholder")}
                  className="pl-12 h-14 text-lg bg-white border-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Sorting */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
                <span className="text-sm font-medium text-foreground">{t("players.filters.label")}:</span>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t("players.filters.category.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("players.filters.category.all")}</SelectItem>
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
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t("players.filters.position.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("players.filters.position.all")}</SelectItem>
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
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t("players.filters.nationality.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("players.filters.nationality.all")}</SelectItem>
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
                <span className="text-sm font-medium text-foreground">{t("players.sort.label")}:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">{t("players.sort.name")}</SelectItem>
                    <SelectItem value="age">{t("players.sort.age")}</SelectItem>
                    <SelectItem value="performance">{t("players.sort.performance")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredPlayers.length} {filteredPlayers.length !== 1 ? t("players.results.playersFound") : t("players.results.playerFound")}
            </div>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {paginatedPlayers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">{t("players.noResults")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPlayers.map((player) => (
                  <Card
                    key={player.id}
                    className="group hover:shadow-xl transition-shadow duration-300 border-border overflow-hidden"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {player.category}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">{player.name}</h3>
                        <p className="text-white/80 text-sm">{player.nationality}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{t("players.card.position")}</p>
                          <p className="font-semibold text-foreground">{player.position}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{t("players.card.age")}</p>
                          <p className="font-semibold text-foreground">{player.age} {t("players.card.years")}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">{t("players.card.performance")}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                                style={{ width: `${(player.performance / 10) * 100}%` }}
                              />
                            </div>
                            <span className="font-bold text-[#D4AF37]">{player.performance}/10</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold"
                      >
                        <Link href={`/players/${player.id}`}>{t("players.card.viewDetails")}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  {t("players.pagination.previous")}
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-[#D4AF37] text-white hover:bg-[#B8941F]"
                          : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                >
                  {t("players.pagination.next")}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

