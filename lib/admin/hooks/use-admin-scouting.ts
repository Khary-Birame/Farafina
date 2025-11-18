"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface TalentAnalysis {
  id: string
  player_id: string
  player_name: string
  ai_score: number
  potential_level: string
  talent_metrics: {
    technique?: number
    physique?: number
    mental?: number
    tactique?: number
    vitesse?: number
    endurance?: number
  }
  analysis_date: string
}

export interface TalentStats {
  totalIdentified: number
  averageScore: number
  veryHighPotential: number
  activeAnalyses: number
}

export interface PotentialDistribution {
  name: string
  value: number
  color: string
}

export function useAdminScouting() {
  const [talentAnalyses, setTalentAnalyses] = useState<TalentAnalysis[]>([])
  const [stats, setStats] = useState<TalentStats>({
    totalIdentified: 0,
    averageScore: 0,
    veryHighPotential: 0,
    activeAnalyses: 0,
  })
  const [potentialDistribution, setPotentialDistribution] = useState<PotentialDistribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function fetchScoutingData() {
      try {
        setLoading(true)
        setError(null)

        // Récupérer les analyses de talents
        const { data: analysesData, error: analysesError } = await supabase
          .from('talent_analyses')
          .select('id, player_id, ai_score, potential_level, talent_metrics, analysis_date')
          .order('ai_score', { ascending: false })

        if (analysesError) {
          console.error('Erreur récupération analyses talents:', analysesError)
          throw analysesError
        }

        // Récupérer les noms des joueurs
        const playerIds = (analysesData || []).map((a: any) => a.player_id).filter(Boolean)
        let playersData: any[] | null = []
        
        if (playerIds.length > 0) {
          const { data } = await supabase
            .from('players')
            .select('id, first_name, last_name')
            .in('id', playerIds)
          playersData = data
        }

        // Créer un map des joueurs
        const playersMap: Record<string, { first_name: string; last_name: string }> = {}
        if (playersData) {
          playersData.forEach((player: any) => {
            playersMap[player.id] = {
              first_name: player.first_name || '',
              last_name: player.last_name || '',
            }
          })
        }

        // Formater les données
        const formattedAnalyses: TalentAnalysis[] = (analysesData || []).map((analysis: any) => {
          const player = playersMap[analysis.player_id]
          const playerName = player 
            ? `${player.first_name || ''} ${player.last_name || ''}`.trim() 
            : 'Joueur inconnu'

          // Parser les métriques si c'est une string
          let metrics = analysis.talent_metrics
          if (typeof metrics === 'string') {
            try {
              metrics = JSON.parse(metrics)
            } catch (e) {
              metrics = {}
            }
          }

          return {
            id: analysis.id,
            player_id: analysis.player_id,
            player_name: playerName,
            ai_score: Math.round(Number(analysis.ai_score) || 0),
            potential_level: analysis.potential_level || 'Moyen',
            talent_metrics: metrics || {},
            analysis_date: analysis.analysis_date,
          }
        })

        // Calculer les statistiques
        const totalIdentified = formattedAnalyses.length
        const averageScore = totalIdentified > 0
          ? Math.round(
              formattedAnalyses.reduce((sum, a) => sum + a.ai_score, 0) / totalIdentified
            )
          : 0
        const veryHighPotential = formattedAnalyses.filter(
          a => a.potential_level === 'Très élevé'
        ).length
        const activeAnalyses = formattedAnalyses.length

        // Calculer la répartition du potentiel
        const distributionMap: Record<string, number> = {
          'Très élevé': 0,
          'Élevé': 0,
          'Moyen': 0,
          'À Développer': 0,
        }

        formattedAnalyses.forEach(analysis => {
          const level = analysis.potential_level
          if (level in distributionMap) {
            distributionMap[level]++
          }
        })

        const distribution: PotentialDistribution[] = [
          { name: 'Très élevé', value: distributionMap['Très élevé'], color: '#D4AF37' },
          { name: 'Élevé', value: distributionMap['Élevé'], color: '#E8C966' },
          { name: 'Moyen', value: distributionMap['Moyen'], color: '#C0C0C0' },
          { name: 'À Développer', value: distributionMap['À Développer'], color: '#FF6B6B' },
        ]

        setTalentAnalyses(formattedAnalyses)
        setStats({
          totalIdentified,
          averageScore,
          veryHighPotential,
          activeAnalyses,
        })
        setPotentialDistribution(distribution)
        setHasLoaded(true)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des données de scouting'
        setError(errorMessage)
        setHasLoaded(false)
        console.error('Erreur récupération données scouting:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchScoutingData()
  }, [])

  // Calculer les métriques moyennes pour le graphique radar
  const averageTalentMetrics = talentAnalyses.length > 0
    ? {
        technique: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.technique || 0), 0) / talentAnalyses.length
        ),
        physique: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.physique || 0), 0) / talentAnalyses.length
        ),
        mental: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.mental || 0), 0) / talentAnalyses.length
        ),
        tactique: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.tactique || 0), 0) / talentAnalyses.length
        ),
        vitesse: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.vitesse || 0), 0) / talentAnalyses.length
        ),
        endurance: Math.round(
          talentAnalyses.reduce((sum, a) => sum + (a.talent_metrics.endurance || 0), 0) / talentAnalyses.length
        ),
      }
    : {
        technique: 0,
        physique: 0,
        mental: 0,
        tactique: 0,
        vitesse: 0,
        endurance: 0,
      }

  return {
    talentAnalyses,
    stats,
    potentialDistribution,
    averageTalentMetrics,
    loading,
    error,
    hasLoaded,
  }
}

