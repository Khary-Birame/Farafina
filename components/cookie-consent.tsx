"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, X, Settings } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            setIsOpen(true)
        }
    }, [])

    const acceptAll = () => {
        localStorage.setItem("cookie-consent", JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        }))
        setIsOpen(false)
    }

    const acceptNecessary = () => {
        localStorage.setItem("cookie-consent", JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        }))
        setIsOpen(false)
    }

    const saveSettings = (settings: { necessary: boolean; analytics: boolean; marketing: boolean }) => {
        localStorage.setItem("cookie-consent", JSON.stringify({
            ...settings,
            timestamp: new Date().toISOString(),
        }))
        setIsOpen(false)
        setShowSettings(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
            <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-[#D4AF37]/30 bg-white">
                <CardContent className="p-6">
                    {!showSettings ? (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/30">
                                <Cookie className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">Gestion des Cookies</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
                                    En continuant, vous acceptez notre utilisation des cookies.{" "}
                                    <Link href="/privacy" className="text-[#D4AF37] hover:underline">
                                        En savoir plus
                                    </Link>
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Button
                                        onClick={acceptAll}
                                        className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                                        size="sm"
                                    >
                                        Tout Accepter
                                    </Button>
                                    <Button
                                        onClick={acceptNecessary}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Accepter le Nécessaire
                                    </Button>
                                    <Button
                                        onClick={() => setShowSettings(true)}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Personnaliser
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="flex-shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Paramètres des Cookies</h3>
                            <div className="space-y-4 mb-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Cookies Nécessaires</div>
                                        <div className="text-sm text-muted-foreground">
                                            Essentiels au fonctionnement du site
                                        </div>
                                    </div>
                                    <input type="checkbox" defaultChecked disabled className="w-5 h-5" />
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Cookies Analytiques</div>
                                        <div className="text-sm text-muted-foreground">
                                            Nous aident à comprendre comment vous utilisez le site
                                        </div>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" id="analytics" />
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Cookies Marketing</div>
                                        <div className="text-sm text-muted-foreground">
                                            Utilisés pour la publicité personnalisée
                                        </div>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5" id="marketing" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => {
                                        const analytics = (document.getElementById("analytics") as HTMLInputElement)?.checked
                                        const marketing = (document.getElementById("marketing") as HTMLInputElement)?.checked
                                        saveSettings({ necessary: true, analytics: analytics || false, marketing: marketing || false })
                                    }}
                                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                                    size="sm"
                                >
                                    Enregistrer les Préférences
                                </Button>
                                <Button
                                    onClick={() => setShowSettings(false)}
                                    variant="outline"
                                    size="sm"
                                >
                                    Retour
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

