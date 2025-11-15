"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Plus } from "lucide-react"

// Données de démonstration
const players = [
  {
    id: 1,
    nom: "Amadou Diallo",
    age: 16,
    position: "Attaquant",
    categorie: "U16",
    pays: "Sénégal",
    statut: "Actif",
    presence: "95%",
    performance: "85/100",
  },
  {
    id: 2,
    nom: "Fatou Sarr",
    age: 15,
    position: "Milieu",
    categorie: "U15",
    pays: "Mali",
    statut: "Actif",
    presence: "88%",
    performance: "78/100",
  },
  {
    id: 3,
    nom: "Ibrahim Koné",
    age: 17,
    position: "Défenseur",
    categorie: "U18",
    pays: "Côte d'Ivoire",
    statut: "Blessé",
    presence: "72%",
    performance: "82/100",
  },
  {
    id: 4,
    nom: "Aissatou Ba",
    age: 16,
    position: "Gardien",
    categorie: "U16",
    pays: "Sénégal",
    statut: "Actif",
    presence: "92%",
    performance: "88/100",
  },
]

export default function PlayersManagementPage() {
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
      render: (row: typeof players[0]) => (
        <Badge
          className={
            row.statut === "Actif"
              ? "bg-green-500 text-white"
              : row.statut === "Blessé"
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
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: typeof players[0]) => (
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
          <p className="text-[#C0C0C0]">Gérez tous les joueurs de l'académie</p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Joueur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#1A1A1A] mb-1">247</div>
            <p className="text-sm text-[#C0C0C0]">Total Joueurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#D4AF37] mb-1">215</div>
            <p className="text-sm text-[#C0C0C0]">Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#E8C966] mb-1">8</div>
            <p className="text-sm text-[#C0C0C0]">Blessés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#D4AF37] mb-1">92%</div>
            <p className="text-sm text-[#C0C0C0]">Taux de Présence Moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A1A1A]">Liste des Joueurs</CardTitle>
          <CardDescription>Recherchez, filtrez et gérez les joueurs</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={players}
            columns={columns}
            searchPlaceholder="Rechercher un joueur..."
            onExport={() => console.log("Export")}
            onRowClick={(row) => console.log("View player", row)}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

