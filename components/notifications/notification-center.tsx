"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Bell,
    Check,
    X,
    Settings,
    Mail,
    MessageSquare,
    CreditCard,
    Award,
    Calendar,
    AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
    id: string
    type: "info" | "success" | "warning" | "error"
    title: string
    message: string
    time: string
    read: boolean
    icon?: React.ReactNode
}

const notifications: Notification[] = [
    {
        id: "1",
        type: "success",
        title: "Paiement reçu",
        message: "Votre paiement de 2 500 000 XOF a été confirmé",
        time: "Il y a 5 min",
        read: false,
        icon: <CreditCard className="w-4 h-4" />,
    },
    {
        id: "2",
        type: "info",
        title: "Nouveau message",
        message: "Vous avez reçu un message de Coach Mamadou",
        time: "Il y a 1h",
        read: false,
        icon: <MessageSquare className="w-4 h-4" />,
    },
    {
        id: "3",
        type: "success",
        title: "Résultats disponibles",
        message: "Vos résultats d'examen sont maintenant disponibles",
        time: "Il y a 3h",
        read: true,
        icon: <Award className="w-4 h-4" />,
    },
    {
        id: "4",
        type: "info",
        title: "Événement à venir",
        message: "Match amical prévu demain à 15h",
        time: "Il y a 5h",
        read: true,
        icon: <Calendar className="w-4 h-4" />,
    },
]

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifs, setNotifs] = useState(notifications)

    const unreadCount = notifs.filter((n) => !n.read).length

    const markAsRead = (id: string) => {
        setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    const markAllAsRead = () => {
        setNotifs(notifs.map((n) => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifs(notifs.filter((n) => n.id !== id))
    }

    const getTypeStyles = (type: string) => {
        switch (type) {
            case "success":
                return "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30"
            case "warning":
                return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
            case "error":
                return "bg-red-500/20 text-red-600 border-red-500/30"
            default:
                return "bg-blue-500/20 text-blue-600 border-blue-500/30"
        }
    }

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
            >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-white text-xs">
                        {unreadCount}
                    </Badge>
                )}
            </Button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <Card className="absolute right-0 top-12 w-96 max-h-[600px] z-50 shadow-xl bg-white border-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-lg">Notifications</CardTitle>
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="text-xs"
                                    >
                                        Tout marquer comme lu
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[500px] overflow-y-auto">
                                {notifs.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Aucune notification</p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {notifs.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={cn(
                                                    "p-4 hover:bg-muted transition-colors",
                                                    !notification.read && "bg-[#D4AF37]/10"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={cn(
                                                            "w-10 h-10 rounded-lg flex items-center justify-center border",
                                                            getTypeStyles(notification.type)
                                                        )}
                                                    >
                                                        {notification.icon || (
                                                            <AlertCircle className="w-5 h-5" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1">
                                                                <div className="font-semibold text-sm mb-1">
                                                                    {notification.title}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground mb-1">
                                                                    {notification.message}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {notification.time}
                                                                </div>
                                                            </div>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 mt-1" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => markAsRead(notification.id)}
                                                                className="h-7 text-xs"
                                                            >
                                                                <Check className="w-3 h-3 mr-1" />
                                                                Marquer comme lu
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className="h-7 text-xs"
                                                            >
                                                                <X className="w-3 h-3 mr-1" />
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}

