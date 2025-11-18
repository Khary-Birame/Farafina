"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus } from "lucide-react"
import { useAdminPlayers } from "@/lib/admin/hooks/use-admin-players"
import { useState, useEffect } from "react"

// Données de démonstration (fallback)
const defaultPlayers = [
  {
    id: "1",
    nom: "Amadou Diallo",
    age: 16,
    position: "Attaquant",
    categorie: "U16",
    pays: "Sénégal",
    statut: "Actif",
    presence: "95%",
    performance: 85,
  },
  {
    id: "2",
    nom: "Fatou Sarr",
    age: 15,
    position: "Milieu",
    categorie: "U15",
    pays: "Mali",
    statut: "Actif",
    presence: "88%",
    performance: 78,
  },
  {
    id: "3",
    nom: "Ibrahim Koné",
    age: 17,
    position: "Défenseur",
    categorie: "U18",
    pays: "Côte d'Ivoire",
    statut: "Inactif",
    presence: "72%",
    performance: 82,
  },
  {
    id: "4",
    nom: "Aissatou Ba",
    age: 16,
    position: "Gardien",
    categorie: "U16",
    pays: "Sénégal",
    statut: "Actif",
    presence: "92%",
    performance: 88,
  },
]

export default function PlayersManagementPage() {
  const [filters, setFilters] = useState<{
    category?: string
    position?: string
    status?: string
    search?: string
  }>({})
  
  const { players, loading } = useAdminPlayers(filters)
  
  // Utiliser les données Supabase si disponibles, sinon fallback
  const displayPlayers = players.length > 0 ? players : defaultPlayers
  
  // Calculer les statistiques
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
    : 92

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
