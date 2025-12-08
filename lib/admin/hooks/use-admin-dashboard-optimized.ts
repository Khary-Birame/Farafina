"use client"

import { useState, useEffect, useMemo } from 'react'
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
  // Nouveaux KPIs
  retentionRate: number // Taux de rétention
  conversionRate: number // Taux de conversion candidatures
  arpu: number // Average Revenue Per User
  averageAttendance: number // Taux d'assiduité moyen
  responseTime: number // Temps de réponse moyen (en heures)
  growthRate: number // Taux de croissance MoM
}

interface CacheEntry {
  data: DashboardKPIs
  timestamp: number
}

// Cache simple en mémoire (remplace SWR pour l'instant)
const cache: Map<string, CacheEntry> = new Map()
const CACHE_DURATION = 60000 // 60 secondes (augmenté pour réduire les requêtes)

function getCachedData(key: string): DashboardKPIs | null {
  const entry = cache.get(key)
  if (!entry) return null
  
  const now = Date.now()
  if (now - entry.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }
  
  return entry.data
}

function setCachedData(key: string, data: DashboardKPIs) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export function useAdminDashboardOptimized() {
  const [kpis, setKpis] = useState<DashboardKPIs>({
    totalPlayers: 0,
    activePlayers: 0,
    inactivePlayers: 0,
    pendingPayments: 0,
    monthlyRevenue: 0,
    unreadNotifications: 0,
    pendingApplications: 0,
    totalUsers: 0,
    retentionRate: 0,
    conversionRate: 0,
    arpu: 0,
    averageAttendance: 0,
    responseTime: 0,
    growthRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    async function fetchKPIs() {
      // Vérifier le cache
      const cached = getCachedData('dashboard-kpis')
      if (cached) {
        if (isMounted) {
          setKpis(cached)
          setLoading(false)
        }
        // Revalider en arrière-plan
        timeoutId = setTimeout(() => {
          fetchKPIsFresh()
        }, 1000)
        return
      }

      await fetchKPIsFresh()
    }

    async function fetchKPIsFresh() {
      try {
        // Paralléliser toutes les requêtes
        const [
          playersResult,
          activePlayersResult,
          inactivePlayersResult,
          pendingPaymentsResult,
          monthlyOrdersResult,
          unreadNotificationsResult,
          pendingApplicationsResult,
          totalUsersResult,
        ] = await Promise.all([
          supabase.from('players').select('*', { count: 'exact', head: true }),
          supabase.from('players').select('*', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('players').select('*', { count: 'exact', head: true }).in('status', ['inactive', 'transferred']),
          supabase.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'pending'),
          (async () => {
            const now = new Date()
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
            return supabase
              .from('orders')
              .select('total, created_at')
              .eq('payment_status', 'paid')
              .gte('created_at', startOfMonth)
          })(),
          supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('read', false),
          supabase.from('form_submissions').select('*', { count: 'exact', head: true }).eq('form_type', 'application').eq('status', 'pending'),
          supabase.from('users').select('*', { count: 'exact', head: true }),
        ])

        // Calculer les revenus mensuels
        const monthlyRevenue = monthlyOrdersResult.data?.reduce(
          (sum, order) => sum + (Number(order.total) || 0),
          0
        ) || 0

        // Calculer les nouveaux KPIs
        const totalPlayers = playersResult.count || 0
        const activePlayers = activePlayersResult.count || 0
        const inactivePlayers = inactivePlayersResult.count || 0
        const totalUsers = totalUsersResult.count || 0
        const pendingApplications = pendingApplicationsResult.count || 0

        // Taux de rétention = (actifs / total) * 100
        const retentionRate = totalPlayers > 0 
          ? Math.round((activePlayers / totalPlayers) * 100) 
          : 0

        // Paralléliser toutes les requêtes supplémentaires
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString()
        const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString()

        // Fonction helper pour gérer les erreurs de requête training_attendance
        const getAttendanceData = async () => {
          try {
            const result = await supabase.from('training_attendance').select('attended').limit(500)
            return result
          } catch (error) {
            // Table peut ne pas exister
            return { data: null, error: null }
          }
        }

        const [
          totalApplicationsResult,
          acceptedApplicationsResult,
          attendanceDataResult,
          lastMonthOrdersResult,
        ] = await Promise.all([
          supabase.from('form_submissions').select('*', { count: 'exact', head: true }).eq('form_type', 'application'),
          supabase.from('form_submissions').select('*', { count: 'exact', head: true }).eq('form_type', 'application').eq('status', 'accepted'),
          getAttendanceData(),
          supabase.from('orders').select('total').eq('payment_status', 'paid').gte('created_at', startOfLastMonth).lte('created_at', endOfLastMonth),
        ])

        // Taux de conversion
        const totalApplications = totalApplicationsResult.count || 0
        const acceptedApplications = acceptedApplicationsResult.count || 0
        const conversionRate = totalApplications > 0
          ? Math.round((acceptedApplications / totalApplications) * 100)
          : 0

        // ARPU = Revenus mensuels / Nombre de joueurs actifs
        const arpu = activePlayers > 0
          ? Math.round(monthlyRevenue / activePlayers)
          : 0

        // Taux d'assiduité moyen (limité à 500 enregistrements pour performance)
        let averageAttendance = 0
        if (attendanceDataResult.data && attendanceDataResult.data.length > 0) {
          const attended = attendanceDataResult.data.filter((a: any) => a.attended).length
          averageAttendance = Math.round((attended / attendanceDataResult.data.length) * 100)
        }

        // Taux de croissance MoM
        const lastMonthRevenue = lastMonthOrdersResult.data?.reduce(
          (sum, order) => sum + (Number(order.total) || 0),
          0
        ) || 0

        const growthRate = lastMonthRevenue > 0
          ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
          : 0

        const newKpis: DashboardKPIs = {
          totalPlayers,
          activePlayers,
          inactivePlayers,
          pendingPayments: pendingPaymentsResult.count || 0,
          monthlyRevenue: Math.round(monthlyRevenue),
          unreadNotifications: unreadNotificationsResult.count || 0,
          pendingApplications,
          totalUsers,
          retentionRate,
          conversionRate,
          arpu,
          averageAttendance,
          responseTime: 24, // Placeholder - à calculer depuis les données réelles
          growthRate,
        }

        // Mettre en cache
        setCachedData('dashboard-kpis', newKpis)

        if (isMounted) {
          setKpis(newKpis)
          setError(null)
        }
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des KPIs'
        if (isMounted) {
          setError(errorMessage)
        }
        console.error('Erreur récupération KPIs:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchKPIs()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Revalider toutes les 30 secondes (optionnel - peut être désactivé)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     cache.delete('dashboard-kpis') // Invalider le cache
  //   }, 30000)
  //   return () => clearInterval(interval)
  // }, [])

  return { kpis, loading, error }
}

// Fonction helper pour fetch (peut être utilisée avec SWR plus tard)
async function fetchKPIs() {
  // Même logique que ci-dessus mais retourne directement les données
  // Utile pour SWR
  return {} as DashboardKPIs
}

