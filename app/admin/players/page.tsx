"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus, Users, TrendingUp, Award, Activity, Filter } from "lucide-react"
import { useAdminPlayers } from "@/lib/admin/hooks/use-admin-players"
import { cn } from "@/lib/utils"

export default function PlayersManagementPage() {
  const router = useRouter()
  const [filters, setFilters] = useState<{
    category?: string
    position?: string
    status?: string
    search?: string
  }>({})
  
  const { players, loading, error, hasLoaded } = useAdminPlayers(filters)
  
  const displayPlayers = players
  
  // Calculer les statistiques depuis les données Supabase uniquement
  const totalPlayers = displayPlayers.length
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
            onClick={() => router.push(`/players/${row.id}`)}
            className="text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Eye className="w-4 h-4 mr-2" />
            Voir
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <Edit className="w-4 h-4" />
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
          <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all">
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
              {loading ? "..." : totalPlayers}
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
              {loading ? "..." : activePlayers}
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
              {loading ? "..." : `${avgPresence}%`}
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
              {loading ? "..." : avgPerformance.toFixed(1)}
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
              <CardDescription className="text-[#737373]">Recherchez, filtrez et gérez les joueurs</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
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
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all">
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
                onExport={() => console.log("Export")}
                onRowClick={(row) => router.push(`/players/${row.id}`)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
