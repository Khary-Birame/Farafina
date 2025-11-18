"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface TrainingSessionRow {
  id: string
  date: string
  heure: string | null
  type: string
  categorie: string | null
  coach: string
  lieu: string | null
  presence: number
  total: number
}

export interface MatchRow {
  id: string
  date: string
  heure: string | null
  categorie: string | null
  adversaire: string | null
  lieu: string
}

export function useAdminTraining() {
  const [trainingSessions, setTrainingSessions] = useState<TrainingSessionRow[]>([])
  const [matches, setMatches] = useState<MatchRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function fetchTrainingData() {
      try {
        setLoading(true)
        setError(null)

        // Récupérer les sessions d'entraînement
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('training_sessions')
          .select(`
            id,
            date,
            start_time,
            end_time,
            category,
            coach_id
          `)
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .limit(10)

        if (sessionsError) {
          console.error('Erreur récupération sessions:', sessionsError)
        }

        // Récupérer la présence et les infos du coach pour chaque session
        const sessionsWithAttendance = await Promise.all(
          (sessionsData || []).map(async (session: any) => {
            const { data: attendanceData } = await supabase
              .from('training_attendance')
              .select('attended')
              .eq('session_id', session.id)

            const attended = attendanceData?.filter(a => a.attended).length || 0
            const total = attendanceData?.length || 0

            // Récupérer les infos du coach si coach_id existe
            let coach = 'Non défini'
            if (session.coach_id) {
              const { data: coachData } = await supabase
                .from('users')
                .select('first_name, last_name')
                .eq('id', session.coach_id)
                .single()
              
              if (coachData) {
                coach = `${coachData.first_name || ''} ${coachData.last_name || ''}`.trim() || 'Non défini'
              }
            }

            return {
              id: session.id,
              date: session.date,
              heure: session.start_time ? session.start_time.substring(0, 5) : null,
              type: 'Entraînement', // Valeur par défaut car pas de champ type dans training_sessions
              categorie: session.category,
              coach,
              lieu: null, // Pas de champ venue dans training_sessions
              presence: attended,
              total,
            }
          })
        )

        // Récupérer les matchs à venir
        const { data: matchesData, error: matchesError } = await supabase
          .from('matches')
          .select('id, date, opponent, venue, category')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .limit(10)

        if (matchesError) {
          console.error('Erreur récupération matchs:', matchesError)
        }

        const formattedMatches: MatchRow[] = (matchesData || []).map((match: any) => {
          // Déterminer le lieu selon la valeur de venue
          let lieu = 'Non défini'
          if (match.venue) {
            const venueLower = match.venue.toLowerCase()
            if (venueLower.includes('domicile') || venueLower === 'home' || venueLower.includes('domicile')) {
              lieu = 'Domicile'
            } else if (venueLower.includes('extérieur') || venueLower === 'away' || venueLower.includes('exterieur')) {
              lieu = 'Extérieur'
            } else {
              lieu = match.venue // Utiliser la valeur telle quelle
            }
          }

          return {
            id: match.id,
            date: match.date,
            heure: null, // Pas de champ time dans matches
            categorie: match.category,
            adversaire: match.opponent,
            lieu,
          }
        })

        setTrainingSessions(sessionsWithAttendance)
        setMatches(formattedMatches)
        setHasLoaded(true)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des données d\'entraînement'
        setError(errorMessage)
        setHasLoaded(false)
        console.error('Erreur récupération données entraînement:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrainingData()
  }, [])

  return { trainingSessions, matches, loading, error, hasLoaded }
}

