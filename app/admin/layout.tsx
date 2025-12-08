"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { checkAdminAccess } from "@/lib/admin/auth/admin-auth"
import { useAuth } from "@/lib/auth/auth-context"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading: authLoading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()
  const hasCheckedRef = useRef(false)
  const isRedirectingRef = useRef(false)

  useEffect(() => {
    // Éviter les vérifications multiples en parallèle
    if (hasCheckedRef.current || isRedirectingRef.current) {
      return
    }

    let timeoutId: NodeJS.Timeout | null = null
    let safetyTimeoutId: NodeJS.Timeout | null = null

    // Timeout de sécurité pour éviter que isChecking reste à true indéfiniment
    safetyTimeoutId = setTimeout(() => {
      console.warn("Admin check timeout - forcing check to complete")
      setIsChecking(false)
      if (!isAuthorized && !isRedirectingRef.current) {
        isRedirectingRef.current = true
        router.push("/login?redirect=/admin&message=admin_required")
      }
    }, 10000) // 10 secondes max

    async function verifyAdminAccess() {
      // Attendre que l'auth soit chargée (max 3 secondes)
      if (authLoading) {
        console.log("Auth en cours de chargement, attente...")
        timeoutId = setTimeout(() => {
          console.warn("Auth loading taking too long, proceeding anyway")
          hasCheckedRef.current = false // Réinitialiser pour permettre la vérification
          verifyAdminAccess()
        }, 3000)
        return
      }

      // Marquer qu'on a commencé la vérification
      hasCheckedRef.current = true

      try {
        console.log("Vérification admin - user:", user ? "présent" : "absent", "authLoading:", authLoading)

        // Vérifier d'abord si l'utilisateur est connecté
        if (!user) {
          console.log("Pas d'utilisateur connecté, redirection vers login")
          setIsAuthorized(false)
          setIsChecking(false)
          if (safetyTimeoutId) clearTimeout(safetyTimeoutId)
          if (!isRedirectingRef.current) {
            isRedirectingRef.current = true
            router.push("/login?redirect=/admin&message=admin_required")
          }
          return
        }

        console.log("Vérification des droits admin pour:", user.email)
        // Vérifier les droits admin
        const { isAdmin, error } = await checkAdminAccess()

        if (safetyTimeoutId) clearTimeout(safetyTimeoutId)

        if (error) {
          console.error("Erreur vérification admin:", error)
          setIsAuthorized(false)
          setIsChecking(false)
          if (!isRedirectingRef.current) {
            isRedirectingRef.current = true
            router.push("/login?redirect=/admin&message=admin_required")
          }
        } else if (isAdmin) {
          console.log("Accès admin autorisé")
          setIsAuthorized(true)
          setIsChecking(false)
        } else {
          console.log("Accès admin refusé - rôle:", user.role)
          setIsAuthorized(false)
          setIsChecking(false)
          if (!isRedirectingRef.current) {
            isRedirectingRef.current = true
            router.push("/login?redirect=/admin&message=admin_required")
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification admin:", error)
        if (safetyTimeoutId) clearTimeout(safetyTimeoutId)
        setIsAuthorized(false)
        setIsChecking(false)
        if (!isRedirectingRef.current) {
          isRedirectingRef.current = true
          router.push("/login?redirect=/admin&message=admin_required")
        }
      }
    }

    verifyAdminAccess()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (safetyTimeoutId) clearTimeout(safetyTimeoutId)
    }
  }, [authLoading, user, router])

  // Afficher un loader pendant la vérification
  if (authLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] via-[#F5F5F5] to-[#F0F0F0]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-[#737373]">Vérification de l'accès administrateur...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas autorisé, ne rien afficher (redirection en cours)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] via-[#F5F5F5] to-[#F0F0F0]">
        <div className="text-center">
          <p className="text-[#737373] mb-4">Accès refusé. Redirection en cours...</p>
        </div>
      </div>
    )
  }

  // Si autorisé, afficher le contenu admin
  return <>{children}</>
}



