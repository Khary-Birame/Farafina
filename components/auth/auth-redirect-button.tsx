"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ArrowRight, LogIn } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface AuthRedirectButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  showIcon?: boolean
  redirectMessage?: string
}

/**
 * Composant bouton qui redirige intelligemment :
 * - Si l'utilisateur est connecté : redirige directement vers la destination
 * - Si l'utilisateur n'est pas connecté : affiche un message clair et redirige vers login avec redirection
 */
export function AuthRedirectButton({
  href,
  children,
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  redirectMessage = "Vous devez vous connecter pour accéder au formulaire de candidature.",
}: AuthRedirectButtonProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (loading) {
      return // Attendre que le chargement soit terminé
    }

    if (!user) {
      // Utilisateur non connecté : afficher un message clair et rediriger vers login
      toast.info("Connexion requise", {
        description: redirectMessage,
        duration: 5000,
      })
      
      // Rediriger vers login avec le paramètre redirect
      const loginUrl = `/login?redirect=${encodeURIComponent(href)}`
      router.push(loginUrl)
      return
    }

    // Utilisateur connecté : rediriger directement
    setIsNavigating(true)
    router.push(href)
  }

  // Si l'utilisateur est connecté, utiliser un Link normal pour une meilleure UX
  if (user && !loading) {
    return (
      <Link href={href} className="inline-block">
        <Button
          size={size}
          variant={variant}
          className={className}
          disabled={isNavigating}
        >
          {children}
          {showIcon && <ArrowRight size={20} className="ml-2" />}
        </Button>
      </Link>
    )
  }

  // Si l'utilisateur n'est pas connecté, afficher un bouton avec message
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={loading || isNavigating}
    >
      {children}
      {showIcon && <LogIn size={20} className="ml-2" />}
    </Button>
  )
}

