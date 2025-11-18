"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { KPICard } from "@/components/admin/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Activity,
  Calendar,
  GraduationCap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAdminDashboard } from "@/lib/admin/hooks/use-admin-dashboard"
import { getAttendanceStats, getAcademicPerformance, getFinancialData } from "@/lib/admin/services/dashboard-stats"
import { useEffect, useState } from "react"

// Données de démonstration (fallback)
const defaultAttendanceData = [
  { month: "Jan", taux: 92 },
  { month: "Fév", taux: 88 },
  { month: "Mar", taux: 95 },
  { month: "Avr", taux: 90 },
  { month: "Mai", taux: 93 },
  { month: "Juin", taux: 96 },
]

const defaultAcademicData = [
  { subject: "Math", moyenne: 78 },
  { subject: "Français", moyenne: 82 },
  { subject: "Anglais", moyenne: 75 },
  { subject: "Sciences", moyenne: 80 },
  { subject: "Histoire", moyenne: 77 },
]

const defaultFinancialData = [
  { month: "Jan", revenus: 45000, depenses: 38000 },
  { month: "Fév", revenus: 52000, depenses: 41000 },
  { month: "Mar", revenus: 48000, depenses: 39000 },
  { month: "Avr", revenus: 61000, depenses: 42000 },
  { month: "Mai", revenus: 55000, depenses: 40000 },
  { month: "Juin", revenus: 68000, depenses: 44000 },
]

const injuryDistribution = [
  { name: "Blessures légères", value: 65, color: "#D4AF37" },
  { name: "Blessures modérées", value: 25, color: "#E8C966" },
  { name: "Blessures graves", value: 10, color: "#FF6B6B" },
]

export default function AdminDashboardPage() {
  const { kpis, loading: kpisLoading } = useAdminDashboard()
  const [attendanceData, setAttendanceData] = useState(defaultAttendanceData)
  const [academicData, setAcademicData] = useState(defaultAcademicData)
  const [financialData, setFinancialData] = useState(defaultFinancialData)
  const [loadingCharts, setLoadingCharts] = useState(true)

  useEffect(() => {
    async function loadChartData() {
      try {
        const [attendance, academic, financial] = await Promise.all([
          getAttendanceStats(),
          getAcademicPerformance(),
          getFinancialData(),
        ])

        if (attendance && attendance.length > 0) {
          setAttendanceData(attendance)
        }
        if (academic && academic.length > 0) {
          setAcademicData(academic)
        }
        if (financial && financial.length > 0) {
          setFinancialData(financial)
        }
      } catch (error) {
        console.error('Erreur chargement données graphiques:', error)
        // Garder les données par défaut en cas d'erreur
      } finally {
        setLoadingCharts(false)
      }
    }

    loadChartData()
  }, [])

  // Calculer la moyenne académique depuis les données
  const academicAverage = academicData.length > 0
    ? Math.round(academicData.reduce((sum, item) => sum + item.moyenne, 0) / academicData.length)
    : 78

  // Formater les revenus mensuels
  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M XOF`
    }
    return `${amount.toLocaleString()} XOF`
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Tableau de Bord</h1>
        <p className="text-[#737373]">Vue d'ensemble de l'académie Farafina</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Joueurs"
          value={kpisLoading ? "..." : kpis.totalPlayers.toString()}
          change={kpis.totalPlayers > 0 ? { value: `+${kpis.activePlayers}`, type: "increase" } : undefined}
          icon={Users}
          description="Joueurs actifs"
        />
        <KPICard
          title="Blessures Actives"
          value={kpisLoading ? "..." : kpis.inactivePlayers.toString()}
          change={kpis.inactivePlayers > 0 ? { value: "-3", type: "decrease" } : undefined}
          icon={Activity}
          iconColor="text-[#EF4444]"
          borderColor="border-l-[#EF4444]"
          description="Blessures en cours"
        />
        <KPICard
          title="Matchs à Venir"
          value="15"
          icon={Calendar}
          iconColor="text-[#3B82F6]"
          borderColor="border-l-[#3B82F6]"
          description="Prochains 30 jours"
        />
        <KPICard
          title="Performance Académique"
          value={`${academicAverage}%`}
          change={{ value: "+5%", type: "increase" }}
          icon={GraduationCap}
          iconColor="text-[#10B981]"
          borderColor="border-l-[#10B981]"
          description="Moyenne générale"
        />
      </div>

      {/* Second Row KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Paiements En Attente"
          value={kpisLoading ? "..." : kpis.pendingPayments.toString()}
          icon={DollarSign}
          iconColor="text-[#F59E0B]"
          borderColor="border-l-[#F59E0B]"
          description="En attente de traitement"
        />
        <KPICard
          title="Revenus Mensuels"
          value={kpisLoading ? "..." : formatRevenue(kpis.monthlyRevenue)}
          change={kpis.monthlyRevenue > 0 ? { value: "+12%", type: "increase" } : undefined}
          icon={TrendingUp}
          iconColor="text-[#10B981]"
          borderColor="border-l-[#10B981]"
          description="Ce mois-ci"
        />
        <KPICard
          title="Alertes"
          value={kpisLoading ? "..." : kpis.unreadNotifications.toString()}
          icon={AlertCircle}
          iconColor="text-[#EF4444]"
          borderColor="border-l-[#EF4444]"
          description="Nécessitent une attention"
        />
        <KPICard
          title="Taux de Présence"
          value={attendanceData.length > 0 ? `${attendanceData[attendanceData.length - 1].taux}%` : "92%"}
          change={{ value: "+3%", type: "increase" }}
          icon={Clock}
          iconColor="text-[#3B82F6]"
          borderColor="border-l-[#3B82F6]"
          description="Entraînements ce mois"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Chart */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Taux de Présence aux Entraînements</CardTitle>
            <CardDescription className="text-[#737373]">Évolution mensuelle</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
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
                    dataKey="taux"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    dot={{ fill: "#D4AF37", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Academic Performance Chart */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Performances Académiques</CardTitle>
            <CardDescription className="text-[#737373]">Moyennes par matière</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
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
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Vue Financière</CardTitle>
            <CardDescription className="text-[#737373]">Revenus vs Dépenses</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
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
                  <Legend />
                  <Bar dataKey="revenus" fill="#D4AF37" radius={[8, 8, 0, 0]} name="Revenus" />
                  <Bar dataKey="depenses" fill="#EF4444" radius={[8, 8, 0, 0]} name="Dépenses" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Injury Distribution */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Répartition des Blessures</CardTitle>
            <CardDescription className="text-[#737373]">Types de blessures enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={injuryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {injuryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
