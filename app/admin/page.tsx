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

// Données de démonstration
const attendanceData = [
  { month: "Jan", taux: 92 },
  { month: "Fév", taux: 88 },
  { month: "Mar", taux: 95 },
  { month: "Avr", taux: 90 },
  { month: "Mai", taux: 93 },
  { month: "Juin", taux: 96 },
]

const academicData = [
  { subject: "Math", moyenne: 78 },
  { subject: "Français", moyenne: 82 },
  { subject: "Anglais", moyenne: 75 },
  { subject: "Sciences", moyenne: 80 },
  { subject: "Histoire", moyenne: 77 },
]

const financialData = [
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
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Tableau de Bord</h1>
        <p className="text-[#C0C0C0]">Vue d'ensemble de l'académie Farafina</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Joueurs"
          value="247"
          change={{ value: "+12", type: "increase" }}
          icon={Users}
          description="Joueurs actifs"
        />
        <KPICard
          title="Blessures Actives"
          value="8"
          change={{ value: "-3", type: "decrease" }}
          icon={Activity}
          iconColor="text-red-500"
          borderColor="border-l-red-500"
          description="Blessures en cours"
        />
        <KPICard
          title="Matchs à Venir"
          value="15"
          icon={Calendar}
          iconColor="text-blue-500"
          borderColor="border-l-blue-500"
          description="Prochains 30 jours"
        />
        <KPICard
          title="Performance Académique"
          value="78%"
          change={{ value: "+5%", type: "increase" }}
          icon={GraduationCap}
          iconColor="text-green-500"
          borderColor="border-l-green-500"
          description="Moyenne générale"
        />
      </div>

      {/* Second Row KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Paiements En Attente"
          value="23"
          icon={DollarSign}
          iconColor="text-orange-500"
          borderColor="border-l-orange-500"
          description="En attente de traitement"
        />
        <KPICard
          title="Revenus Mensuels"
          value="68 000 €"
          change={{ value: "+12%", type: "increase" }}
          icon={TrendingUp}
          iconColor="text-green-500"
          borderColor="border-l-green-500"
          description="Ce mois-ci"
        />
        <KPICard
          title="Alertes"
          value="5"
          icon={AlertCircle}
          iconColor="text-red-500"
          borderColor="border-l-red-500"
          description="Nécessitent une attention"
        />
        <KPICard
          title="Taux de Présence"
          value="92%"
          change={{ value: "+3%", type: "increase" }}
          icon={Clock}
          iconColor="text-blue-500"
          borderColor="border-l-blue-500"
          description="Entraînements ce mois"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Taux de Présence aux Entraînements</CardTitle>
            <CardDescription>Évolution mensuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
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
                  dataKey="taux"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{ fill: "#D4AF37", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Academic Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Performances Académiques</CardTitle>
            <CardDescription>Moyennes par matière</CardDescription>
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
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Vue Financière</CardTitle>
            <CardDescription>Revenus vs Dépenses (€)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
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
                <Legend />
                <Bar dataKey="revenus" fill="#D4AF37" radius={[8, 8, 0, 0]} name="Revenus" />
                <Bar dataKey="depenses" fill="#C0C0C0" radius={[8, 8, 0, 0]} name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Injury Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Répartition des Blessures</CardTitle>
            <CardDescription>Types de blessures enregistrées</CardDescription>
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
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
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
