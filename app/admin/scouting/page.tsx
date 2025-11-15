"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { KPICard } from "@/components/admin/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Activity } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Données de démonstration
const talentMetrics = [
  {
    name: "Technique",
    value: 85,
    fullMark: 100,
  },
  {
    name: "Physique",
    value: 78,
    fullMark: 100,
  },
  {
    name: "Mental",
    value: 82,
    fullMark: 100,
  },
  {
    name: "Tactique",
    value: 75,
    fullMark: 100,
  },
  {
    name: "Vitesse",
    value: 88,
    fullMark: 100,
  },
  {
    name: "Endurance",
    value: 80,
    fullMark: 100,
  },
]

const playerRankings = [
  { name: "Amadou Diallo", score: 92, position: "Attaquant", age: 16 },
  { name: "Aissatou Ba", score: 88, position: "Gardien", age: 16 },
  { name: "Fatou Sarr", score: 85, position: "Milieu", age: 15 },
  { name: "Ibrahim Koné", score: 82, position: "Défenseur", age: 17 },
]

const potentialData = [
  { name: "Très Élevé", value: 12, color: "#D4AF37" },
  { name: "Élevé", value: 28, color: "#E8C966" },
  { name: "Moyen", value: 45, color: "#C0C0C0" },
  { name: "À Développer", value: 15, color: "#FF6B6B" },
]

export default function AIScoutingPage() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">IA & Scouting de Talents</h1>
        <p className="text-[#C0C0C0]">Analyse prédictive et identification des talents</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Talents Identifiés"
          value="85"
          change={{ value: "+12", type: "increase" }}
          icon={Brain}
          description="Joueurs à fort potentiel"
        />
        <KPICard
          title="Score Moyen IA"
          value="82%"
          change={{ value: "+5%", type: "increase" }}
          icon={TrendingUp}
          iconColor="text-green-500"
          borderColor="border-l-green-500"
          description="Prédiction moyenne"
        />
        <KPICard
          title="Potentiel Très Élevé"
          value="12"
          icon={Target}
          iconColor="text-orange-500"
          borderColor="border-l-orange-500"
          description="Top talents"
        />
        <KPICard
          title="Analyses Actives"
          value="247"
          icon={Activity}
          iconColor="text-blue-500"
          borderColor="border-l-blue-500"
          description="Profils analysés"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Talent Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Profil de Talent (Moyenne)</CardTitle>
            <CardDescription>Analyse multidimensionnelle</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={talentMetrics}>
                <PolarGrid stroke="#C0C0C0" />
                <PolarAngleAxis dataKey="name" stroke="#1A1A1A" tick={{ fill: "#1A1A1A" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#C0C0C0" />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Potential Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Répartition du Potentiel</CardTitle>
            <CardDescription>Distribution des scores IA</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={potentialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="name" stroke="#1A1A1A" />
                <YAxis stroke="#1A1A1A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {potentialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Player Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A1A1A]">Classement des Talents</CardTitle>
          <CardDescription>Top joueurs selon l'IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playerRankings.map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-4 border border-[#C0C0C0]/30 rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">{player.name}</div>
                    <div className="text-sm text-[#C0C0C0]">
                      {player.position} • {player.age} ans
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#D4AF37]">{player.score}</div>
                    <div className="text-xs text-[#C0C0C0]">Score IA</div>
                  </div>
                  <Badge className="bg-[#D4AF37] text-white">Top Talent</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

