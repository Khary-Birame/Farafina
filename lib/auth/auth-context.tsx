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

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser as User | null)
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de l'utilisateur:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Récupérer l'utilisateur initial
    refreshUser()

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const currentUser = await getCurrentUser()
        setUser(currentUser as User | null)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
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

