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
  Cell,
} from "recharts"
import { useAdminAcademic } from "@/lib/admin/hooks/use-admin-academic"

// Données par défaut pour la progression (uniquement en cas d'erreur)
const progressionData = [
  { month: "Jan", moyenne: 72 },
  { month: "Fév", moyenne: 75 },
  { month: "Mar", moyenne: 78 },
  { month: "Avr", moyenne: 80 },
  { month: "Mai", moyenne: 82 },
  { month: "Juin", moyenne: 85 },
]

export default function AcademicManagementPage() {
  const { students, academicData, academicHistory, loading, error } = useAdminAcademic()
  
  // Calculer les statistiques depuis les données Supabase
  const averageGrade = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.moyenne, 0) / students.length)
    : 0
  const needsImprovement = students.filter(s => s.statut === 'À améliorer').length
  const excellentResults = students.filter(s => s.statut === 'Excellent').length
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
  ]

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Gestion Académique</h1>
        <p className="text-[#737373]">Suivez les performances académiques des étudiants</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Moyenne Générale"
          value={loading ? "..." : `${averageGrade}%`}
          change={averageGrade > 0 ? { value: "+5%", type: "increase" } : undefined}
          icon={GraduationCap}
          description="Performance académique"
        />
        <KPICard
          title="À Améliorer"
          value={loading ? "..." : needsImprovement.toString()}
          icon={AlertTriangle}
          iconColor="text-[#E8C966]"
          borderColor="border-l-[#E8C966]"
          description="Étudiants nécessitant un suivi"
        />
        <KPICard
          title="Excellents Résultats"
          value={loading ? "..." : excellentResults.toString()}
          icon={TrendingUp}
          iconColor="text-[#D4AF37]"
          borderColor="border-l-[#D4AF37]"
          description="Moyenne > 85%"
        />
        <KPICard
          title="Cours Dispensés"
          value={loading ? "..." : academicData.length.toString()}
          icon={BookOpen}
          iconColor="text-[#737373]"
          borderColor="border-l-[#737373]"
          description="Matières actives"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Moyennes par Matière</CardTitle>
            <CardDescription className="text-[#737373]">Performance par discipline</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : academicData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée académique disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={academicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="subject" stroke="#737373" tick={{ fill: "#737373" }} />
                <YAxis stroke="#737373" tick={{ fill: "#737373" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar 
                  dataKey="moyenne" 
                  radius={[8, 8, 0, 0]}
                >
                  {academicData.map((entry, index) => {
                    const colors = ["#D4AF37", "#E8C966", "#B8941F", "#F59E0B", "#10B981"];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Évolution de la Moyenne</CardTitle>
            <CardDescription className="text-[#737373]">Progression sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : academicHistory && academicHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={academicHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#737373" tick={{ fill: "#737373" }} />
                  <YAxis stroke="#737373" tick={{ fill: "#737373" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moyenne"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    dot={{ fill: "#D4AF37", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée d'historique disponible</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Liste des Étudiants</CardTitle>
          <CardDescription className="text-[#737373]">Performances académiques détaillées</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-[#737373]">Chargement des étudiants...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600 mb-2">Erreur: {error}</p>
            </div>
          ) : students.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#737373] mb-4">Aucun étudiant avec données académiques trouvé</p>
            </div>
          ) : (
            <DataTable
              data={students}
              columns={columns}
              searchPlaceholder="Rechercher un étudiant..."
              onExport={() => console.log("Export academic")}
            />
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

