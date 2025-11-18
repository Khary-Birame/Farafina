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
import { useAdminScouting } from "@/lib/admin/hooks/use-admin-scouting"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

export default function AIScoutingPage() {
  const { talentAnalyses, stats, potentialDistribution, averageTalentMetrics, loading, error } = useAdminScouting()
  const [playerDetails, setPlayerDetails] = useState<Record<string, { position: string | null; age: number | null }>>({})

  // Récupérer les détails des joueurs (position et âge) pour le classement
  useEffect(() => {
    async function fetchPlayerDetails() {
      if (talentAnalyses.length === 0) return

      const playerIds = talentAnalyses.map(t => t.player_id)
      const { data: playersData } = await supabase
        .from('players')
        .select('id, position, age')
        .in('id', playerIds)

      if (playersData) {
        const details: Record<string, { position: string | null; age: number | null }> = {}
        playersData.forEach(player => {
          details[player.id] = { position: player.position, age: player.age }
        })
        setPlayerDetails(details)
      }
    }

    fetchPlayerDetails()
  }, [talentAnalyses])

  // Formater les métriques pour le graphique radar
  const talentMetricsForChart = [
    { name: "Technique", value: averageTalentMetrics.technique, fullMark: 100 },
    { name: "Physique", value: averageTalentMetrics.physique, fullMark: 100 },
    { name: "Mental", value: averageTalentMetrics.mental, fullMark: 100 },
    { name: "Tactique", value: averageTalentMetrics.tactique, fullMark: 100 },
    { name: "Vitesse", value: averageTalentMetrics.vitesse, fullMark: 100 },
    { name: "Endurance", value: averageTalentMetrics.endurance, fullMark: 100 },
  ]

  // Top 10 joueurs pour le classement
  const topPlayers = talentAnalyses
    .slice(0, 10)
    .map(analysis => ({
      id: analysis.id,
      name: analysis.player_name,
      score: analysis.ai_score,
      position: playerDetails[analysis.player_id]?.position || 'Non défini',
      age: playerDetails[analysis.player_id]?.age || null,
    }))
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">IA & Scouting de Talents</h1>
        <p className="text-[#737373]">Analyse prédictive et identification des talents</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Talents Identifiés"
          value={loading ? "..." : stats.totalIdentified.toString()}
          change={stats.totalIdentified > 0 ? { value: "+12", type: "increase" } : undefined}
          icon={Brain}
          description="Joueurs à fort potentiel"
        />
        <KPICard
          title="Score Moyen IA"
          value={loading ? "..." : `${stats.averageScore}%`}
          change={stats.averageScore > 0 ? { value: "+5%", type: "increase" } : undefined}
          icon={TrendingUp}
          iconColor="text-green-500"
          borderColor="border-l-green-500"
          description="Prédiction moyenne"
        />
        <KPICard
          title="Potentiel Très Élevé"
          value={loading ? "..." : stats.veryHighPotential.toString()}
          icon={Target}
          iconColor="text-orange-500"
          borderColor="border-l-orange-500"
          description="Top talents"
        />
        <KPICard
          title="Analyses Actives"
          value={loading ? "..." : stats.activeAnalyses.toString()}
          icon={Activity}
          iconColor="text-blue-500"
          borderColor="border-l-blue-500"
          description="Profils analysés"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Talent Radar Chart */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Profil de Talent (Moyenne)</CardTitle>
            <CardDescription className="text-[#737373]">Analyse multidimensionnelle</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : error ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-red-600">Erreur: {error}</p>
              </div>
            ) : talentAnalyses.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune analyse de talent disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={talentMetricsForChart}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="name" stroke="#737373" tick={{ fill: "#737373" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#E5E7EB" />
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
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Potential Distribution */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Répartition du Potentiel</CardTitle>
            <CardDescription className="text-[#737373]">Distribution des scores IA</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Chargement...</p>
              </div>
            ) : error ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-red-600">Erreur: {error}</p>
              </div>
            ) : potentialDistribution.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-[#737373]">Aucune donnée de répartition disponible</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={potentialDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#737373" tick={{ fill: "#737373" }} />
                  <YAxis stroke="#737373" tick={{ fill: "#737373" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {potentialDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Player Rankings */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Classement des Talents</CardTitle>
          <CardDescription className="text-[#737373]">Top joueurs selon l'IA</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-[#737373]">Chargement des talents...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600 mb-2">Erreur: {error}</p>
            </div>
          ) : topPlayers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#737373] mb-4">Aucun talent identifié</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A]">{player.name}</div>
                      <div className="text-sm text-[#737373]">
                        {player.position} {player.age ? `• ${player.age} ans` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#D4AF37]">{player.score}</div>
                      <div className="text-xs text-[#737373]">Score IA</div>
                    </div>
                    <Badge className="bg-[#D4AF37] text-white">Top Talent</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

