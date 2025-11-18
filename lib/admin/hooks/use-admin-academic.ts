"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface AcademicStudentRow {
  id: string
  nom: string
  categorie: string | null
  moyenne: number
  statut: string
}

export interface AcademicData {
  subject: string
  moyenne: number
}

export interface AcademicHistory {
  month: string
  moyenne: number
}

export function useAdminAcademic() {
  const [students, setStudents] = useState<AcademicStudentRow[]>([])
  const [academicData, setAcademicData] = useState<AcademicData[]>([])
  const [academicHistory, setAcademicHistory] = useState<AcademicHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(true)

  // Récupérer l'historique académique pour le graphique d'évolution
  useEffect(() => {
    async function fetchAcademicHistory() {
      try {
        // Récupérer les 6 derniers mois d'historique
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        
        const { data: historyData, error: historyError } = await supabase
          .from('academic_history')
          .select('month, average_score')
          .gte('month', sixMonthsAgo.toISOString().split('T')[0])
          .order('month', { ascending: true })

        if (historyError) {
          console.error('Erreur récupération historique académique:', historyError)
          setHistoryLoading(false)
          return
        }

        if (historyData && historyData.length > 0) {
          // Grouper par mois et calculer la moyenne mensuelle
          const monthlyAverages: Record<string, number[]> = {}
          
          historyData.forEach((record: any) => {
            const date = new Date(record.month)
            const monthKey = date.toLocaleDateString('fr-FR', { month: 'short' })
            
            if (!monthlyAverages[monthKey]) {
              monthlyAverages[monthKey] = []
            }
            monthlyAverages[monthKey].push(Number(record.average_score) || 0)
          })

          const formattedHistory = Object.entries(monthlyAverages)
            .map(([month, scores]) => ({
              month,
              moyenne: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
            }))
            .sort((a, b) => {
              const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
              return months.indexOf(a.month) - months.indexOf(b.month)
            })

          setAcademicHistory(formattedHistory)
        }
      } catch (err: any) {
        console.error('Erreur récupération historique académique:', err)
      } finally {
        setHistoryLoading(false)
      }
    }

    fetchAcademicHistory()
  }, [])

  useEffect(() => {
    async function fetchAcademicData() {
      try {
        setLoading(true)
        setError(null)

        // Récupérer les joueurs avec leurs données académiques
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select(`
            id,
            first_name,
            last_name,
            category,
            academic
          `)
          .not('academic', 'is', null)

        if (playersError) {
          console.error('Erreur récupération joueurs académiques:', playersError)
          throw playersError
        }

        // Formater les étudiants avec leurs moyennes
        const formattedStudents: AcademicStudentRow[] = (playersData || []).map((player: any) => {
          let academicObj = player.academic
          if (typeof academicObj === 'string') {
            try {
              academicObj = JSON.parse(academicObj)
            } catch (e) {
              academicObj = {}
            }
          }

          // Calculer la moyenne générale
          const subjects = Object.values(academicObj).filter(v => typeof v === 'number') as number[]
          const moyenne = subjects.length > 0
            ? Math.round(subjects.reduce((sum, score) => sum + score, 0) / subjects.length)
            : 0

          // Déterminer le statut
          let statut = 'À améliorer'
          if (moyenne >= 85) statut = 'Excellent'
          else if (moyenne >= 70) statut = 'Satisfaisant'

          return {
            id: player.id,
            nom: `${player.first_name || ''} ${player.last_name || ''}`.trim() || 'Sans nom',
            categorie: player.category,
            moyenne,
            statut,
            // progression n'existe pas dans la structure - on peut le calculer plus tard si nécessaire
          }
        })

        // Calculer les moyennes par matière
        const subjectsMap: Record<string, number[]> = {}
        playersData?.forEach((player: any) => {
          let academicObj = player.academic
          if (typeof academicObj === 'string') {
            try {
              academicObj = JSON.parse(academicObj)
            } catch (e) {
              return
            }
          }

          if (academicObj && typeof academicObj === 'object') {
            Object.entries(academicObj).forEach(([subject, score]) => {
              const numScore = typeof score === 'number' ? score : Number(score)
              if (!isNaN(numScore) && numScore > 0) {
                if (!subjectsMap[subject]) subjectsMap[subject] = []
                subjectsMap[subject].push(numScore)
              }
            })
          }
        })

        const formattedAcademicData: AcademicData[] = Object.entries(subjectsMap)
          .map(([subject, scores]) => ({
            subject,
            moyenne: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
          }))
          .sort((a, b) => b.moyenne - a.moyenne)

        setStudents(formattedStudents)
        setAcademicData(formattedAcademicData)
        setHasLoaded(true)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des données académiques'
        setError(errorMessage)
        setHasLoaded(false)
        console.error('Erreur récupération données académiques:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAcademicData()
  }, [])

  return { students, academicData, academicHistory, loading: loading || historyLoading, error, hasLoaded }
}

