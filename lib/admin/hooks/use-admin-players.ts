"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface PlayerRow {
  id: string
  nom: string
  age: number | null
  position: string | null
  categorie: string | null
  pays: string | null
  statut: string
  presence: string
  performance: number | null
}

export function useAdminPlayers(filters?: {
  category?: string
  position?: string
  status?: string
  search?: string
}) {
  const [players, setPlayers] = useState<PlayerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false) // Indique si les données ont été chargées depuis Supabase

  useEffect(() => {
    async function fetchPlayers() {
      try {
        let query = supabase
          .from('players')
          .select(`
            id,
            first_name,
            last_name,
            age,
            position,
            category,
            nationality,
            country,
            status,
            performance
          `)
          .order('created_at', { ascending: false })

        // Appliquer les filtres
        if (filters?.category) {
          query = query.eq('category', filters.category)
        }
        if (filters?.position) {
          query = query.eq('position', filters.position)
        }
        if (filters?.status) {
          // Convertir le statut français en statut de la base
          const statusMap: Record<string, string> = {
            'Actif': 'active',
            'Inactif': 'inactive',
            'Diplômé': 'graduated',
            'Transféré': 'transferred',
          }
          const dbStatus = statusMap[filters.status] || filters.status
          query = query.eq('status', dbStatus)
        }
        if (filters?.search) {
          query = query.or(
            `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
          )
        }

        const { data, error: queryError } = await query

        if (queryError) {
          console.error('Erreur récupération joueurs:', {
            message: queryError.message,
            code: queryError.code,
            details: queryError.details,
            hint: queryError.hint,
          })
          throw queryError
        }

        // Récupérer les présences pour tous les joueurs en une seule requête
        const { data: attendanceData } = await supabase
          .from('training_attendance')
          .select('player_id, attended')

        // Calculer le taux de présence par joueur
        const attendanceByPlayer: Record<string, { attended: number; total: number }> = {}
        
        if (attendanceData) {
          attendanceData.forEach((attendance: any) => {
            if (!attendanceByPlayer[attendance.player_id]) {
              attendanceByPlayer[attendance.player_id] = { attended: 0, total: 0 }
            }
            attendanceByPlayer[attendance.player_id].total++
            if (attendance.attended) {
              attendanceByPlayer[attendance.player_id].attended++
            }
          })
        }

        // Formater les données selon le schéma de la base
        const formattedPlayers: PlayerRow[] = (data || []).map((player: any) => {
          // Calculer le taux de présence
          const playerAttendance = attendanceByPlayer[player.id]
          let presenceRate = 0
          if (playerAttendance && playerAttendance.total > 0) {
            presenceRate = Math.round((playerAttendance.attended / playerAttendance.total) * 100)
          }

          return {
            id: player.id,
            nom: `${player.first_name || ''} ${player.last_name || ''}`.trim() || 'Sans nom',
            age: player.age,
            position: player.position || 'Non défini',
            categorie: player.category || 'Non défini',
            pays: player.nationality || player.country || 'Non défini',
            statut: player.status === 'active' ? 'Actif' : 
                   player.status === 'inactive' ? 'Inactif' :
                   player.status === 'graduated' ? 'Diplômé' :
                   player.status === 'transferred' ? 'Transféré' : 'Actif',
            presence: playerAttendance && playerAttendance.total > 0 ? `${presenceRate}%` : 'N/A',
            performance: player.performance ? Math.round(Number(player.performance)) : null,
          }
        })

        // Toujours mettre à jour les joueurs et marquer comme chargé, même si le tableau est vide
        // Cela garantit qu'on utilise les données Supabase et non des mockups
        setPlayers(formattedPlayers)
        setHasLoaded(true) // Marquer comme chargé avec succès (même si vide)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des joueurs'
        setError(errorMessage)
        setHasLoaded(false) // En cas d'erreur, on n'a pas chargé avec succès
        console.error('Erreur récupération joueurs:', {
          message: err?.message,
          code: err?.code,
          details: err?.details,
          hint: err?.hint,
          stack: err?.stack,
        })
        // Ne pas vider les joueurs en cas d'erreur, garder l'état précédent
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [filters])

  return { players, loading, error, hasLoaded }
}
