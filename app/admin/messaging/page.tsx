"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Search, Filter, Bell, AlertCircle, Info } from "lucide-react"
import { useState } from "react"

// Données de démonstration
const messages = [
  {
    id: 1,
    from: "Moussa Ndiaye",
    to: "Admin",
    subject: "Absence joueur U16",
    message: "Amadou Diallo sera absent à l'entraînement de demain.",
    date: "2025-01-19 10:30",
    type: "urgent",
    read: false,
  },
  {
    id: 2,
    from: "Parent - Fatou Sarr",
    to: "Coach",
    subject: "Question sur la progression",
    message: "Bonjour, je souhaiterais avoir un rendez-vous pour discuter de la progression de ma fille.",
    date: "2025-01-19 09:15",
    type: "info",
    read: true,
  },
  {
    id: 3,
    from: "Système",
    to: "Tous",
    subject: "Mise à jour système",
    message: "Une nouvelle mise à jour du système est disponible.",
    date: "2025-01-18 16:45",
    type: "system",
    read: true,
  },
]

const notifications = [
  {
    id: 1,
    title: "Nouvelle candidature",
    message: "Amadou Diallo a soumis sa candidature",
    date: "Il y a 5 min",
    type: "info",
    read: false,
  },
  {
    id: 2,
    title: "Paiement reçu",
    message: "Fatou Sarr - 1 800 000 XOF",
    date: "Il y a 1h",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "Match à venir",
    message: "U16 vs ASC Diaraf - Demain 15h",
    date: "Il y a 2h",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "Blessure signalée",
    message: "Ibrahim Koné - Blessure à la cheville",
    date: "Il y a 3h",
    type: "urgent",
    read: false,
  },
]

export default function MessagingNotificationsPage() {
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null)

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Messagerie & Notifications</h1>
        <p className="text-[#737373]">Communication interne et notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#1A1A1A] font-semibold">Messages</CardTitle>
                  <CardDescription className="text-[#737373]">Communication interne</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Nouveau Message
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                <Input
                  type="search"
                  placeholder="Rechercher un message..."
                  className="pl-10 bg-white border-[#E5E7EB] shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                />
              </div>

              {/* Messages */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors shadow-sm ${
                      selectedMessage?.id === msg.id
                        ? "bg-[#D4AF37]/10 border-[#D4AF37]"
                        : "bg-white border-[#E5E7EB] hover:bg-[#F9FAFB]"
                    } ${!msg.read ? "border-l-4 border-l-[#D4AF37]" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1A1A1A]">{msg.from}</span>
                          <Badge
                            className={
                              msg.type === "urgent"
                                ? "bg-[#E8C966] text-white"
                                : msg.type === "system"
                                ? "bg-[#C0C0C0] text-white"
                                : "bg-[#D4AF37] text-white"
                            }
                          >
                            {msg.type === "urgent"
                              ? "Urgent"
                              : msg.type === "system"
                              ? "Système"
                              : "Info"}
                          </Badge>
                        </div>
                        <div className="font-medium text-[#1A1A1A] mb-1">{msg.subject}</div>
                        <div className="text-sm text-[#737373] line-clamp-2">{msg.message}</div>
                      </div>
                      <div className="text-xs text-[#737373] whitespace-nowrap ml-4">
                        {msg.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Detail */}
          {selectedMessage && (
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] font-semibold">{selectedMessage.subject}</CardTitle>
                <CardDescription>
                  De: {selectedMessage.from} • À: {selectedMessage.to} • {selectedMessage.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-[#F5F5F5] rounded-lg text-[#1A1A1A]">
                  {selectedMessage.message}
                </div>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Répondre au message..."
                    className="min-h-[100px] border-[#E5E7EB] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 shadow-sm"
                  />
                  <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Notifications */}
        <div>
          <Card className="bg-white shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#1A1A1A] font-semibold">Notifications</CardTitle>
                <Badge className="bg-[#D4AF37] text-white">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 border rounded-lg transition-colors shadow-sm ${
                      !notif.read
                        ? "bg-[#D4AF37]/5 border-[#D4AF37]/30"
                        : "bg-white border-[#E5E7EB]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          notif.type === "urgent"
                            ? "bg-red-500/10"
                            : notif.type === "success"
                            ? "bg-green-500/10"
                            : notif.type === "warning"
                            ? "bg-yellow-500/10"
                            : "bg-blue-500/10"
                        }`}
                      >
                        {notif.type === "urgent" ? (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        ) : notif.type === "warning" ? (
                          <Bell className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <Info className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#1A1A1A] mb-1">
                          {notif.title}
                        </div>
                        <div className="text-xs text-[#737373] mb-1">{notif.message}</div>
                        <div className="text-xs text-[#737373]">{notif.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

