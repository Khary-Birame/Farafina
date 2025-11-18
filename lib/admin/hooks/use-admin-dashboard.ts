"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface DashboardKPIs {
  totalPlayers: number
  activePlayers: number
  inactivePlayers: number
  pendingPayments: number
  monthlyRevenue: number
  unreadNotifications: number
  pendingApplications: number
  totalUsers: number
}

export function useAdminDashboard() {
  const [kpis, setKpis] = useState<DashboardKPIs>({
    totalPlayers: 0,
    activePlayers: 0,
    inactivePlayers: 0,
    pendingPayments: 0,
    monthlyRevenue: 0,
    unreadNotifications: 0,
    pendingApplications: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchKPIs() {
      try {
        // Total joueurs
        const { count: totalPlayers } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })

        // Joueurs actifs
        const { count: activePlayers } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')

        // Joueurs inactifs
        const { count: inactivePlayers } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })
          .in('status', ['inactive', 'transferred'])

        // Paiements en attente (orders avec payment_status = 'pending')
        const { count: pendingPayments } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('payment_status', 'pending')

        // Revenus mensuels (orders complétées ce mois)
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        
        const { data: monthlyOrders } = await supabase
          .from('orders')
          .select('total')
          .eq('payment_status', 'paid')
          .gte('created_at', startOfMonth)

        const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0

        // Notifications non lues
        const { count: unreadNotifications } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('read', false)

        // Candidatures en attente
        const { count: pendingApplications } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('form_type', 'application')
          .eq('status', 'pending')

        // Total utilisateurs
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })

        setKpis({
          totalPlayers: totalPlayers || 0,
          activePlayers: activePlayers || 0,
          inactivePlayers: inactivePlayers || 0,
          pendingPayments: pendingPayments || 0,
          monthlyRevenue: Math.round(monthlyRevenue),
          unreadNotifications: unreadNotifications || 0,
          pendingApplications: pendingApplications || 0,
          totalUsers: totalUsers || 0,
        })
      } catch (err: any) {
        setError(err.message)
        console.error('Erreur récupération KPIs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchKPIs()
  }, [])

  return { kpis, loading, error }
}

