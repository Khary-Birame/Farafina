"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus, Users, TrendingUp, Award, Activity, Filter, Trash2 } from "lucide-react"
import { useAdminPlayers } from "@/lib/admin/hooks/use-admin-players"
import { PlayerFormDialog } from "@/components/admin/player-form-dialog"
import { PlayerDeleteDialog } from "@/components/admin/player-delete-dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function PlayersManagementPage() {
  const router = useRouter()
  const [filters, setFilters] = useState<{
    category?: string
    position?: string
    status?: string
    search?: string
  }>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  
  // États pour les modals
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [selectedPlayerName, setSelectedPlayerName] = useState<string>("")
  
  // Debounce de la recherche (300ms) pour un chargement plus rapide
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Mettre à jour les filtres quand la recherche debounced change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch.trim() || undefined,
    }))
  }, [debouncedSearch])
  
  // Mettre à jour la recherche (le debounce se charge de mettre à jour les filtres)
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  // Gérer les changements de filtres
  const handleFilterChange = (filterType: string) => {
    // Ouvrir un modal ou afficher des options selon le type de filtre
    if (filterType === "status") {
      // Toggle entre les statuts
      const currentStatus = filters.status
      const statuses = ["active", "inactive", "graduated", "transferred"]
      const currentIndex = statuses.indexOf(currentStatus || "")
      const nextIndex = (currentIndex + 1) % (statuses.length + 1)
      setFilters((prev) => ({
        ...prev,
        status: nextIndex === 0 ? undefined : statuses[nextIndex - 1],
      }))
    } else if (filterType === "category") {
      // Toggle entre les catégories
      const categories = ["U8", "U10", "U12", "U15", "U18", "Senior"]
      const currentCategory = filters.category
      const currentIndex = categories.indexOf(currentCategory || "")
      const nextIndex = (currentIndex + 1) % (categories.length + 1)
      setFilters((prev) => ({
        ...prev,
        category: nextIndex === 0 ? undefined : categories[nextIndex - 1],
      }))
    }
  }

  // Fonction pour exporter les données en CSV
  const handleExport = () => {
    try {
      // Préparer les données pour l'export
      const csvHeaders = ["Nom", "Âge", "Position", "Catégorie", "Pays", "Statut", "Présence", "Performance"]
      const csvRows = displayPlayers.map((player) => [
        player.nom || "",
        player.age?.toString() || "N/A",
        player.position || "N/A",
        player.categorie || "N/A",
        player.pays || "N/A",
        player.statut || "N/A",
        player.presence || "N/A",
        player.performance?.toString() || "N/A",
      ])

      // Créer le contenu CSV
      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n")

      // Créer un blob et télécharger
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `joueurs_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Export réussi", {
        description: "Le fichier CSV a été téléchargé avec succès.",
      })
    } catch (error: any) {
      console.error("Erreur lors de l'export:", error)
      toast.error("Erreur lors de l'export", {
        description: error.message || "Impossible d'exporter les données.",
      })
    }
  }

  const { players, loading, error, hasLoaded, refresh } = useAdminPlayers(filters)
  
  const displayPlayers = players

  // Calculer les statistiques avec useMemo pour optimiser (évite les recalculs inutiles)
  const stats = useMemo(() => {
    if (loading || displayPlayers.length === 0) {
      return {
        totalPlayers: 0,
        activePlayers: 0,
        inactivePlayers: 0,
        avgPresence: 0,
        avgPerformance: 0,
      }
    }

    const activePlayers = displayPlayers.filter(p => p.statut === 'Actif').length
    const inactivePlayers = displayPlayers.filter(p => p.statut !== 'Actif').length
    
    const avgPresence = displayPlayers.length > 0
      ? Math.round(
          displayPlayers.reduce((sum, p) => {
            if (p.presence === 'N/A') return sum
            const presence = parseInt(p.presence.replace('%', '').replace('N/A', '')) || 0
            return sum + presence
          }, 0) / displayPlayers.filter(p => p.presence !== 'N/A').length || 1
        )
      : 0

    const avgPerformance = displayPlayers.length > 0
      ? displayPlayers
          .filter(p => p.performance !== null)
          .reduce((sum, p) => sum + (p.performance || 0), 0) / displayPlayers.filter(p => p.performance !== null).length
      : 0

    return {
      totalPlayers: displayPlayers.length,
      activePlayers,
      inactivePlayers,
      avgPresence,
      avgPerformance: avgPerformance || 0,
    }
  }, [displayPlayers, loading])

  // Fonction pour gérer le succès des actions CRUD
  const handleSuccess = useCallback(() => {
    refresh()
  }, [refresh])

  // Ouvrir le formulaire de création
  const handleCreateClick = () => {
    setSelectedPlayerId(null)
    setFormDialogOpen(true)
  }

  // Ouvrir le formulaire d'édition
  const handleEditClick = (e: React.MouseEvent, player: typeof displayPlayers[0]) => {
    e.stopPropagation() // Empêcher le clic sur la ligne
    setSelectedPlayerId(player.id)
    setFormDialogOpen(true)
  }

  // Ouvrir le dialog de suppression
  const handleDeleteClick = (e: React.MouseEvent, player: typeof displayPlayers[0]) => {
    e.stopPropagation() // Empêcher le clic sur la ligne
    setSelectedPlayerId(player.id)
    setSelectedPlayerName(player.nom)
    setDeleteDialogOpen(true)
  }
  

  const columns = [
    {
      key: "nom",
      header: "Nom",
      render: (row: typeof displayPlayers[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white font-semibold text-sm shadow-md">
            {row.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <span className="font-semibold text-gray-900">{row.nom}</span>
        </div>
      ),
    },
    {
      key: "age",
      header: "Âge",
      render: (row: typeof displayPlayers[0]) => (
        <span className="text-gray-700 font-medium">{row.age || "N/A"}</span>
      ),
    },
    {
      key: "position",
      header: "Position",
      render: (row: typeof displayPlayers[0]) => (
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
          {row.position || "N/A"}
        </Badge>
      ),
    },
    {
      key: "categorie",
      header: "Catégorie",
      render: (row: typeof displayPlayers[0]) => (
        <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
          {row.categorie || "N/A"}
        </Badge>
      ),
    },
    {
      key: "pays",
      header: "Pays",
      render: (row: typeof displayPlayers[0]) => (
        <span className="text-gray-700">{row.pays || "N/A"}</span>
      ),
    },
    {
      key: "statut",
      header: "Statut",
      render: (row: typeof displayPlayers[0]) => (
        <Badge
          className={cn(
            "font-semibold",
            row.statut === "Actif"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
              : row.statut === "Inactif"
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
              : "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
          )}
        >
          {row.statut}
        </Badge>
      ),
    },
    {
      key: "presence",
      header: "Présence",
      render: (row: typeof displayPlayers[0]) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[100px]">
            {row.presence !== 'N/A' && (
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full"
                style={{ width: row.presence }}
              />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">{row.presence}</span>
        </div>
      ),
    },
    {
      key: "performance",
      header: "Performance",
      render: (row: typeof displayPlayers[0]) => (
        <div className="flex items-center gap-2">
          {row.performance ? (
            <>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[80px]">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full"
                  style={{ width: `${row.performance}%` }}
                />
              </div>
              <span className="text-sm font-bold text-[#D4AF37]">{row.performance}/100</span>
            </>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: typeof displayPlayers[0]) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Rediriger vers la page de détails du joueur (route publique)
              router.push(`/players/${row.id}`)
            }}
            className="text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] transition-all duration-200 shadow-sm hover:shadow-md"
            title="Voir les détails du joueur"
          >
            <Eye className="w-4 h-4 mr-2" />
            Voir
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(e, row)}
            className="text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(e, row)}
            className="text-red-600 hover:text-white hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      {/* Header avec gradient moderne */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#B8941F]/5 to-transparent rounded-2xl -z-10" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#4A4A4A] bg-clip-text text-transparent mb-3">
              Gestion des Joueurs
            </h1>
            <p className="text-[#737373] text-lg">Gérez tous les joueurs de l'académie</p>
          </div>
          <Button 
            onClick={handleCreateClick}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Joueur
          </Button>
        </div>
      </div>

      {/* Stats Cards avec animations et gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-white to-blue-50/50 border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              Total Joueurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {loading ? "..." : stats.totalPlayers}
            </div>
            <p className="text-xs text-[#737373] mt-1">Dans l'académie</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50/50 border-l-4 border-l-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {loading ? "..." : stats.activePlayers}
            </div>
            <p className="text-xs text-[#737373] mt-1">En activité</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50/50 border-l-4 border-l-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              Présence Moy.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {loading ? "..." : `${stats.avgPresence}%`}
            </div>
            <p className="text-xs text-[#737373] mt-1">Taux moyen</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#D4AF37]/10 border-l-4 border-l-[#D4AF37] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-[#D4AF37]/20 rounded-lg group-hover:bg-[#D4AF37]/30 transition-colors">
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>
              Performance Moy.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              {loading ? "..." : stats.avgPerformance.toFixed(1)}
            </div>
            <p className="text-xs text-[#737373] mt-1">Sur 100</p>
          </CardContent>
        </Card>
      </div>

      {/* Players Table */}
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-1">Liste des Joueurs</CardTitle>
              <CardDescription className="text-[#737373]">
                Recherchez, filtrez et gérez les joueurs
                {filters.status && ` • Statut: ${filters.status === 'active' ? 'Actif' : filters.status === 'inactive' ? 'Inactif' : filters.status === 'graduated' ? 'Diplômé' : 'Transféré'}`}
                {filters.category && ` • Catégorie: ${filters.category}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {(filters.status || filters.category) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ search: filters.search })}
                  className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]"
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#737373] text-lg font-medium">Chargement des joueurs...</p>
              </div>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-600 mb-4 font-medium">{error}</p>
              <p className="text-sm text-[#737373]">Vérifiez la console pour plus de détails</p>
            </div>
          ) : displayPlayers.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Aucun joueur trouvé</h3>
              <p className="text-[#737373] mb-6">Il n'y a pas encore de joueurs dans la base de données.</p>
              <Button 
                onClick={handleCreateClick}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter le premier joueur
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden">
              <DataTable
                data={displayPlayers}
                columns={columns}
                searchPlaceholder="Rechercher un joueur..."
                searchValue={searchQuery}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onRowClick={(row) => router.push(`/players/${row.id}`)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <PlayerFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        playerId={selectedPlayerId}
        onSuccess={handleSuccess}
      />

      <PlayerDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        playerId={selectedPlayerId}
        playerName={selectedPlayerName}
        onSuccess={handleSuccess}
      />
    </AdminLayout>
  )
}
