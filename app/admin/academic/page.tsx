"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { KPICard } from "@/components/admin/kpi-card"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, TrendingUp, AlertTriangle, BookOpen } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Données de démonstration
const students = [
  {
    id: 1,
    nom: "Amadou Diallo",
    categorie: "U16",
    moyenne: 78,
    statut: "Satisfaisant",
    progression: "+5%",
  },
  {
    id: 2,
    nom: "Fatou Sarr",
    categorie: "U15",
    moyenne: 85,
    statut: "Excellent",
    progression: "+8%",
  },
  {
    id: 3,
    nom: "Ibrahim Koné",
    categorie: "U18",
    moyenne: 65,
    statut: "À améliorer",
    progression: "-3%",
  },
  {
    id: 4,
    nom: "Aissatou Ba",
    categorie: "U16",
    moyenne: 92,
    statut: "Excellent",
    progression: "+12%",
  },
]

const academicData = [
  { subject: "Math", moyenne: 78 },
  { subject: "Français", moyenne: 82 },
  { subject: "Anglais", moyenne: 75 },
  { subject: "Sciences", moyenne: 80 },
  { subject: "Histoire", moyenne: 77 },
]

const progressionData = [
  { month: "Jan", moyenne: 72 },
  { month: "Fév", moyenne: 75 },
  { month: "Mar", moyenne: 78 },
  { month: "Avr", moyenne: 80 },
  { month: "Mai", moyenne: 82 },
  { month: "Juin", moyenne: 85 },
]

export default function AcademicManagementPage() {
  const columns = [
    {
      key: "nom",
      header: "Étudiant",
    },
    {
      key: "categorie",
      header: "Catégorie",
    },
    {
      key: "moyenne",
      header: "Moyenne",
      render: (row: typeof students[0]) => (
        <span className="font-semibold text-[#1A1A1A]">{row.moyenne}%</span>
      ),
    },
    {
      key: "statut",
      header: "Statut",
      render: (row: typeof students[0]) => (
        <Badge
          className={
            row.statut === "Excellent"
              ? "bg-[#D4AF37] text-white"
              : row.statut === "Satisfaisant"
              ? "bg-[#E8C966] text-white"
              : "bg-[#C0C0C0] text-white"
          }
        >
          {row.statut}
        </Badge>
      ),
    },
    {
      key: "progression",
      header: "Progression",
      render: (row: typeof students[0]) => (
        <span
          className={
            row.progression.startsWith("+")
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {row.progression}
        </span>
      ),
    },
  ]

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Gestion Académique</h1>
        <p className="text-[#C0C0C0]">Suivez les performances académiques des étudiants</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Moyenne Générale"
          value="78%"
          change={{ value: "+5%", type: "increase" }}
          icon={GraduationCap}
          description="Performance académique"
        />
        <KPICard
          title="À Améliorer"
          value="12"
          icon={AlertTriangle}
          iconColor="text-[#E8C966]"
          borderColor="border-l-[#E8C966]"
          description="Étudiants nécessitant un suivi"
        />
        <KPICard
          title="Excellents Résultats"
          value="45"
          icon={TrendingUp}
          iconColor="text-[#D4AF37]"
          borderColor="border-l-[#D4AF37]"
          description="Moyenne > 85%"
        />
        <KPICard
          title="Cours Dispensés"
          value="18"
          icon={BookOpen}
          iconColor="text-[#C0C0C0]"
          borderColor="border-l-[#C0C0C0]"
          description="Matières actives"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Moyennes par Matière</CardTitle>
            <CardDescription>Performance par discipline</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={academicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="subject" stroke="#1A1A1A" />
                <YAxis stroke="#1A1A1A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="moyenne" fill="#D4AF37" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Évolution de la Moyenne</CardTitle>
            <CardDescription>Progression sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="month" stroke="#1A1A1A" />
                <YAxis stroke="#1A1A1A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="moyenne"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{ fill: "#D4AF37", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A1A1A]">Liste des Étudiants</CardTitle>
          <CardDescription>Performances académiques détaillées</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={students}
            columns={columns}
            searchPlaceholder="Rechercher un étudiant..."
            onExport={() => console.log("Export academic")}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

