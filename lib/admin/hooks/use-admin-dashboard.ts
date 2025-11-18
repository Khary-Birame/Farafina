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
        const { count: totalPlayers, error: playersError } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })

        if (playersError) {
          console.error('Erreur récupération total joueurs:', {
            message: playersError.message,
            code: playersError.code,
            details: playersError.details,
          })
        }

        // Joueurs actifs
        const { count: activePlayers, error: activeError } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')

        if (activeError) {
          console.error('Erreur récupération joueurs actifs:', {
            message: activeError.message,
            code: activeError.code,
          })
        }

        // Joueurs inactifs
        const { count: inactivePlayers, error: inactiveError } = await supabase
          .from('players')
          .select('*', { count: 'exact', head: true })
          .in('status', ['inactive', 'transferred'])

        if (inactiveError) {
          console.error('Erreur récupération joueurs inactifs:', {
            message: inactiveError.message,
            code: inactiveError.code,
          })
        }

        // Paiements en attente (orders avec payment_status = 'pending')
        const { count: pendingPayments, error: paymentsError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('payment_status', 'pending')

        if (paymentsError) {
          console.error('Erreur récupération paiements en attente:', {
            message: paymentsError.message,
            code: paymentsError.code,
          })
        }

        // Revenus mensuels (orders complétées ce mois)
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        
        const { data: monthlyOrders, error: revenueError } = await supabase
          .from('orders')
          .select('total')
          .eq('payment_status', 'paid')
          .gte('created_at', startOfMonth)

        if (revenueError) {
          console.error('Erreur récupération revenus mensuels:', {
            message: revenueError.message,
            code: revenueError.code,
          })
        }

        const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0

        // Notifications non lues
        const { count: unreadNotifications, error: notificationsError } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('read', false)

        if (notificationsError) {
          console.error('Erreur récupération notifications:', {
            message: notificationsError.message,
            code: notificationsError.code,
          })
        }

        // Candidatures en attente
        const { count: pendingApplications, error: applicationsError } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('form_type', 'application')
          .eq('status', 'pending')

        if (applicationsError) {
          console.error('Erreur récupération candidatures:', {
            message: applicationsError.message,
            code: applicationsError.code,
          })
        }

        // Total utilisateurs
        const { count: totalUsers, error: usersError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })

        if (usersError) {
          console.error('Erreur récupération utilisateurs:', {
            message: usersError.message,
            code: usersError.code,
          })
        }

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
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des KPIs'
        setError(errorMessage)
        console.error('Erreur récupération KPIs:', {
          message: err?.message,
          code: err?.code,
          details: err?.details,
          stack: err?.stack,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchKPIs()
  }, [])

  return { kpis, loading, error }
}
