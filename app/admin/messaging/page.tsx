"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Search, Filter, Bell, AlertCircle, Info } from "lucide-react"
import { useState } from "react"
import { useAdminMessaging } from "@/lib/admin/hooks/use-admin-messaging"
import { toast } from "sonner"

export default function MessagingNotificationsPage() {
  const { messages, notifications, loading, error } = useAdminMessaging()
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null)
  const [replyText, setReplyText] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  
  const handleNewMessage = () => {
    toast.info("Nouveau message", {
      description: "La création de nouveaux messages sera bientôt disponible.",
    })
  }
  
  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("Message vide", {
        description: "Veuillez saisir un message avant d'envoyer.",
      })
      return
    }
    
    if (!selectedMessage) {
      toast.error("Aucun message sélectionné", {
        description: "Veuillez sélectionner un message pour répondre.",
      })
      return
    }
    
    toast.success("Message envoyé", {
      description: `Réponse envoyée à ${selectedMessage.from}`,
    })
    setReplyText("")
    // TODO: Implémenter l'envoi réel du message
  }
  
  const handleFilter = () => {
    setShowFilters(!showFilters)
    toast.info("Filtres", {
      description: showFilters ? "Filtres masqués" : "Filtres affichés",
    })
  }

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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F9FAFB]"
                    onClick={handleFilter}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                    onClick={handleNewMessage}
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
              {loading ? (
                <div className="py-12 text-center">
                  <p className="text-[#737373]">Chargement des messages...</p>
                </div>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-red-600 mb-2">Erreur: {error}</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[#737373] mb-4">Aucun message trouvé</p>
                </div>
              ) : (
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
              )}
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
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button 
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                    onClick={handleSendReply}
                  >
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
              {loading ? (
                <div className="py-12 text-center">
                  <p className="text-[#737373]">Chargement des notifications...</p>
                </div>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-red-600 mb-2">Erreur: {error}</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[#737373] mb-4">Aucune notification</p>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

