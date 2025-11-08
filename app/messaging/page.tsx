"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField } from "@/components/ui/form-field"
import { useState } from "react"
import { 
  MessageSquare, 
  Send, 
  Search, 
  Users, 
  Bell, 
  BellOff,
  Paperclip,
  Smile,
  Video,
  Phone,
  MoreOrical
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Données de démonstration
const conversations = [
  {
    id: 1,
    name: "Coach Mamadou Dieng",
    role: "Entraîneur Principal",
    avatar: "/coach-mamadou-dieng.jpg",
    lastMessage: "L'entraînement de demain est reporté à 14h",
    time: "Il y a 2h",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Dr. Aminata Sow",
    role: "Directrice Académique",
    avatar: "/dr-aminata-sow.jpg",
    lastMessage: "Les résultats des examens sont disponibles",
    time: "Il y a 5h",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Équipe Administrative",
    role: "Support",
    avatar: null,
    lastMessage: "Votre paiement a été reçu avec succès",
    time: "Hier",
    unread: 0,
    online: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "Coach Mamadou Dieng",
    content: "Bonjour, j'espère que vous allez bien. L'entraînement de demain est reporté à 14h au lieu de 10h.",
    time: "14:30",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Vous",
    content: "D'accord, merci pour l'information. Je serai présent à 14h.",
    time: "14:32",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Coach Mamadou Dieng",
    content: "Parfait. N'oubliez pas d'apporter votre équipement complet.",
    time: "14:33",
    isOwn: false,
  },
]

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [message, setMessage] = useState("")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleSendMessage = () => {
    if (!message.trim()) return
    // TODO: Envoyer le message
    console.log("Message envoyé:", message)
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-2">
                Messagerie
              </h1>
              <p className="text-muted-foreground">
                Communiquez avec les coachs, administrateurs et autres membres
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              {notificationsEnabled ? (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications activées
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4 mr-2" />
                  Notifications désactivées
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
            {/* Left Sidebar - Conversations */}
            <Card className="lg:col-span-1 flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher une conversation..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${
                        selectedConversation.id === conversation.id
                          ? "bg-[#D4AF37]/10 border-l-4 border-l-[#D4AF37]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-sm truncate">
                              {conversation.name}
                            </div>
                            {conversation.unread > 0 && (
                              <Badge className="bg-[#D4AF37] text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {conversation.time}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Chat */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>
                        {selectedConversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{selectedConversation.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedConversation.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreOrical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.isOwn
                            ? "bg-[#D4AF37] text-white"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {!msg.isOwn && (
                          <div className="text-xs font-medium mb-1 opacity-80">
                            {msg.sender}
                          </div>
                        )}
                        <div className="text-sm">{msg.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            msg.isOwn ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <TextareaField
                        label=""
                        name="message"
                        placeholder="Tapez votre message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={2}
                        className="mb-0"
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

