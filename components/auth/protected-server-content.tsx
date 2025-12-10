"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedServerContentProps {
  children: React.ReactNode
}

/**
 * Composant wrapper pour protéger le contenu des pages serveur
 * 
 * Ce composant doit être utilisé dans les pages serveur (async) pour vérifier
 * l'authentification côté client et rediriger si nécessaire.
 */
export function ProtectedServerContent({ children }: ProtectedServerContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Attendre que le chargement de l'authentification soit terminé
    if (loading) {
      return
    }

    // Si l'utilisateur n'est pas connecté, rediriger vers login avec redirect
    if (!user) {
      const currentUrl = pathname + (typeof window !== "undefined" ? window.location.search : "")
      const encodedUrl = encodeURIComponent(currentUrl)
      router.push(`/login?redirect=${encodedUrl}`)
    }
  }, [user, loading, router, pathname])

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher (la redirection est en cours)
  if (!user) {
    return null
  }

  // Si l'utilisateur est connecté, afficher le contenu
  return <>{children}</>
}

