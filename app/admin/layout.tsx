"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    async function verifyAdminAccess() {
      if (authLoading) {
        return
      }

      try {
        const { isAdmin, error } = await checkAdminAccess()

        if (error) {
          console.error("Erreur vérification admin:", error)
          setIsAuthorized(false)
        } else if (isAdmin) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
          // Rediriger vers la page de login avec un message
          router.push("/login?redirect=/admin&message=admin_required")
        }
      } catch (error) {
        console.error("Erreur lors de la vérification admin:", error)
        setIsAuthorized(false)
        router.push("/login?redirect=/admin&message=admin_required")
      } finally {
        setIsChecking(false)
      }
    }

    verifyAdminAccess()
  }, [authLoading, router])

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



