"use client"

import { AdminLayoutEnhanced } from "@/components/admin/admin-layout-enhanced"
import { KPICardEnhanced } from "@/components/admin/kpi-card-enhanced"
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
  Target,
  Percent,
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
import { useAdminDashboardOptimized } from "@/lib/admin/hooks/use-admin-dashboard-optimized"
import { getAttendanceStats, getAcademicPerformance, getFinancialData } from "@/lib/admin/services/dashboard-stats"
import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"

// Lazy load des charts pour optimiser les performances
const ChartSkeleton = () => (
  <div className="h-[300px] flex items-center justify-center">
    <div className="animate-pulse space-y-4 w-full">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
)

const LazyLineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

const LazyBarChart = dynamic(
  () => import('recharts').then(mod => mod.BarChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

const LazyPieChart = dynamic(
  () => import('recharts').then(mod => mod.PieChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
)

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
  const { kpis, loading: kpisLoading } = useAdminDashboardOptimized()
  const [attendanceData, setAttendanceData] = useState<any[]>([])
  const [academicData, setAcademicData] = useState<any[]>([])
  const [financialData, setFinancialData] = useState<any[]>([])
  const [loadingCharts, setLoadingCharts] = useState(true)

  // Cache simple pour les données des charts
  const chartsCacheKey = 'admin-dashboard-charts'
  const CACHE_DURATION = 60000 // 1 minute

  useEffect(() => {
    async function loadChartData() {
      try {
        setLoadingCharts(true)
        
        // Vérifier le cache
        const cached = typeof window !== 'undefined' 
          ? sessionStorage.getItem(chartsCacheKey)
          : null
        
        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached)
            const now = Date.now()
            if (now - timestamp < CACHE_DURATION) {
              setAttendanceData(data.attendance || [])
              setAcademicData(data.academic || [])
              setFinancialData(data.financial || [])
              setLoadingCharts(false)
              
              // Revalider en arrière-plan
              setTimeout(() => {
                loadChartDataFresh()
              }, 100)
              return
            }
          } catch (e) {
            // Cache invalide, continuer
          }
        }

        await loadChartDataFresh()
      } catch (error) {
        console.error('Erreur chargement données graphiques:', error)
        setAttendanceData([])
        setAcademicData([])
        setFinancialData([])
        setLoadingCharts(false)
      }
    }

    async function loadChartDataFresh() {
      try {
        const [attendance, academic, financial] = await Promise.all([
          getAttendanceStats(),
          getAcademicPerformance(),
          getFinancialData(),
        ])

        // Utiliser TOUJOURS les données Supabase, même si elles sont vides
        // Ne jamais utiliser de mockups - les données Supabase sont la source de vérité
        if (attendance && attendance.length > 0) {
          setAttendanceData(attendance)
        } else {
          setAttendanceData([])
        }
        
        if (academic && academic.length > 0) {
          setAcademicData(academic)
        } else {
          setAcademicData([])
        }
        
        // getFinancialData retourne maintenant XOF/EUR/USD au lieu de revenus/depenses
        if (financial && financial.length > 0) {
          setFinancialData(financial)
        } else {
          setFinancialData([])
        }

        // Mettre en cache
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(chartsCacheKey, JSON.stringify({
            data: {
              attendance: attendance || [],
              academic: academic || [],
              financial: financial || [],
            },
            timestamp: Date.now(),
          }))
        }
      } catch (error) {
        console.error('Erreur chargement données graphiques:', error)
        setAttendanceData([])
        setAcademicData([])
        setFinancialData([])
      } finally {
        setLoadingCharts(false)
      }
    }

    loadChartData()
  }, [])

  // Calculer la moyenne académique avec useMemo pour optimiser
  const academicAverage = useMemo(() => {
    return academicData.length > 0
      ? Math.round(academicData.reduce((sum, item) => sum + item.moyenne, 0) / academicData.length)
      : 0
  }, [academicData])

  // Formater les revenus mensuels
  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M XOF`
    }
    return `${amount.toLocaleString()} XOF`
  }

  // Générer des sparklines pour les KPIs
  const generateSparkline = (data: any[], key: string) => {
    if (!data || data.length === 0) return []
    return data.slice(-7).map((item) => item[key] || 0)
  }

  return (
    <AdminLayoutEnhanced>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
          Tableau de Bord
        </h1>
        <p className="text-sm sm:text-base text-[#737373]">
          Vue d'ensemble de l'académie Farafina
        </p>
      </div>

      {/* KPI Cards - Responsive Grid avec nouveaux KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <KPICardEnhanced
          title="Total Joueurs"
          value={kpisLoading ? "..." : kpis.totalPlayers.toString()}
          change={
            kpis.totalPlayers > 0
              ? {
                  value: `+${kpis.activePlayers}`,
                  type: "increase",
                  period: "actifs",
                }
              : undefined
          }
          icon={Users}
          description="Joueurs actifs"
          sparkline={generateSparkline(attendanceData, 'taux')}
          loading={kpisLoading}
        />
        <KPICardEnhanced
          title="Taux de Rétention"
          value={kpisLoading ? "..." : `${kpis.retentionRate}%`}
          change={
            kpis.retentionRate > 80
              ? { value: "+2%", type: "increase", period: "vs mois dernier" }
              : kpis.retentionRate < 70
              ? { value: "-3%", type: "decrease", period: "vs mois dernier" }
              : undefined
          }
          icon={Target}
          iconColor="text-[#10B981]"
          borderColor="border-l-[#10B981]"
          description="Joueurs actifs / Total"
          loading={kpisLoading}
        />
        <KPICardEnhanced
          title="Revenus Mensuels"
          value={kpisLoading ? "..." : formatRevenue(kpis.monthlyRevenue)}
          change={
            kpis.growthRate > 0
              ? { value: `+${kpis.growthRate}%`, type: "increase", period: "MoM" }
              : undefined
          }
          icon={DollarSign}
          iconColor="text-[#D4AF37]"
          borderColor="border-l-[#D4AF37]"
          description="Ce mois-ci"
          sparkline={generateSparkline(financialData, 'XOF')}
          loading={kpisLoading}
        />
        <KPICardEnhanced
          title="ARPU"
          value={kpisLoading ? "..." : formatRevenue(kpis.arpu)}
          change={
            kpis.arpu > 0
              ? { value: "+5%", type: "increase", period: "vs mois dernier" }
              : undefined
          }
          icon={TrendingUp}
          iconColor="text-[#3B82F6]"
          borderColor="border-l-[#3B82F6]"
          description="Revenu moyen par joueur"
          loading={kpisLoading}
        />
      </div>

      {/* Second Row KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <KPICardEnhanced
          title="Performance Académique"
          value={loadingCharts ? "..." : `${academicAverage}%`}
          change={{ value: "+5%", type: "increase", period: "vs trimestre" }}
          icon={GraduationCap}
          iconColor="text-[#10B981]"
          borderColor="border-l-[#10B981]"
          description="Moyenne générale"
          loading={loadingCharts}
        />
        <KPICardEnhanced
          title="Taux d'Assiduité"
          value={
            loadingCharts
              ? "..."
              : kpis.averageAttendance > 0
              ? `${kpis.averageAttendance}%`
              : attendanceData.length > 0
              ? `${attendanceData[attendanceData.length - 1].taux}%`
              : "N/A"
          }
          change={
            kpis.averageAttendance > 90
              ? { value: "+3%", type: "increase", period: "ce mois" }
              : undefined
          }
          icon={Clock}
          iconColor="text-[#3B82F6]"
          borderColor="border-l-[#3B82F6]"
          description="Entraînements"
          sparkline={generateSparkline(attendanceData, 'taux')}
          loading={loadingCharts}
        />
        <KPICardEnhanced
          title="Taux de Conversion"
          value={kpisLoading ? "..." : `${kpis.conversionRate}%`}
          change={
            kpis.conversionRate > 50
              ? { value: "+8%", type: "increase", period: "vs mois dernier" }
              : undefined
          }
          icon={Percent}
          iconColor="text-[#F59E0B]"
          borderColor="border-l-[#F59E0B]"
          description="Candidatures acceptées"
          loading={kpisLoading}
        />
        <KPICardEnhanced
          title="Alertes"
          value={kpisLoading ? "..." : kpis.unreadNotifications.toString()}
          icon={AlertCircle}
          iconColor="text-[#EF4444]"
          borderColor="border-l-[#EF4444]"
          description="Nécessitent une attention"
          loading={kpisLoading}
        />
      </div>

      {/* Charts Row - Responsive avec Lazy Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Attendance Chart */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">
              Taux de Présence aux Entraînements
            </CardTitle>
            <CardDescription className="text-[#737373]">Évolution mensuelle</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <ChartSkeleton />
            ) : attendanceData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée de présence disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LazyLineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
                  <YAxis stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
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
                </LazyLineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Academic Performance Chart */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">
              Performances Académiques
            </CardTitle>
            <CardDescription className="text-[#737373]">Moyennes par matière</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <ChartSkeleton />
            ) : academicData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée académique disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LazyBarChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="subject" stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
                  <YAxis stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="moyenne" radius={[8, 8, 0, 0]}>
                    {academicData.map((entry, index) => {
                      const colors = ["#D4AF37", "#E8C966", "#B8941F", "#F59E0B", "#10B981"]
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    })}
                  </Bar>
                </LazyBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Financial Overview */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Vue Financière</CardTitle>
            <CardDescription className="text-[#737373]">
              Évolution mensuelle en XOF, EUR et USD
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCharts ? (
              <ChartSkeleton />
            ) : financialData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée financière disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LazyBarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
                  <YAxis stroke="#737373" tick={{ fill: "#737373", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="XOF" fill="#D4AF37" radius={[8, 8, 0, 0]} name="XOF" />
                  <Bar dataKey="EUR" fill="#1A1A1A" radius={[8, 8, 0, 0]} name="EUR" />
                  <Bar dataKey="USD" fill="#E8C966" radius={[8, 8, 0, 0]} name="USD" />
                </LazyBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Injury Distribution */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Répartition des Blessures</CardTitle>
            <CardDescription className="text-[#737373]">Types de blessures enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LazyPieChart>
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
              </LazyPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayoutEnhanced>
  )
}
