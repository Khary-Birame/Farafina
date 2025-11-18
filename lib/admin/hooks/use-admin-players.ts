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
          query = query.eq('status', filters.status)
        }
        if (filters?.search) {
          query = query.or(
            `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
          )
        }

        const { data, error: queryError } = await query

        if (queryError) throw queryError

        // Formater les données
        const formattedPlayers: PlayerRow[] = (data || []).map((player: any) => ({
          id: player.id,
          nom: `${player.first_name || ''} ${player.last_name || ''}`.trim(),
          age: player.age,
          position: player.position || 'Non défini',
          categorie: player.category || 'Non défini',
          pays: player.nationality || player.country || 'Non défini',
          statut: player.status === 'active' ? 'Actif' : 
                 player.status === 'inactive' ? 'Inactif' :
                 player.status === 'graduated' ? 'Diplômé' :
                 player.status === 'transferred' ? 'Transféré' : 'Actif',
          presence: '95%', // À calculer depuis les stats ou créer une table training_attendance
          performance: player.performance ? Math.round(player.performance) : null,
        }))

        setPlayers(formattedPlayers)
      } catch (err: any) {
        setError(err.message)
        console.error('Erreur récupération joueurs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [filters])

  return { players, loading, error }
}

