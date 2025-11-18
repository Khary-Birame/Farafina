"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus } from "lucide-react"
import { useAdminPlayers } from "@/lib/admin/hooks/use-admin-players"

export default function PlayersManagementPage() {
  const [filters, setFilters] = useState<{
    category?: string
    position?: string
    status?: string
    search?: string
  }>({})
  
  const { players, loading, error, hasLoaded } = useAdminPlayers(filters)
  
  // Utiliser TOUJOURS les données Supabase, même si elles sont vides
  // Ne jamais utiliser de mockups - les données Supabase sont la source de vérité
  const displayPlayers = players
  
  // Calculer les statistiques depuis les données Supabase uniquement
  const totalPlayers = displayPlayers.length
  const activePlayers = displayPlayers.filter(p => p.statut === 'Actif').length
  const inactivePlayers = displayPlayers.filter(p => p.statut !== 'Actif').length
  const avgPresence = displayPlayers.length > 0
    ? Math.round(
        displayPlayers.reduce((sum, p) => {
          const presence = parseInt(p.presence.replace('%', '')) || 0
          return sum + presence
        }, 0) / displayPlayers.length
      )
    : 0

  const columns = [
    {
      key: "nom",
      header: "Nom",
    },
    {
      key: "age",
      header: "Âge",
    },
    {
      key: "position",
      header: "Position",
    },
    {
      key: "categorie",
      header: "Catégorie",
    },
    {
      key: "pays",
      header: "Pays",
    },
    {
      key: "statut",
      header: "Statut",
      render: (row: typeof displayPlayers[0]) => (
        <Badge
          className={
            row.statut === "Actif"
              ? "bg-green-500 text-white"
              : row.statut === "Inactif"
              ? "bg-red-500 text-white"
              : "bg-yellow-500 text-white"
          }
        >
          {row.statut}
        </Badge>
      ),
    },
    {
      key: "presence",
      header: "Présence",
    },
    {
      key: "performance",
      header: "Performance",
      render: (row: typeof displayPlayers[0]) => (
        <span>{row.performance ? `${row.performance}/100` : 'N/A'}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: typeof displayPlayers[0]) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="w-4 h-4 text-[#1A1A1A]" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="w-4 h-4 text-[#D4AF37]" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Gestion des Joueurs</h1>
          <p className="text-[#737373]">Gérez tous les joueurs de l'académie</p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Joueur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#1A1A1A] mb-1">
              {loading ? "..." : totalPlayers}
            </div>
            <p className="text-sm text-[#737373]">Total Joueurs</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#D4AF37] mb-1">
              {loading ? "..." : activePlayers}
            </div>
            <p className="text-sm text-[#737373]">Actifs</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#E8C966] mb-1">
              {loading ? "..." : inactivePlayers}
            </div>
            <p className="text-sm text-[#737373]">Inactifs</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#D4AF37] mb-1">
              {loading ? "..." : `${avgPresence}%`}
            </div>
            <p className="text-sm text-[#737373]">Taux de Présence Moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Players Table */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Liste des Joueurs</CardTitle>
          <CardDescription className="text-[#737373]">Recherchez, filtrez et gérez les joueurs</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-[#737373]">Chargement des joueurs...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600 mb-2">Erreur: {error}</p>
              <p className="text-sm text-[#737373]">Vérifiez la console pour plus de détails</p>
            </div>
          ) : displayPlayers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#737373] mb-4">Aucun joueur trouvé dans la base de données</p>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter le premier joueur
              </Button>
            </div>
          ) : (
            <DataTable
              data={displayPlayers}
              columns={columns}
              searchPlaceholder="Rechercher un joueur..."
              onExport={() => console.log("Export")}
              onRowClick={(row) => console.log("View player", row)}
            />
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
