"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface Message {
  id: string
  from: string
  to: string
  subject: string
  message: string
  date: string
  type: 'urgent' | 'info' | 'system'
  read: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  type: 'urgent' | 'success' | 'warning' | 'info'
  read: boolean
}

export function useAdminMessaging() {
  const [messages, setMessages] = useState<Message[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function fetchMessagingData() {
      try {
        setLoading(true)
        setError(null)

        // Récupérer les messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('id, content, created_at, read, message_type, sender_id, receiver_id')
          .order('created_at', { ascending: false })
          .limit(50)

        if (messagesError) {
          console.error('Erreur récupération messages:', messagesError)
        }

        // Récupérer les utilisateurs (expéditeurs et destinataires)
        const userIds = new Set<string>()
        if (messagesData) {
          messagesData.forEach((msg: any) => {
            if (msg.sender_id) userIds.add(msg.sender_id)
            if (msg.receiver_id) userIds.add(msg.receiver_id)
          })
        }

        let usersMap: Record<string, { first_name: string; last_name: string; email: string }> = {}
        if (userIds.size > 0) {
          const { data: usersData } = await supabase
            .from('users')
            .select('id, first_name, last_name, email')
            .in('id', Array.from(userIds))
          
          if (usersData) {
            usersData.forEach((user: any) => {
              usersMap[user.id] = {
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
              }
            })
          }
        }

        // Formater les messages
        const formattedMessages: Message[] = (messagesData || []).map((msg: any) => {
          const sender = usersMap[msg.sender_id]
          const receiver = usersMap[msg.receiver_id]
          
          const senderName = sender
            ? `${sender.first_name || ''} ${sender.last_name || ''}`.trim() || sender.email || 'Inconnu'
            : 'Inconnu'
          
          const receiverName = receiver
            ? `${receiver.first_name || ''} ${receiver.last_name || ''}`.trim() || receiver.email || 'Inconnu'
            : 'Inconnu'

          // Extraire le sujet et le message du contenu
          const content = msg.content || ''
          const lines = content.split('\n')
          const subject = lines[0] || 'Sans sujet'
          const message = lines.slice(1).join('\n') || content

          // Déterminer le type
          let type: 'urgent' | 'info' | 'system' = 'info'
          if (msg.message_type === 'system') {
            type = 'system'
          } else if (content.toLowerCase().includes('urgent') || content.toLowerCase().includes('urgent')) {
            type = 'urgent'
          }

          return {
            id: msg.id,
            from: senderName,
            to: receiverName,
            subject,
            message,
            date: new Date(msg.created_at).toLocaleString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            type,
            read: msg.read || false,
          }
        })

        // Récupérer les notifications
        const { data: currentUser } = await supabase.auth.getUser()
        let notificationsData: any[] = []
        
        if (currentUser?.user) {
          const { data, error: notificationsError } = await supabase
            .from('notifications')
            .select('id, title, message, created_at, type, read')
            .eq('user_id', currentUser.user.id)
            .order('created_at', { ascending: false })
            .limit(20)

          if (notificationsError) {
            console.error('Erreur récupération notifications:', notificationsError)
          } else {
            notificationsData = data || []
          }
        }

        // Formater les notifications
        const formattedNotifications: Notification[] = notificationsData.map((notif: any) => {
          // Calculer le temps relatif
          const now = new Date()
          const notifDate = new Date(notif.created_at)
          const diffMs = now.getTime() - notifDate.getTime()
          const diffMins = Math.floor(diffMs / 60000)
          const diffHours = Math.floor(diffMs / 3600000)
          const diffDays = Math.floor(diffMs / 86400000)

          let dateDisplay = 'À l\'instant'
          if (diffMins < 1) {
            dateDisplay = 'À l\'instant'
          } else if (diffMins < 60) {
            dateDisplay = `Il y a ${diffMins} min`
          } else if (diffHours < 24) {
            dateDisplay = `Il y a ${diffHours}h`
          } else if (diffDays === 1) {
            dateDisplay = 'Hier'
          } else if (diffDays < 7) {
            dateDisplay = `Il y a ${diffDays}j`
          } else {
            dateDisplay = notifDate.toLocaleDateString('fr-FR')
          }

          return {
            id: notif.id,
            title: notif.title || 'Notification',
            message: notif.message || '',
            date: dateDisplay,
            type: (notif.type || 'info') as 'urgent' | 'success' | 'warning' | 'info',
            read: notif.read || false,
          }
        })

        setMessages(formattedMessages)
        setNotifications(formattedNotifications)
        setHasLoaded(true)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.message || 'Erreur inconnue lors de la récupération des messages'
        setError(errorMessage)
        setHasLoaded(false)
        console.error('Erreur récupération messages:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessagingData()
  }, [])

  return { messages, notifications, loading, error, hasLoaded }
}

