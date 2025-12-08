/**
 * Contexte d'authentification
 * 
 * Ce fichier crée un contexte React pour gérer l'état d'authentification
 * globalement dans l'application.
 */

"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "./auth-helpers"

// Type pour l'utilisateur (depuis la table users)
type User = {
  id: string
  email: string
  role: "player" | "parent" | "coach" | "club" | "admin"
  first_name?: string | null
  last_name?: string | null
  avatar_url?: string | null
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isInitializedRef = React.useRef(false)
  const loadingRef = React.useRef(true)

  const refreshUser = async () => {
    try {
      setLoading(true)
      // Vérifier d'abord la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Erreur de session:", sessionError)
        setUser(null)
        setLoading(false)
        return
      }

      if (!session) {
        setUser(null)
        setLoading(false)
        return
      }

      // Récupérer l'utilisateur
      const currentUser = await getCurrentUser()
      setUser(currentUser as User | null)
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de l'utilisateur:", error)
      // En cas d'erreur, essayer quand même de récupérer la session de base
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user as User | null)
        } else {
          setUser(null)
        }
      } catch (fallbackError) {
        console.error("Erreur fallback:", fallbackError)
        setUser(null)
      }
    } finally {
      // TOUJOURS mettre loading à false, même en cas d'erreur
      setLoading(false)
    }
  }

  useEffect(() => {
    // Éviter les initialisations multiples
    if (isInitializedRef.current) {
      return
    }
    isInitializedRef.current = true

    let isMounted = true
    loadingRef.current = true

    // Timeout de sécurité pour éviter que loading reste à true indéfiniment
    const safetyTimeout = setTimeout(() => {
      if (isMounted && loadingRef.current) {
        console.warn("Auth loading timeout - forcing loading to false")
        setLoading(false)
        loadingRef.current = false
      }
    }, 5000) // 5 secondes max

    // Récupérer l'utilisateur initial
    refreshUser().finally(() => {
      if (isMounted) {
        loadingRef.current = false
        clearTimeout(safetyTimeout)
      }
    })

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Session présente" : "Pas de session")

      if (!isMounted) return

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        // Attendre un peu pour que les cookies soient synchronisés
        await new Promise(resolve => setTimeout(resolve, 100))
        const currentUser = await getCurrentUser()
        if (isMounted) {
          setUser(currentUser as User | null)
          setLoading(false)
        }
      } else if (event === "SIGNED_OUT") {
        if (isMounted) {
          setUser(null)
          setLoading(false)
        }
      } else if (event === "USER_UPDATED") {
        const currentUser = await getCurrentUser()
        if (isMounted) {
          setUser(currentUser as User | null)
        }
      } else {
        // Pour les autres événements, vérifier la session
        if (session) {
          const currentUser = await getCurrentUser()
          if (isMounted) {
            setUser(currentUser as User | null)
          }
        } else {
          if (isMounted) {
            setUser(null)
          }
        }
        if (isMounted) {
          setLoading(false)
        }
      }
    })

    return () => {
      isMounted = false
      clearTimeout(safetyTimeout)
      subscription.unsubscribe()
      isInitializedRef.current = false
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook pour utiliser le contexte d'authentification
 * 
 * @returns Contexte d'authentification
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

