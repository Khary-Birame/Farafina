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

export function useAdminAcademic() {
  const [students, setStudents] = useState<AcademicStudentRow[]>([])
  const [academicData, setAcademicData] = useState<AcademicData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

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

  return { students, academicData, loading, error, hasLoaded }
}

