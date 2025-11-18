"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface OrderRow {
  id: string
  etudiant: string
  montant: number
  devise: string
  statut: string
  date: string
  methode: string
  order_number: string
}

export function useAdminOrders(filters?: {
  status?: string
  payment_status?: string
  search?: string
}) {
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        let query = supabase
          .from('orders')
          .select(`
            id,
            order_number,
            total,
            currency,
            payment_status,
            payment_method,
            status,
            created_at,
            user_id,
            users!inner(first_name, last_name, email)
          `)
          .order('created_at', { ascending: false })

        // Appliquer les filtres
        if (filters?.status) {
          query = query.eq('status', filters.status)
        }
        if (filters?.payment_status) {
          query = query.eq('payment_status', filters.payment_status)
        }
        if (filters?.search) {
          query = query.or(
            `order_number.ilike.%${filters.search}%,users.first_name.ilike.%${filters.search}%,users.last_name.ilike.%${filters.search}%`
          )
        }

        const { data, error: queryError } = await query

        if (queryError) throw queryError

        // Formater les données
        const formattedOrders: OrderRow[] = (data || []).map((order: any) => {
          const user = order.users
          const userName = user 
            ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email
            : 'Invité'

          return {
            id: order.id,
            etudiant: userName,
            montant: Number(order.total) || 0,
            devise: order.currency || 'XOF',
            statut: order.payment_status === 'paid' ? 'Complété' :
                   order.payment_status === 'pending' ? 'En attente' :
                   order.payment_status === 'failed' ? 'Échoué' :
                   order.payment_status === 'refunded' ? 'Remboursé' : 'En attente',
            date: new Date(order.created_at).toISOString().split('T')[0],
            methode: order.payment_method 
              ? order.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
              : 'Non spécifié',
            order_number: order.order_number,
          }
        })

        setOrders(formattedOrders)
      } catch (err: any) {
        setError(err.message)
        console.error('Erreur récupération commandes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [filters])

  return { orders, loading, error }
}

